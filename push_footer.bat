@echo off
cd /d "D:\Dvein proj\dvein.update1"
echo Removing any stale git lock...
if exist ".git\index.lock" del /f ".git\index.lock"
echo Adding changes...
git add frontend/src/components/Footer.jsx
git status
git commit -m "Redesign footer: compact layout, social links updated, remove tagline and map"
echo Pushing to GitHub...
git push origin main
echo Done.
pause
