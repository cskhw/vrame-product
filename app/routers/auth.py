from collections import defaultdict
from datetime import timedelta
import hashlib
from typing import Type
from fastapi import APIRouter, Request, Response, status, Depends, HTTPException, BackgroundTasks
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from pydantic import EmailStr

from app.utils.auth import *
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
    """이메일 인증 코드 발송"""
    email = payload.email.lower()

    # 디비에서 이메일 체크
    if await is_email_exist(email):
        return JSONResponse(
            status_code=status.HTTP_409_CONFLICT,
            content=jsonable_encoder({'detail': f"Email already exist {email}", "body": payload}),
        )

    codes[email] = get_verify_code()

    # 이메일 발송
    background_tasks.add_task(send_email, code=codes[email], email=email)
    print(codes)
    return {'status': status.HTTP_200_OK, 'detail': 'Verification token successfully sent to {}'.format(email)}

@router.post('/verify_email_code', status_code=status.HTTP_200_OK, response_model=base.SimpleResponse)
async def verify_email_code(payload: auth.VerifyEmailCodeSchema):
    """이메일 코드 인증
    성공: 200
    실패: 304
    """

    print(codes)
    print(payload)
    print(payload.email in codes)
    print(payload.code == codes[payload.email])
    print(codes[payload.email])

    # 코드 딕셔너리 안에 이메일이 있고 코드 값이 같으면 인증 성공, 아니면 인증 실패
    if payload.email in codes and payload.code == codes[payload.email]:
        return {'status': status.HTTP_200_OK, 'detail': 'Verification token successfully verify. data: {}'.format(payload)}
    else: 
        return {'status': status.HTTP_304_NOT_MODIFIED, 'detail': 'Verification code is invaild. Please check code.'}
            

@router.post('/register', status_code=status.HTTP_201_CREATED, response_model=users.CreateUserSchema)
async def register(payload: users.CreateUserSchema, request: Request, db: Session = Depends(get_db)):
    """회원가입
    성공: 201
    실패: 400, 409, 500
    """
    # Check if user already exist
    user_query = db.query(models.User).filter(
        models.User.email == EmailStr(payload.email.lower()))
    user = user_query.first()

    # Compare password and confirm_password
    if payload.password != payload.confirm_password:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=jsonable_encoder({"detail": "", "body": payload}),
        )

    # Chcek user exist
    if user:
        return JSONResponse(
            status_code=status.HTTP_409_CONFLICT,
            content=jsonable_encoder({"detail": "", "body": payload}),
        )

    #  Hash the password
    payload.password = hash_password(payload.password)

    # db에 넣을 json 만듬
    del payload.confirm_password
    payload.role = 'user'
    payload.email = EmailStr(payload.email.lower())
    print(payload)
    new_user = models.User(**payload.dict())

    # db에 저장
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content=jsonable_encoder({"detail": "Success create user.", "body": payload}),
    )

@router.post('/login', response_model=auth.LoginUserSchema)
def login(payload: auth.LoginUserSchema, response: Response, db: Session = Depends(get_db), Authorize: AuthJWT = Depends()):
    # Check if the user exist
    user: Type[models.User] = db.query(models.User).filter(
        models.User.email == EmailStr(payload.email.lower())).first()
    if not user:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST,
                            content=jsonable_encoder({"detail": "Incorrect Email or Password.", "body": payload}),)

    # Check if the password is valid
    if not verify_password(payload.password, user.password):
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST,
                            content=jsonable_encoder({"detail": "Incorrect Email or Password.", "body": payload}),)

    # Create access token
    print(user.__dict__)
    print(str(user.id))

    access_token = Authorize.create_access_token(
        subject=str(user.id), expires_time=timedelta(minutes=ACCESS_TOKEN_EXPIRES_IN))

    # Create refresh token
    refresh_token = Authorize.create_refresh_token(
        subject=str(user.id), expires_time=timedelta(minutes=REFRESH_TOKEN_EXPIRES_IN))

    access_token_expire_time = ACCESS_TOKEN_EXPIRES_IN * 60,
    refresh_token_expire_time = REFRESH_TOKEN_EXPIRES_IN * 60

    # Store refresh and access tokens in cookie
    response.set_cookie('access_token', access_token, access_token_expire_time,
                        access_token_expire_time, '/', None, False, True, 'lax')
    response.set_cookie('refresh_token', refresh_token,
                        refresh_token_expire_time, refresh_token_expire_time, '/', None, False, True, 'lax')
    response.set_cookie('logged_in', 'True', refresh_token_expire_time,
                        ACCESS_TOKEN_EXPIRES_IN * 60, '/', None, False, False, 'lax')

    # Send both access
    return {'status': 'success', 'body': {
        user: user,
        access_token: access_token,
        refresh_token: refresh_token
    }}


@router.get('/refresh')
def refresh(response: Response, request: Request, Authorize: AuthJWT = Depends(), db: Session = Depends(get_db)):
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

