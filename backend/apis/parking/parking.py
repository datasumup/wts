from fastapi import APIRouter
from sqlalchemy.orm import Session
from libs.db.base.sqlalchemy import DatabaseSession
from models import ValetCounter, ManualUpdateCounter
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
def get_valet_parking_counter(
    db: Session = DatabaseSession,
    authorized: bool = authorize(
        ["CCAA.Custom.Owner", "CCAA.Custom.ValetParking.Manger"]
    ),
):
    counter = db.query(ValetCounter).filter_by(CounterId=90).first()
    return counter


@parking_router.get("/manual-update-counters", response_model=list[ManualUpdateCounter])
def get_manual_counter(
    db: Session = DatabaseSession,
    authorized: bool = authorize(
        ["CCAA.Custom.Owner", "CCAA.Custom.ValetParking.Manger"]
    ),
):
    counters = db.query(ManualUpdateCounter).all()
    return counters


@parking_router.put("/manual-update-counters", response_model=list[ManualUpdateCounter])
def update_manual_counter(
    updates: list[ManualUpdateCounter],
    db: Session = DatabaseSession,
    authorized: bool = authorize(
        ["CCAA.Custom.Owner", "CCAA.Custom.ValetParking.Manger"]
    ),
):
    for update in updates:
        counter = (
            db.query(ManualUpdateCounter).filter_by(CounterId=update.CounterId).first()
        )
        counter.CounterValue = update.CounterValue
        counter.validTill = update.validTill
        db.merge(counter)
    db.commit()
    return updates
