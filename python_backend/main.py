from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
import os

from routers import auth, public, admin

# ── DB lifespan ──────────────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://127.0.0.1:27017/dvein_careers")
    app.state.mongo = AsyncIOMotorClient(MONGO_URI)
    app.state.db    = app.state.mongo["dvein_careers"]
    print("✅ MongoDB Connected")
    os.makedirs("uploads", exist_ok=True)
    yield
    app.state.mongo.close()

# ── App ───────────────────────────────────────────────────────────────────────
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
    return {"message": "DVein FastAPI Backend Running 🚀"}
