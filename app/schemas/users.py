from typing import Optional
import uuid
from datetime import datetime
from pydantic import BaseModel, EmailStr, constr

class UserBaseSchema(BaseModel):
    name: str
    email: EmailStr
    photo: Optional[str]
    password: constr(min_length=8, max_length=20)
    role: str = 'user'
    is_active: bool = False

    class Config:
        orm_mode = True

class UserResponse(UserBaseSchema):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

class CreateUserSchema(UserBaseSchema):
    confirm_password: constr(min_length=8, max_length=20)
    verification_code: constr(min_length=6, max_length=6)

class UpdateUserSchema(UserBaseSchema):
    id: uuid.UUID
    updated_at: datetime