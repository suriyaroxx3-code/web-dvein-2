"""
POST /api/auth/register
POST /api/auth/login
POST /api/auth/admin/login
"""
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr

from database   import get_db
from auth_utils import create_token, hash_password, verify_password

router = APIRouter()


class RegisterBody(BaseModel):
    username: str
    email: EmailStr
    password: str


class LoginBody(BaseModel):
    email: EmailStr
    password: str


class AdminLoginBody(BaseModel):
    username: str
    password: str


@router.post("/register")
async def register_user(body: RegisterBody, db=Depends(get_db)):
    existing = await db["users"].find_one({"email": body.email})
    if existing:
        raise HTTPException(400, detail="User already exists")
    hashed = hash_password(body.password)
    await db["users"].insert_one({
        "username": body.username,
        "email":    body.email,
        "password": hashed,
        "isAdmin":  False,
    })
    return {"success": True, "message": "Registered Successfully"}


@router.post("/login")
async def login_user(body: LoginBody, db=Depends(get_db)):
    user = await db["users"].find_one({"email": body.email})
    if not user or not verify_password(body.password, user["password"]):
        raise HTTPException(400, detail="Invalid Credentials")
    token = create_token({"id": str(user["_id"]), "role": "user"})
    return {
        "success": True,
        "token":   token,
        "user": {
            "username": user["username"],
            "email":    user["email"],
            "isAdmin":  False,
        },
    }


@router.post("/admin/login")
async def login_admin(body: AdminLoginBody, db=Depends(get_db)):
    admin = await db["admins"].find_one({"username": body.username})
    if not admin or admin["password"] != body.password:
        raise HTTPException(401, detail="Invalid Admin Credentials")
    token = create_token({"id": str(admin["_id"]), "role": "admin"})
    return {"success": True, "token": token}
