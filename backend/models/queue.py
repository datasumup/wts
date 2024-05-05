from sqlmodel import Field, SQLModel
from typing import Optional


class RequestQueue(SQLModel, table=True):

    __tablename__ = "RequestQueue"
    __table_args__ = {"schema": "dbo"}

    Id: str = Field(primary_key=True)
    TaskId: str
    Operation: str
    Payload: str
    CreatedOn: int
    CompletedOn: Optional[int] = None
    Message: Optional[str] = None
