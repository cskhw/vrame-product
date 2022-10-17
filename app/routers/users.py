from fastapi import APIRouter, Depends
from ..db import get_db
from sqlalchemy.orm import Session
from .. import models, oauth2
from app.schemas import users

router = APIRouter()


@router.get('/me', response_model=users.UserResponse)
def get_me(db: Session = Depends(get_db), user_id: str = Depends(oauth2.require_user)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    return user
