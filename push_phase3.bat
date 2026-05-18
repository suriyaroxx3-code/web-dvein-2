@echo off
cd /d "D:\Dvein proj\dvein.update1"
echo Removing any stale git lock...
if exist ".git\index.lock" del /f ".git\index.lock"
echo Adding all changes...
git add frontend/src/pages/Home.jsx
git add frontend/src/components/Navbar.jsx
git add frontend/src/pages/Training.jsx
git add frontend/src/index.css
git status
git commit -m "Phase3: remove TopBar, admin modal on logo, fix internship error, DVein font colors"
echo Pushing to GitHub...
git push origin main
echo Done.
pause
