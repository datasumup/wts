from fastapi import APIRouter, Request
from models import User

user_router = APIRouter(prefix="/users", tags=["user"])

all_roles = [
    "CCAA.Custom.Owner",
    "CCAA.Custom.Job.Restart",
    "CCAA.Custom.ValetParking.Manger",
]


@user_router.get("/me", response_model=User)
def list_tasks(request: Request):
    try:
        session_user = request.session.get("user")
        return User(
            name=session_user["name"], roles=session_user["roles"], authenticated=True
        )
    except Exception as e:
        return User(
            name="anonymous",
            roles=[],
            authenticated=False,
        )
