from fastapi import APIRouter
from sqlalchemy.orm import Session
from libs.db.base.sqlalchemy import DatabaseSession
from models import RequestQueueMessage
from libs.auth.authz import authorize

queue_router = APIRouter(prefix="/queue", tags=["queue"])


@queue_router.post("/", response_model=bool)
def add_message(
    message: RequestQueueMessage,
    db: Session = DatabaseSession,
    authorized: bool = authorize(["CCAA.Custom.Owner", "CCAA.Custom.Job.Restart"]),
):
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
