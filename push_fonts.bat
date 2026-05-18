@echo off
cd /d "D:\Dvein proj\dvein.update1"
if exist ".git\index.lock" del /f ".git\index.lock"
git add frontend/index.html
git add frontend/tailwind.config.js
git add frontend/src/index.css
git add CLAUDE.md
git status
git commit -m "Typography upgrade: Space Grotesk + DM Sans + JetBrains Mono, refined text palette"
echo Pushing to GitHub...
git push origin main
echo Done.
pause
