from fastapi import APIRouter
from sqlalchemy.orm import Session
from libs.db.base.sqlalchemy import DatabaseSession
from models import WindowsTask

task_router = APIRouter(prefix="/tasks", tags=["tasks"])


@task_router.get("/", response_model=list[WindowsTask])
def list_tasks(db: Session = DatabaseSession):
    return db.query(WindowsTask).all()
