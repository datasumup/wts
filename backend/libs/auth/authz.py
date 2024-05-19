from fastapi import HTTPException
from fastapi import Depends
from fastapi import status
from fastapi import Request
import os


def authorize(allowed_roles: list[str]):
    def should_have_access(request: Request):
        if os.getenv("AUTH_DISABLED") == "true":
            return True
        roles = request.session.get("roles", [])
        if set(allowed_roles).isdisjoint(set(roles)):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have access to this resource",
            )
        return True

    return Depends(should_have_access)
