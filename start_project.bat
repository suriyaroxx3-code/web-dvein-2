@echo off
echo ==========================================
echo   DVein Innovations - Starting Project
echo ==========================================

echo Starting Backend (FastAPI on port 5000)...
start "DVein Backend" cmd /k "cd /d "D:\Dvein proj\dvein.update1\python_backend" && python -m uvicorn main:app --host 0.0.0.0 --port 5000 --reload"

timeout /t 3 /nobreak >nul

echo Starting Frontend (Vite on port 5173)...
start "DVein Frontend" cmd /k "cd /d "D:\Dvein proj\dvein.update1\frontend" && npm install && npm run dev"

echo.
echo ==========================================
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:5000
echo ==========================================
echo Both servers are starting in separate windows.
pause
