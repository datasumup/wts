from pydantic import BaseModel


class User(BaseModel):
    name: str
    roles: list[str]
    authenticated: bool
