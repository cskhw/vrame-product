from http.client import HTTPException
from typing import Any, Generic, List, Optional, Type, TypeVar

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from app.db.db import get_db
from app.db.models import User

from app.schemas import users
from pydantic import EmailStr

UserModel = TypeVar("UserModel", bound=User)
CreateUserSchema = TypeVar("CreateUserSchema", bound=users.CreateUserSchema)
UpdateUserSchema = TypeVar("UpdateUserSchema", bound=users.UpdateUserSchema)

class CRUDUser(Generic[UserModel, CreateUserSchema, UpdateUserSchema]):  # 1
    def __init__(self):  # 2
        """
        CRUD object with default methods to Create, Read, Update, Delete (CRUD).
        **Parameters**
        * `model`: A SQLAlchemy model class
        * `schema`: A Pydantic model (schema) class
        """
        self.model = Type[UserModel]
        self.db = next(get_db())


    def get(self, email: EmailStr) -> Optional[UserModel]:
        return self.db.query(self.model).filter(self.model.email == email).first()  # 3

    # def get_multi(
    #     self, db: Session, *, skip: int = 0, limit: int = 100
    # ) -> List[UserModel]:
    #     return db.query(self.model).offset(skip).limit(limit).all()  # 4

    # def create(self, db: Session, *, obj_in: CreateUserSchema) -> UserModel:
    #     obj_in_data = jsonable_encoder(obj_in)
    #     db_obj = self.model(**obj_in_data)  # type: ignore
    #     db.add(db_obj)
    #     db.commit()  # 5
    #     db.refresh(db_obj)
    #     return db_obj

    # def update(self, db: Session, *, id: int, obj_in: UpdateUserSchema) -> UserModel:
    #     obj_in_data = jsonable_encoder(obj_in)
    #     db_obj = self.model(**obj_in_data)  # type: ignore

    #     query = db.query(self.model).filter(self.model.id == id)
    #     updated_obj = query.first()

    #     if not updated_obj:
    #         raise HTTPException(status_code=status.HTTP_200_OK,
    #                             detail=f'No post with this id: {id} found')
    #     query.update(db_obj, synchronize_session=False)
    #     db.commit()
    #     return updated_obj

    # def delete(self, db: Session, id: int) -> UserModel:        
    #     query = db.query(self.model).filter(self.model.id == id)
    #     deleted_obj = query.first()

    #     if not deleted_obj:
    #         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
    #                             detail=f'No post with this id: {id} found')

    #     query.delete(synchronize_session=False)
    #     db.commit()
    #     return Response(status_code=status.HTTP_204_NO_CONTENT)
