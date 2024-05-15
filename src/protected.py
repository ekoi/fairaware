from fastapi import APIRouter
from starlette import status

from src.commons import settings

router = APIRouter()


@router.get("/settings")
async def get_settings():
    return settings


@router.get("/admin")
async def admin():
    return "OK"

@router.post("/save/{user}", status_code=status.HTTP_201_CREATED)
async def save(user: str):
    return "OK"