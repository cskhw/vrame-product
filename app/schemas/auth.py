from typing import List
from pydantic import BaseModel, EmailStr, constr
from app.schemas import users

class LoginUserSchema(BaseModel):
    email: EmailStr
    password: constr(min_length=8)

class EmailRecipients(BaseModel):
    email: EmailStr
    name: str

class SendEmail(BaseModel):
    email_to: List[EmailRecipients]

class RequestVerificationCodeSchema(BaseModel):
    email: EmailStr
class VerifyEmailCodeSchema(BaseModel):
    code: str