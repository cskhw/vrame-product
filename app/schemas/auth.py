from os import access
from typing import List, Type
from pydantic import BaseModel, EmailStr, constr
from app.schemas import users

class LoginUserSchema(BaseModel):
    email: EmailStr
    password: constr(min_length=8)


class LoginResponseBody():
    user: Type[users.UserBaseSchema]
    access_token: str
    refresh_token: str
    

class LoginUserResponseSchema(BaseModel):
    status: str
    body: Type[LoginResponseBody]

class EmailRecipients(BaseModel):
    email: EmailStr
    name: str

class SendEmail(BaseModel):
    email_to: List[EmailRecipients]

class RequestEmailCodeSchema(BaseModel):
    email: EmailStr

class VerifyEmailCodeSchema(BaseModel):
    email: EmailStr
    code: str