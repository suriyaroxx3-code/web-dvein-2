@echo off
cd /d "D:\Dvein proj\dvein.update1"
echo Removing any stale git lock...
if exist ".git\index.lock" del /f ".git\index.lock"
echo Adding changes...
git add frontend/src/pages/CoursesPage.jsx
git add frontend/src/components/Footer.jsx
git status
git commit -m "Browse Curriculum opens Google Form; footer centered; copy-on-hover for phone/email"
echo Pushing to GitHub...
git push origin main
echo Done.
pause
