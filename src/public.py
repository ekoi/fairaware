import logging

from fastapi import APIRouter, HTTPException

from src.commons import data

router = APIRouter()


@router.get('/info')
def info():
    logging.info("FAIRaware PoC")
    logging.debug("info")
    return {"name": "FAIRaware PoC", "version": data["service-version"]}