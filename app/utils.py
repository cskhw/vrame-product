from http.client import HTTPException
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.db.db import get_db
from app.crud.users import CRUDUser

import string
import random



async def is_email_exist(email: str):
    users = CRUDUser()
    get_email = users.get(email=email)
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
