@echo off
title DVein - Full Clean Restart
echo ==========================================
echo   Killing all existing Node processes...
echo ==========================================
taskkill /F /IM node.exe /T 2>nul
taskkill /F /IM python.exe /T 2>nul
timeout /t 2 /nobreak >nul

echo ==========================================
echo   Starting Backend (port 5000)...
echo ==========================================
start "DVein Backend" cmd /k "cd /d "D:\Dvein proj\update 2\Dvein\python_backend" && pip install -r requirements.txt --quiet && python -m uvicorn main:app --host 0.0.0.0 --port 5000 --reload"

timeout /t 4 /nobreak >nul

echo ==========================================
echo   Starting Frontend (port 5173)...
echo ==========================================
start "DVein Frontend" cmd /k "cd /d "D:\Dvein proj\update 2\Dvein\frontend" && npm run dev"

timeout /t 8 /nobreak >nul

echo ==========================================
echo   Opening in Brave Browser...
echo ==========================================
start "" "C:\Users\diwap\AppData\Local\BraveSoftware\Brave-Browser\Application\brave.exe" "http://localhost:5173"

echo ==========================================
echo   Done! DVein is running.
echo ==========================================
