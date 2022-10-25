import uuid
from datetime import datetime
from pydantic import BaseModel, EmailStr, constr

class UserBaseSchema(BaseModel):
    name: str
    email: EmailStr
    photo: str
    pwshash: constr(min_length=8)
    verification_code: bool = False
    is_active: bool = False
    role: str = 'user'

    created_at: datetime
    updated_at: datetime
    class Config:
        orm_mode = True

class UserResponse(UserBaseSchema):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

class CreateUserSchema(UserBaseSchema):
    pwshash: constr(min_length=8)
    role: str = 'user'
    verification_code: bool = False

class UpdateUserSchema(UserBaseSchema):
    id: uuid.UUID