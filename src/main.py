import json
import logging
import os

import uvicorn
from fastapi import FastAPI, Request, HTTPException, Depends, status
from dynaconf import Dynaconf
from fastapi.security import OAuth2PasswordBearer

import importlib.metadata

__version__ = importlib.metadata.metadata("fairaware-service")["version"]

from src.commons import settings

api_keys = [
    settings.FAIRAWARE_SERVICE_API_KEY
]  # Todo: This is encrypted in the .secrets.toml

#Authorization Form: It doesn't matter what you type in the form, it won't work yet. But we'll get there.
#See: https://fastapi.tiangolo.com/tutorial/security/first-steps/
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")  # use token authentication

def api_key_auth(api_key: str = Depends(oauth2_scheme)):
    if api_key not in api_keys:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Forbidden"
        )


app = FastAPI(title=settings.FASTAPI_TITLE, description=settings.FASTAPI_DESCRIPTION,
              version=__version__)



# app.include_router(
#     admin.router,
#     tags=["admin"],
#     prefix="/admin"
# )

if __name__ == "__main__":
    logging.info("Start")

    uvicorn.run("src.main:app", host="0.0.0.0", port=7558, reload=False)


