@echo off
title DVein Backend - FastAPI
echo ==========================================
echo   DVein Backend Starting on port 5000
echo ==========================================
cd /d "D:\Dvein proj\update 2\Dvein\python_backend"
pip install -r requirements.txt --quiet
python -m uvicorn main:app --host 0.0.0.0 --port 5000 --reload
pause
