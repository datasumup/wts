from typing import Union
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware

from apis import task_router, queue_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_routes = [task_router, queue_router]

for route in api_routes:
    app.include_router(route, prefix="/api")

app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/{full_path:path}")
async def catch_all(full_path: str, request: Request):
    return FileResponse("static/index.html")
