from collections import defaultdict
from datetime import timedelta
import hashlib
import os
from random import randbytes
from typing import List
from fastapi import APIRouter, Request, Response, status, Depends, HTTPException, BackgroundTasks
from pydantic import EmailStr

from app.error import InvaildValueException
from app.utils.auth import hash_password, is_email_exist, verify_password
from ..db import models

from app import oauth2
from .. import utils
from app.schemas import auth, base, users
from sqlalchemy.orm import Session
from ..db.db import get_db
from app.oauth2 import AuthJWT
from ..common.config import settings

router = APIRouter()
ACCESS_TOKEN_EXPIRES_IN = settings.ACCESS_TOKEN_EXPIRES_IN
REFRESH_TOKEN_EXPIRES_IN = settings.REFRESH_TOKEN_EXPIRES_IN

codes = defaultdict(str)


@router.post('/request_email_code', status_code=status.HTTP_200_OK, response_model=base.SimpleResponse)
async def request_email_code(payload: auth.RequestEmailCodeSchema, *, background_tasks: BackgroundTasks):
    """이메일 코드 발송
    1. 유저 이메일이 존재하는지 체크
    2. 존재하지 않으면 예외 처리
    3. 존재하면 인증코드 발송
    """

    isEmailExist = await is_email_exist(payload.email)

    print(isEmailExist)

    if isEmailExist:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Email already exist')


    # 이메일 발송
    background_tasks.add_task(utils, email=payload.email)
    return {'status': status.HTTP_200_OK, 'detail': 'Verification token successfully sent to {}'.format(payload.email)}

@router.post('/verify_email_code', status_code=status.HTTP_200_OK, response_model=base.SimpleResponse)
async def verify_email_code(payload: auth.VerifyEmailCodeSchema):
    """이메일 코드 인증"""
    
    # 코드 딕셔너리 안에 이메일이 있고 코드 값이 같으면 인증 성공, 아니면 인증 실패
    if payload.email in codes and payload.code == codes[payload.email]:
        return {'status': status.HTTP_200_OK, 'detail': 'Verification token successfully verify. data: {}'.format(payload)}
    else: 
        raise HTTPException(status_code=status.HTTP_304_NOT_MODIFIED, detail='test')
            

@router.post('/register', status_code=status.HTTP_201_CREATED)
async def register(payload: users.CreateUserSchema, request: Request, db: Session = Depends(get_db)):
    # Check if user already exist
    user_query = db.query(models.User).filter(
        models.User.email == EmailStr(payload.email.lower()))
    user = user_query.first()
    if user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail='Account already exist')
    # Compare password and passwordConfirmd
    if payload.password != payload.passwordConfirm:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail='Passwords do not match')
    #  Hash the password
    payload.password = hash_password(payload.password)
    del payload.passwordConfirm
    payload.role = 'user'
    payload.verified = False
    payload.email = EmailStr(payload.email.lower())
    new_user = models.User(**payload.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    try:
        # Send Verification Email
        token = randbytes(10)
        hashedCode = hashlib.sha256()
        hashedCode.update(token)
        verification_code = hashedCode.hexdigest()
        user_query.update(
            {'verification_code': verification_code}, synchronize_session=False)
        db.commit()
        url = f"{request.url.scheme}://{request.client.host}:{request.url.port}/api/auth/verifyemail/{token.hex()}"
        # await Email(new_user, url, [payload.email]).sendVerificationCode()
    except Exception as error:
        print('Error', error)
        user_query.update(
            {'verification_code': None}, synchronize_session=False)
        db.commit()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail='There was an error sending email')
    return {'status': 'success', 'message': 'Verification token successfully sent to your email'}


@router.post('/login', response_model=base.SimpleResponse)
def login(payload: auth.LoginUserSchema, response: Response, db: Session = Depends(get_db), Authorize: AuthJWT = Depends()):
    # Check if the user exist
    user = db.query(models.User).filter(
        models.User.email == EmailStr(payload.email.lower())).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail='Incorrect Email or Password')

    # Check if user verified his email
    if not user.verified:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail='Please verify your email address')

    # Check if the password is valid
    if not verify_password(payload.password, user.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail='Incorrect Email or Password')

    # Create access token
    access_token = Authorize.create_access_token(
        subject=str(user.id), expires_time=timedelta(minutes=ACCESS_TOKEN_EXPIRES_IN))

    # Create refresh token
    refresh_token = Authorize.create_refresh_token(
        subject=str(user.id), expires_time=timedelta(minutes=REFRESH_TOKEN_EXPIRES_IN))

    # Store refresh and access tokens in cookie
    response.set_cookie('access_token', access_token, ACCESS_TOKEN_EXPIRES_IN * 60,
                        ACCESS_TOKEN_EXPIRES_IN * 60, '/', None, False, True, 'lax')
    response.set_cookie('refresh_token', refresh_token,
                        REFRESH_TOKEN_EXPIRES_IN * 60, REFRESH_TOKEN_EXPIRES_IN * 60, '/', None, False, True, 'lax')
    response.set_cookie('logged_in', 'True', ACCESS_TOKEN_EXPIRES_IN * 60,
                        ACCESS_TOKEN_EXPIRES_IN * 60, '/', None, False, False, 'lax')

    # Send both access
    return {'status': 'success', 'access_token': access_token}


@router.get('/refresh')
def refresh_token(response: Response, request: Request, Authorize: AuthJWT = Depends(), db: Session = Depends(get_db)):
    try:
        Authorize.jwt_refresh_token_required()

        user_id = Authorize.get_jwt_subject()
        if not user_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail='Could not refresh access token')
        user = db.query(models.User).filter(models.User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail='The user belonging to this token no logger exist')
        access_token = Authorize.create_access_token(
            subject=str(user.id), expires_time=timedelta(minutes=ACCESS_TOKEN_EXPIRES_IN))
    except Exception as e:
        error = e.__class__.__name__
        if error == 'MissingTokenError':
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail='Please provide refresh token')
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=error)

    response.set_cookie('access_token', access_token, ACCESS_TOKEN_EXPIRES_IN * 60,
                        ACCESS_TOKEN_EXPIRES_IN * 60, '/', None, False, True, 'lax')
    response.set_cookie('logged_in', 'True', ACCESS_TOKEN_EXPIRES_IN * 60,
                        ACCESS_TOKEN_EXPIRES_IN * 60, '/', None, False, False, 'lax')
    return {'access_token': access_token}


@router.get('/logout', status_code=status.HTTP_200_OK)
def logout(response: Response, Authorize: AuthJWT = Depends(), user_id: str = Depends(oauth2.require_user)):
    Authorize.unset_jwt_cookies()
    response.set_cookie('logged_in', '', -1)

    return {'status': 'success'}


@router.get('/verifyemail/{token}')
def verify_me(token: str, db: Session = Depends(get_db)):
    hashedCode = hashlib.sha256()
    hashedCode.update(bytes.fromhex(token))
    verification_code = hashedCode.hexdigest()
    user_query = db.query(models.User).filter(
        models.User.verification_code == verification_code)
    db.commit()
    user = user_query.first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail='Email can only be verified once')
    user_query.update(
        {'verified': True, 'verification_code': None}, synchronize_session=False)
    db.commit()
    return {
        "status": "success",
        "message": "Account verified successfully"
    }

