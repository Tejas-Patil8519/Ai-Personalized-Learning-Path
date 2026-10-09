@echo off
title AI Personalized Learning Path - Main Launcher
cd /d "%~dp0"
echo ===================================================================
echo     AI Personalized Learning Path - Full-Stack Launcher
echo ===================================================================
echo.

REM Check if MySQL is running on port 3306; start if not running
netstat -ano | findstr /R ":3306 " >nul
if %errorlevel% neq 0 (
    echo [INFO] Starting MySQL Server on port 3306...
    if exist "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe" (
        start "MySQL Server" /min "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe" --datadir="D:\mysql_data" --port=3306
        timeout /t 2 /nobreak >nul
    )
) else (
    echo [INFO] MySQL Server is already active on port 3306.
)

echo Launching Backend (FastAPI + RAG + MySQL)...
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
echo   MySQL    : localhost:3306 (Database: learning_path_db)
echo ===================================================================
echo Press any key to exit this launcher window (services keep running).
pause >nul
