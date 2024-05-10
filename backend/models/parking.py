from sqlmodel import Field, SQLModel
from typing import Optional


class ValetCounter(SQLModel, table=True):

    __tablename__ = "CounterTable_ValetParking"
    __table_args__ = {"schema": "dbo"}

    CounterId: int = Field(primary_key=True)
    CounterName: Optional[str] = None
    GroupName: Optional[str] = None
    CounterValue: Optional[int] = None
    CounterOccupied: int
    CounterMaximum: Optional[int] = None
    DisplayThreshold: Optional[int] = None
    MediumThreshold: Optional[int] = None
    HighThreshold: Optional[int] = None
