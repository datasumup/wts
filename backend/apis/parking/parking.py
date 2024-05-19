from fastapi import APIRouter
from sqlalchemy.orm import Session
from libs.db.base.sqlalchemy import DatabaseSession
from models import ValetCounter
from libs.auth.authz import authorize

parking_router = APIRouter(prefix="/parking", tags=["parking"])


@parking_router.put("/valet/availability/{value}", response_model=bool)
def update_valet_parking_counter(
    value: int,
    db: Session = DatabaseSession,
    authorized: bool = authorize(
        ["CCAA.Custom.Owner", "CCAA.Custom.ValetParking.Manger"]
    ),
):
    counter = db.query(ValetCounter).filter_by(CounterId=90).first()
    counter.CounterValue = value
    db.merge(counter)
    db.commit()
    return True


@parking_router.get("/valet/counter", response_model=ValetCounter)
def get_valet_parking_counter(db: Session = DatabaseSession):
    counter = db.query(ValetCounter).filter_by(CounterId=90).first()
    return counter
