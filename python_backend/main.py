from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

load_dotenv()  # Load .env file from the backend directory

from database import JsonDatabase
from routers import auth, public, admin


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.db = JsonDatabase("data")
    print("JSON/InstantDB Database initialised")
    admin_col = app.state.db["admins"]
    existing = await admin_col.find_one({"username": "admin"})
    if not existing:
        await admin_col.insert_one({"username": "admin", "password": "admin123"})
        print("Default admin created: admin / admin123")
    os.makedirs("uploads", exist_ok=True)
    yield


os.makedirs("uploads", exist_ok=True)

app = FastAPI(title="DVein API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(auth.router,   prefix="/api/auth")
app.include_router(public.router, prefix="/api/public")
app.include_router(admin.router,  prefix="/api/admin")


@app.get("/")
async def root():
    return {"message": "DVein FastAPI Backend Running"}
