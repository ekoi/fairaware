import json
import logging
import os
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI, Request, HTTPException, Depends, status
from dynaconf import Dynaconf
from fastapi.security import OAuth2PasswordBearer
from httpx import AsyncClient
import httpx
from fastapi import Request
from fastapi.responses import StreamingResponse
import emoji
from starlette.background import BackgroundTask
import importlib.metadata

__version__ = importlib.metadata.metadata("fairaware-service")["version"]

from starlette.middleware.cors import CORSMiddleware

from src import public, protected
from src.commons import settings, data

HTTP_SERVER = AsyncClient(base_url="http://0.0.0.0:3000")

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

@asynccontextmanager
async def lifespan(application: FastAPI):
    print('start up')
    print(f'Available repositories configurations: {sorted(list(data.keys()))}')

    print(emoji.emojize(':thumbs_up:'))

app = FastAPI(title=settings.FASTAPI_TITLE, description=settings.FASTAPI_DESCRIPTION,
              version=__version__)



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def _reverse_proxy(request: Request):
    url = httpx.URL(path=request.url.path, query=request.url.query.encode("utf-8"))
    rp_req = HTTP_SERVER.build_request(
        request.method, url, headers=request.headers.raw, content=await request.body()
    )
    rp_resp = await HTTP_SERVER.send(rp_req, stream=True)
    return StreamingResponse(
        rp_resp.aiter_raw(),
        status_code=rp_resp.status_code,
        headers=rp_resp.headers,
        background=BackgroundTask(rp_resp.aclose),
    )


app.include_router(
    public.router,
    tags=["Public"],
    prefix=""
)

app.include_router(
    protected.router,
    tags=["Protected"],
    prefix="",
    dependencies=[Depends(api_key_auth)]
)

app.add_route("/{path:path}", _reverse_proxy, ["GET", "POST"])

if __name__ == "__main__":
    logging.info("Start")

    uvicorn.run("src.main:app", host="0.0.0.0", port=7558, reload=False)


