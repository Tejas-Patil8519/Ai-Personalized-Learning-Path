@echo off
title AI Personalized Learning Path - Frontend
cd /d "%~dp0"
echo =======================================================
echo   AI Personalized Learning Path - Frontend Service
echo   React + Vite + Modern Glassmorphism UI
echo =======================================================

if not exist node_modules (
    echo [1/2] Installing frontend dependencies...
    call npm install
)

echo [2/2] Starting Frontend Vite development server...
call npm run dev
pause
