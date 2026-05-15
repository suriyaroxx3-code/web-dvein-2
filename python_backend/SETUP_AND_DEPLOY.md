# DVein FastAPI Backend — Setup, GitHub & Render Deploy Guide

## 📁 Project Structure
```
python_backend/
├── main.py              ← FastAPI app entry point
├── database.py          ← MongoDB dependency helper
├── auth_utils.py        ← JWT + bcrypt helpers
├── routers/
│   ├── auth.py          ← /api/auth/* routes
│   ├── public.py        ← /api/public/* routes
│   └── admin.py         ← /api/admin/* routes (protected)
├── create_admin.py      ← Run once to seed admin user
├── requirements.txt     ← Python dependencies
├── render.yaml          ← Render.com deploy config
├── .env                 ← Local environment variables
└── start.bat            ← One-click local start (Windows)
```

---

## ✅ STEP 1 — Run Locally

Open **Command Prompt** or **Git Bash** in the `python_backend` folder:

```bash
# Install Python dependencies
pip install -r requirements.txt

# Seed admin account (run only once)
python create_admin.py

# Start the FastAPI server on port 5000
uvicorn main:app --host 0.0.0.0 --port 5000 --reload
```

> Or just double-click **start.bat**

Server will be available at → http://localhost:5000  
Interactive API docs   → http://localhost:5000/docs

---

## ✅ STEP 2 — Run Frontend

Open a **second terminal** in the `frontend` folder:

```bash
npm install
npm run dev
```

Frontend will open at → http://localhost:5173

---

## ✅ STEP 3 — Push to GitHub

### 3a. Create a new repo on GitHub
1. Go to https://github.com/new
2. Name it: **DVeinWeb** (or any name)
3. Set it to **Public** or **Private**
4. **Do NOT** initialize with README (leave empty)
5. Click **Create repository**
6. Copy the HTTPS URL (e.g. `https://github.com/YourName/DVeinWeb.git`)

### 3b. Push from your computer

Open **Git Bash** inside the `python_backend` folder and run:

```bash
git init
git checkout -b main
git add .
git commit -m "feat: initial Python FastAPI backend"
git remote add origin https://github.com/YourName/DVeinWeb.git
git push -u origin main
```

> Replace `YourName` with your actual GitHub username.

---

## ✅ STEP 4 — Host Backend on Render

1. Go to https://render.com and sign in (use GitHub OAuth)
2. Click **New → Web Service**
3. Connect your **DVeinWeb** GitHub repo
4. Configure:
   | Setting | Value |
   |---|---|
   | **Root Directory** | `python_backend` |
   | **Runtime** | Python 3 |
   | **Build Command** | `pip install -r requirements.txt` |
   | **Start Command** | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
5. Under **Environment Variables**, add:
   | Key | Value |
   |---|---|
   | `MONGO_URI` | Your MongoDB Atlas URI (see Step 5) |
   | `JWT_SECRET` | `hVVYvMx4PysJmsoZv679+1S/xx/YP4JRZmrYtNfXLiU80U3Nd+XCdRoroUFl4pbRyTf2x+e2AIvI9K8c0bE4gQ==` |
   | `EMAIL_USER` | `dvein76@gmail.com` |
   | `EMAIL_PASS` | `gorl udpr lamn fmrh` |
   | `BASE_URL` | `https://your-render-url.onrender.com` |
6. Click **Create Web Service** — Render auto-deploys!

---

## ✅ STEP 5 — MongoDB Atlas (for Render)

Render cannot connect to `localhost` MongoDB. Use the free Atlas cloud DB:

1. Go to https://cloud.mongodb.com and sign up free
2. Create a **Free Cluster** (M0)
3. Under **Database Access** → Add user (e.g. `dveinuser` / `yourpassword`)
4. Under **Network Access** → Add IP `0.0.0.0/0` (allow all)
5. Click **Connect → Compass** and copy the URI, e.g.:
   ```
   mongodb+srv://dveinuser:yourpassword@cluster0.xxxxx.mongodb.net/dvein_careers
   ```
6. Set this as `MONGO_URI` in Render environment variables

---

## 📋 API Endpoints Reference

### Auth
| Method | URL | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/admin/login` | Admin login |

### Public
| Method | URL | Description |
|---|---|---|
| GET | `/api/public/jobs` | Get all jobs |
| GET | `/api/public/slides` | Get hero slides |
| GET | `/api/public/services` | Get services |
| GET | `/api/public/trainings` | Get training programs |
| GET | `/api/public/products` | Get products |
| GET | `/api/public/training-page` | Get training page data |
| POST | `/api/public/apply` | Submit job application (multipart) |

### Admin (🔒 Requires Bearer Token)
| Method | URL | Description |
|---|---|---|
| GET | `/api/admin/stats` | Dashboard stats |
| GET | `/api/admin/applications` | All applications |
| DELETE | `/api/admin/applications/:id` | Delete application |
| POST | `/api/admin/bulk-delete` | Bulk delete applications |
| POST | `/api/admin/products` | Add product (multipart) |
| DELETE | `/api/admin/products/:id` | Delete product |
| POST | `/api/admin/services` | Add service (multipart) |
| PUT | `/api/admin/services/:id` | Update service (multipart) |
| DELETE | `/api/admin/services/:id` | Delete service |
| POST | `/api/admin/jobs` | Create job (sends email to subscribers) |
| DELETE | `/api/admin/jobs/:id` | Delete job |
| POST | `/api/admin/training` | Add training (multipart) |
| DELETE | `/api/admin/training/:id` | Delete training |
| POST | `/api/admin/slides` | Add slide |
| DELETE | `/api/admin/slides/:id` | Delete slide |

---

## 🔑 Default Admin Credentials
```
Username: admin
Password: admin123
```
