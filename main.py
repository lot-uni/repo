from fastapi import FastAPI, Request, Response, File, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.requests import Request
import os
import time

app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def index(request: Request):
    return templates.TemplateResponse("edit.html", {
        "request": request
    })
@app.get("/face/{image_path}")
async def image(image_path: str):
    path="face/"+image_path+".png"
    if os.path.isfile(path) and float(image_path)+180>time.time():
        with open(path, "rb") as f:
            face=f.read()
            os.remove(path)
            return Response(content=face, media_type="image/png")
@app.get("/upload")
async def index(request: Request):
    return templates.TemplateResponse("upload.html", {
        "request": request
    })

@app.post("/upload")
async def upload_file(file: UploadFile):
    date = str(time.time())
    path="face/"+date+".png"
    with open(path, "wb") as f:
        f.write(file.file.read())
    return {"filename": date+".png"}