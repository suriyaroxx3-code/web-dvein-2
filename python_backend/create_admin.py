"""
Run once to create / reset the default admin account:
    python create_admin.py
"""
import asyncio
from database import JsonDatabase


async def main():
    db = JsonDatabase("data")
    existing = await db["admins"].find_one({"username": "admin"})
    if existing:
        print("Warning: Admin already exists!")
    else:
        await db["admins"].insert_one({"username": "admin", "password": "admin123"})
        print("Admin Created!")
        print("Username: admin")
        print("Password: admin123")


if __name__ == "__main__":
    asyncio.run(main())
