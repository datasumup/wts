import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from fastapi import Depends

# Base = declarative_base()

__engine__ = create_engine(os.getenv("DATABASE_URL"))
__SessionLocal__ = sessionmaker(autocommit=False, autoflush=False, bind=__engine__)


def __get_db__() -> Session:  # type: ignore
    db = __SessionLocal__()
    try:
        yield db
    finally:
        db.close()


DatabaseSession = Depends(__get_db__)  # type: ignore
