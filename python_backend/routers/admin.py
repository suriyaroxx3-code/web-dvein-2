"""
Admin-protected routes (all require Bearer JWT)

GET    /api/admin/stats
GET    /api/admin/applications
DELETE /api/admin/applications/:id
POST   /api/admin/bulk-delete
POST   /api/admin/products
DELETE /api/admin/products/:id
POST   /api/admin/services
PUT    /api/admin/services/:id
DELETE /api/admin/services/:id
POST   /api/admin/jobs
DELETE /api/admin/jobs/:id
POST   /api/admin/training
DELETE /api/admin/training/:id
POST   /api/admin/slides
DELETE /api/admin/slides/:id
"""
import os
import shutil
import smtplib
from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from pydantic import BaseModel
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from database import get_db
from auth_utils import get_current_user

router = APIRouter(dependencies=[Depends(get_current_user)])


def _doc(d: dict) -> dict:
    d["_id"] = str(d["_id"])
    return d


def _save_file(file: UploadFile, folder: str = "uploads") -> str:
    os.makedirs(folder, exist_ok=True)
    safe = f"{os.urandom(4).hex()}_{file.filename}"
    path = os.path.join(folder, safe)
    with open(path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    base_url = os.getenv("BASE_URL", "http://localhost:5000")
    return f"{base_url}/uploads/{safe}"


@router.get("/stats")
async def get_stats(db=Depends(get_db)):
    app_count = await db["applications"].count_documents({})
    intern_apps = await db["applications"].count_documents(
        {"jobTitle": {"$regex": "Internship", "$options": "i"}}
    )
    return {
        "applications": app_count,
        "jobApps":      app_count - intern_apps,
        "internApps":   intern_apps,
        "jobs":         await db["jobs"].count_documents({}),
        "slides":       await db["slides"].count_documents({}),
        "services":     await db["services"].count_documents({}),
        "trainings":    await db["trainings"].count_documents({}),
    }


@router.get("/applications")
async def get_applications(db=Depends(get_db)):
    apps = await db["applications"].find().sort("appliedAt", -1).to_list(None)
    return [_doc(a) for a in apps]


@router.delete("/applications/{app_id}")
async def delete_application(app_id: str, db=Depends(get_db)):
    await db["applications"].delete_one({"_id": app_id})
    return {"message": "Application deleted"}


class BulkDeleteBody(BaseModel):
    ids: List[str]


@router.post("/bulk-delete")
async def bulk_delete(body: BulkDeleteBody, db=Depends(get_db)):
    await db["applications"].delete_many({"_id": {"$in": list(body.ids)}})
    return {"message": "Selected applications deleted"}


@router.post("/products")
async def add_product(
    name: str = Form(...),
    description: str = Form(...),
    price: str = Form(...),
    version: str = Form("1.0"),
    category: str = Form("Software"),
    image: Optional[UploadFile] = File(None),
    db=Depends(get_db),
):
    image_url = _save_file(image) if image and image.filename else None
    product = {
        "name": name, "description": description, "price": price,
        "version": version, "category": category, "image": image_url,
        "createdAt": datetime.utcnow(),
    }
    result = await db["products"].insert_one(product)
    product["_id"] = str(result.inserted_id)
    return {"message": "Product Node Activated!", "data": product}


@router.delete("/products/{product_id}")
async def delete_product(product_id: str, db=Depends(get_db)):
    await db["products"].delete_one({"_id": product_id})
    return {"message": "Product Deactivated"}


@router.post("/services")
async def create_service(
    title: str = Form(...),
    desc: str = Form(...),
    iconName: str = Form(...),
    link: str = Form("/services"),
    image: Optional[UploadFile] = File(None),
    db=Depends(get_db),
):
    image_url = _save_file(image) if image and image.filename else ""
    svc = {
        "title": title, "desc": desc, "iconName": iconName,
        "link": link, "image": image_url,
        "createdAt": datetime.utcnow(),
    }
    result = await db["services"].insert_one(svc)
    svc["_id"] = str(result.inserted_id)
    return {"success": True, "data": svc}


@router.put("/services/{svc_id}")
async def update_service(
    svc_id: str,
    title: str = Form(...),
    desc: str = Form(...),
    iconName: str = Form(...),
    link: str = Form("/services"),
    image: Optional[UploadFile] = File(None),
    db=Depends(get_db),
):
    update = {"title": title, "desc": desc, "iconName": iconName, "link": link}
    if image and image.filename:
        update["image"] = _save_file(image)
    result = await db["services"].find_one_and_update(
        {"_id": svc_id}, {"$set": update}, return_document=True
    )
    if not result:
        raise HTTPException(404, "Service not found")
    return {"success": True, "data": _doc(result)}


@router.delete("/services/{svc_id}")
async def delete_service(svc_id: str, db=Depends(get_db)):
    await db["services"].delete_one({"_id": svc_id})
    return {"success": True, "message": "Service Deleted"}


class JobBody(BaseModel):
    title: str
    department: str
    location: str = "Chennai (Hybrid)"
    type: str = "Full-time"
    salary: str = ""
    description: str = ""
    responsibilities: str = ""
    requirements: str = ""


@router.post("/jobs")
async def create_job(body: JobBody, db=Depends(get_db)):
    job = body.dict()
    job["isOpen"] = True
    job["createdAt"] = datetime.utcnow()
    result = await db["jobs"].insert_one(job)
    job["_id"] = str(result.inserted_id)
    _notify_job_subscribers(job, db)
    return job


@router.delete("/jobs/{job_id}")
async def delete_job(job_id: str, db=Depends(get_db)):
    result = await db["jobs"].find_one_and_delete({"_id": job_id})
    if result:
        result["_id"] = str(result["_id"])
    return result


@router.post("/training")
async def create_training(
    title: str = Form(...),
    duration: str = Form(...),
    tag: str = Form("Online"),
    category: str = Form("internship"),
    image: Optional[UploadFile] = File(None),
    db=Depends(get_db),
):
    image_url = _save_file(image) if image and image.filename else ""
    training = {
        "title": title, "duration": duration, "tag": tag,
        "category": category, "image": image_url,
        "createdAt": datetime.utcnow(),
    }
    result = await db["trainings"].insert_one(training)
    training["_id"] = str(result.inserted_id)
    return {"message": "Academy module synced successfully!", "data": training}


@router.delete("/training/{training_id}")
async def delete_training(training_id: str, db=Depends(get_db)):
    result = await db["trainings"].find_one_and_delete({"_id": training_id})
    if result:
        result["_id"] = str(result["_id"])
    return result


class SlideBody(BaseModel):
    image: Optional[str] = None
    smallTag: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    primaryBtn: Optional[str] = None
    secondaryBtn: Optional[str] = None


@router.post("/slides")
async def create_slide(body: SlideBody, db=Depends(get_db)):
    result = await db["slides"].insert_one(body.dict())
    return {"_id": str(result.inserted_id), **body.dict()}


@router.delete("/slides/{slide_id}")
async def delete_slide(slide_id: str, db=Depends(get_db)):
    result = await db["slides"].find_one_and_delete({"_id": slide_id})
    if result:
        result["_id"] = str(result["_id"])
    return result


def _notify_job_subscribers(job: dict, db):
    import threading

    def _send():
        import asyncio

        async def _inner():
            EMAIL_USER = os.getenv("EMAIL_USER")
            EMAIL_PASS = os.getenv("EMAIL_PASS")
            if not EMAIL_USER or not EMAIL_PASS:
                return
            try:
                subscribers = await db["applications"].distinct("email")
                if not subscribers:
                    return
                msg = MIMEMultipart("alternative")
                msg["From"] = EMAIL_USER
                msg["Subject"] = f"New Role Activated: {job['title']}"
                html = f"""<div style="font-family:sans-serif;padding:30px">
                    <h2>New Role: {job['title']}</h2>
                    <p>Department: {job.get('department','')}</p>
                    <p>Location: {job.get('location','')}</p>
                </div>"""
                msg.attach(MIMEText(html, "html"))
                msg["Bcc"] = ", ".join(subscribers)
                with smtplib.SMTP_SSL("smtp.gmail.com", 465) as s:
                    s.login(EMAIL_USER, EMAIL_PASS)
                    s.send_message(msg)
            except Exception as e:
                print(f"Subscriber email failed: {e}")

        asyncio.run(_inner())

    threading.Thread(target=_send, daemon=True).start()
