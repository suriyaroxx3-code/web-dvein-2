@echo off
echo =========================================
echo   DVein FastAPI - Push to GitHub
echo =========================================
echo.

cd /d "D:\Dvein proj\DVeinWeb\DVeinWeb"

echo [1/5] Checking git repo...
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo Initializing git repo...
    git init
    git remote add origin https://github.com/Prasanth-T30/Dvein.git
    git fetch origin
    git checkout main
) else (
    echo Git repo already exists.
)

echo.
echo [2/5] Pulling latest from GitHub...
git pull origin main --rebase

echo.
echo [3/5] Staging python_backend folder...
git add python_backend/

echo.
echo [4/5] Committing...
git commit -m "feat: add Python FastAPI backend (converted from Node.js Express)"

echo.
echo [5/5] Pushing to https://github.com/Prasanth-T30/Dvein.git ...
git push origin main

echo.
echo =========================================
echo  SUCCESS! Check your repo:
echo  https://github.com/Prasanth-T30/Dvein
echo =========================================
pause
