from sqlalchemy import Column, Integer, String, PrimaryKeyConstraint
from sqlalchemy.ext.declarative import declarative_base
from typing import Any, Dict

Base = declarative_base()


def sql_table(table_name: str = None, key: str = "id"):
    def decorator(model_cls):
        attrs: Dict[str, Any] = {}

        for field in model_cls.__annotations__.items():
            field_name, python_type = field
            column_type = String

            if python_type is int:
                column_type = Integer

            attrs[field_name] = Column(column_type)

        if table_name is None:
            attrs["__tablename__"] = model_cls.__name__.lower()
        else:
            attrs["__tablename__"] = table_name

        attrs["__table_args__"] = (PrimaryKeyConstraint(key),)

        sqlalchemy_model = type(model_cls.__name__, (Base,), attrs)
        return sqlalchemy_model

    return decorator
