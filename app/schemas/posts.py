from datetime import datetime
from typing import List
import uuid
from app.schemas import users
from pydantic import BaseModel, EmailStr, constr


class FilteredUserResponse(users.UserBaseSchema):
    id: uuid.UUID


class PostBaseSchema(BaseModel):
    title: str
    content: str
    category: str
    image: str
    user_id: uuid.UUID | None = None

    class Config:
        orm_mode = True

class PostResponse(PostBaseSchema):
    id: uuid.UUID
    user: FilteredUserResponse
    created_at: datetime
    updated_at: datetime

class ListPostResponse(BaseModel):
    status: str
    results: int
    posts: List[PostResponse]

class CreatePostSchema(PostBaseSchema):
    pass

class UpdatePostSchema(BaseModel):
    title: str | None = None
    content: str | None = None
    category: str | None = None
    image: str | None = None
    user_id: uuid.UUID | None = None

    class Config:
        orm_mode = True

