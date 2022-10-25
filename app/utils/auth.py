from collections import defaultdict
from http.client import HTTPException
import os
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.crud.users import CRUDUser

import string
import random
import yagmail

from app.schemas import auth


async def is_email_exist(email: str):
    users = CRUDUser()
    get_email = users.get(email=email)
    print('get_email')
    if get_email:
        return True
    return False

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(password: str, hashed_password: str):
    return pwd_context.verify(password, hashed_password)

def get_verify_code(length: int = 6):
    string_pool = string.digits # 숫자
    result = "" # 결과 값

    for _ in range(length):
        result += random.choice(string_pool)
    return result


def send_email(**kwargs):
    print('send_email')
    email_content = """
    <div style="width: 400px; height: 300px; padding: 16px; background-color: white; border: 1px solid #b3b3b3">
        <div style=><strong>{}</strong>님, 안녕하세요. <br/><strong>vrame</strong>을 이용해주셔서 감사합니다!</div>
        <div>인증코드는 <strong style="color: #2964e0">{}</strong>입니다. 정확하게 입력해주세요.</div><br/>
        <div style="font-size: 12px; color: gray">Copyright © vrame Co., Ltd. All Rights Reserved.</div>
    </div>    
    """

    email: str = kwargs.get('email', None)
    code: str = kwargs.get('code', None)
    email_addr = os.environ.get("EMAIL_ADDR", None)
    email_pw = os.environ.get("EMAIL_PW", None)

    if email:
        try:
            yag = yagmail.SMTP({email_addr: email_addr}, email_pw)
            
            
            contents = [
                email_content.format(email, code)
            ]


            yag.send(email, 'vrame 인증 코드입니다.', contents)
            print(code)
            return True
        except HTTPException as error:
            print('이메일 발송 실패', error)
            return False
