@echo off
SETLOCAL

echo 🚀 Starting project setup...

REM Check for Node.js
WHERE node >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is required but not installed.
    exit /b 1
)

REM Check for Python
WHERE python >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Python is required but not installed.
    exit /b 1
)

echo 🧹 Cleaning up old build artifacts...
rmdir /s /q node_modules 2>nul
del /f /q package-lock.json 2>nul
for /d /r . %%d in (node_modules) do @if exist "%%d" rmdir /s /q "%%d"
for /d /r . %%d in (.next) do @if exist "%%d" rmdir /s /q "%%d"
for /d /r . %%d in (.turbo) do @if exist "%%d" rmdir /s /q "%%d"

echo 📦 Installing dependencies...
call npm install

echo 🏗️ Building packages...
call npm run build

echo ✅ Setup complete!
echo.
echo To start development:
echo 1. Run: npm run dev
echo.
echo The frontend will be available at http://localhost:3000

ENDLOCAL