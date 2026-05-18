@echo off
cd /d "D:\Dvein proj\web1\Dvein"
if exist ".git\index.lock" del /f ".git\index.lock"
git config user.email "prasantht2026@gmail.com"
git config user.name "Prasanth T"
git add .
git commit -m "fix: remove Join Connect button, replace MongoDB with JSON DB, fix Internships data, fix Collaboration WhatsApp redirect"
git push origin main
echo.
echo Done! Press any key to close.
pause
