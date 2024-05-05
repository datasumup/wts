from sqlmodel import Field, SQLModel


class WindowsTask(SQLModel, table=True):

    __tablename__ = "Tasks"
    __table_args__ = {"schema": "dbo"}

    Id: str = Field(primary_key=True)
    Name: str
    Description: str
    Trigger: str
    Status: str
