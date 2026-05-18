@echo off
echo ==========================================
echo   DVein Backend - Starting FastAPI
echo ==========================================
cd /d "D:\Dvein proj\dvein.update1\python_backend"
echo Running uvicorn on port 5000...
python -m uvicorn main:app --host 0.0.0.0 --port 5000 --reload
pause
