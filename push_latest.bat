@echo off
cd /d "D:\Dvein proj\dvein.update1"
echo Removing any stale git lock...
if exist ".git\index.lock" del /f ".git\index.lock"
echo Adding all changes...
git add frontend/src/components/Footer.jsx
git add frontend/src/components/AnimatedRoadmap.jsx
git add frontend/src/pages/Training.jsx
git add frontend/src/pages/CoursesPage.jsx
git add frontend/src/pages/SoftwareSolutions.jsx
git add frontend/src/pages/StudentProjects.jsx
git add CLAUDE.md
git status
git commit -m "Facebook link, tel/mailto footer, Google Form buttons, animated roadmaps, CLAUDE.md"
echo Pushing to GitHub...
git push origin main
echo Done.
pause
