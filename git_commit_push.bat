@echo off
title DVein - Git Commit and Push
echo ==========================================
echo   DVein Innovations - Git Push
echo ==========================================
cd /d "D:\Dvein proj\update 2\Dvein"

git config user.email "prasantht2026@gmail.com"
git config user.name "Genjaku"

REM Remove stale lock file if exists
if exist ".git\index.lock" del /f ".git\index.lock"

git add -A

git commit -m "feat: Add PDF downloads, Our Story page with techie animation

- Download Roadmap button in CoursesPage now opens DVein_Roadmap_LightTheme_removed.pdf
- Download Project Ledger button in StudentProjects now opens DVein_Projects_List.pdf
- Added OurStory page (/our-story) with matrix/particle techie animated background
- Read Our Story button in WelcomeSection now navigates to /our-story route
- Added /our-story route in App.jsx (Navbar+Footer hidden on that page)
- Added both PDFs to frontend/public/ for static serving
- Added helper bat files: start_backend_new, start_frontend_new, open_app"

git push origin main

echo.
echo ==========================================
echo   Push Complete!
echo ==========================================
pause
