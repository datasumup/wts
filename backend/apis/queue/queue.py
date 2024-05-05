from fastapi import APIRouter
from sqlalchemy.orm import Session
from libs.db.base.sqlalchemy import DatabaseSession
from models import RequestQueue

queue_router = APIRouter(prefix="/queue", tags=["queue", "request"])


@queue_router.get("/", response_model=list[RequestQueue])
def list_tasks(db: Session = DatabaseSession):
    return db.query(RequestQueue).all()
