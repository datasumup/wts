from fastapi import APIRouter
from sqlalchemy.orm import Session
from libs.db.base.sqlalchemy import DatabaseSession
from models import RequestQueueMessage

queue_router = APIRouter(prefix="/queue", tags=["queue", "request"])


@queue_router.post("/", response_model=bool)
def add_message(message: RequestQueueMessage, db: Session = DatabaseSession):
    try:
        db.add(message)
        db.commit()
        return True
    except Exception as e:
        return False


@queue_router.get("/{taskId}")
def list_queue_items_for_task(taskId: str, db: Session = DatabaseSession):
    return (
        db.query(RequestQueueMessage)
        .filter_by(TaskId=taskId)
        .order_by(RequestQueueMessage.CreatedOn.desc())
        .all()
    )
