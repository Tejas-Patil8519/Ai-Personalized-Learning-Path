@echo off
title AI Personalized Learning Path - Backend
cd /d "%~dp0"
echo =======================================================
echo   AI Personalized Learning Path - Backend Service
echo   FastAPI + MySQL / RAG + Google AI Studio (Gemini)
echo =======================================================

if exist "..\.venv\Scripts\python.exe" (
    set PY_CMD="..\.venv\Scripts\python.exe"
) else (
    where py >nul 2>nul
    if %errorlevel%==0 (
        set PY_CMD=py
    ) else (
        set PY_CMD=python
    )
)

if not exist .env (
    if exist .env.example (
        copy .env.example .env >nul
        echo [INFO] Created .env configuration file from template.
    )
)

echo [1/2] Verifying Python backend dependencies...
%PY_CMD% -m pip install -r requirements.txt --quiet

echo [2/2] Starting Backend at http://localhost:8000 (API Docs at http://localhost:8000/docs)
%PY_CMD% -m uvicorn app:app --reload --host 0.0.0.0 --port 8000
pause
