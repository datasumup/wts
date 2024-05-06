from sqlalchemy.orm import Session
from typing import Generic, Optional
from sqlalchemy.orm import Session
from typing import Optional, Type, TypeVar
from pydantic import BaseModel

TModel = TypeVar("TModel", bound=BaseModel)


class SqlRepository(Generic[TModel]):
    def __init__(self, db: Session):
        self.db = db

    def get(self, id: int) -> Optional[TModel]:
        return self.db.query(TModel).filter(TModel.id == id).first()

    def create(self, item: TModel) -> TModel:
        db_item = TModel(**item.model_dump())
        self.db.add(db_item)
        self.db.commit()
        self.db.refresh(db_item)
        return db_item

    def update(self, id: int, item: TModel) -> Optional[TModel]:
        db_item = self.get(id)
        if db_item:
            for key, value in item.model_dump().items():
                setattr(db_item, key, value)
            self.db.commit()
            self.db.refresh(db_item)
            return db_item
        return None

    def delete(self, id: int) -> Optional[TModel]:
        db_item = self.get(id)
        if db_item:
            self.db.delete(db_item)
            self.db.commit()
            return db_item
        return None

    def list(self) -> list[TModel]:
        return self.db.query(TModel).all()

    def count(self) -> int:
        return self.db.query(TModel).count()

    def filter(self, **kwargs):
        return self.db.query(TModel).filter_by(**kwargs).all()

    def first(self, **kwargs) -> Optional[TModel]:
        return self.db.query(TModel).filter_by(**kwargs).first()

    def last(self, **kwargs) -> Optional[TModel]:
        return (
            self.db.query(TModel).filter_by(**kwargs).order_by(TModel.id.desc()).first()
        )
