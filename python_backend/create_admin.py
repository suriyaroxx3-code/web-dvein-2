"""
Run once to seed the admin account:
    python create_admin.py
"""
import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://127.0.0.1:27017/dvein_careers")

async def main():
    client = AsyncIOMotorClient(MONGO_URI)
    db     = client["dvein_careers"]

    existing = await db["admins"].find_one({"username": "admin"})
    if existing:
        print("⚠️  Admin already exists!")
    else:
        await db["admins"].insert_one({"username": "admin", "password": "admin123"})
        print("🎉 Admin Created!")
        print("👤 Username: admin")
        print("🔑 Password: admin123")

    client.close()

if __name__ == "__main__":
    asyncio.run(main())
