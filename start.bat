@echo off
title AI Personalized Learning Path - Main Launcher
cd /d "%~dp0"
echo ===================================================================
echo     AI Personalized Learning Path - Full-Stack Launcher
echo ===================================================================
echo.
echo Launching Backend (FastAPI + RAG + MySQL / SQLite)...
start "AI Learning Path - Backend" cmd /c "cd /d "%~dp0Backend" && call start.bat"

echo Launching Frontend (React + Vite)...
start "AI Learning Path - Frontend" cmd /c "cd /d "%~dp0Frontend" && call start.bat"

echo.
echo Waiting 4 seconds for servers to initialize...
timeout /t 4 /nobreak >nul

echo Opening browser at http://localhost:5173 ...
start http://localhost:5173

echo.
echo ===================================================================
echo   System is running!
echo   Frontend : http://localhost:5173
echo   Backend  : http://localhost:8000
echo   API Docs : http://localhost:8000/docs
echo ===================================================================
echo Press any key to exit this launcher window (services keep running).
pause >nul
