@echo off
echo Starting DVein FastAPI Backend...
cd /d "%~dp0"

REM Install dependencies if needed
pip install -r requirements.txt --quiet

REM Create admin if not exists
python create_admin.py

REM Start server
uvicorn main:app --host 0.0.0.0 --port 5000 --reload
