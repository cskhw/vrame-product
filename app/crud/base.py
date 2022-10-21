import uuid
from http.client import HTTPException
from this import d
from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union

from app.db.db import Base

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):  # 1
    def __init__(self, model: Type[ModelType]):  # 2
        """
        CRUD object with default methods to Create, Read, Update, Delete (CRUD).
        **Parameters**
        * `model`: A SQLAlchemy model class
        * `schema`: A Pydantic model (schema) class
        """
        self.model = model

    def get(self, db: Session, id: Any) -> Optional[ModelType]:
        return db.query(self.model).filter(self.model.id == id).first()  # 3

    def get_multi(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[ModelType]:
        return db.query(self.model).offset(skip).limit(limit).all()  # 4

    def create(self, db: Session, *, obj_in: CreateSchemaType) -> ModelType:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data)  # type: ignore
        db.add(db_obj)
        db.commit()  # 5
        db.refresh(db_obj)
        return db_obj

    def update(self, db: Session, *, id: int, obj_in: UpdateSchemaType) -> ModelType:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data)  # type: ignore

        query = db.query(self.model).filter(self.model.id == id)
        updated_obj = query.first()

        if not updated_obj:
            raise HTTPException(status_code=status.HTTP_200_OK,
                                detail=f'No post with this id: {id} found')
        
        query.update(db_obj, synchronize_session=False)
        db.commit()
        return updated_obj

    
    def delete(self, db: Session, id: int) -> ModelType:        
        query = db.query(self.model).filter(self.model.id == id)
        deleted_obj = query.first()

        if not deleted_obj:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=f'No post with this id: {id} found')

        query.delete(synchronize_session=False)
        db.commit()
        return Response(status_code=status.HTTP_204_NO_CONTENT)

        