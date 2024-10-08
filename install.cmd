@echo off

:: Check for Chocolatey and install if not found
where choco >nul 2>nul
if %errorlevel% neq 0 (
    echo Installing Chocolatey...
    @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
)

:: Check for Node.js and install if not found
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Installing Node.js...
    choco install nodejs -y
)

:: Check for Bun and install if not found
where bun >nul 2>nul
if %errorlevel% neq 0 (
    echo Installing Bun...
    powershell -Command "iwr bun.sh/install.ps1|iex"
)

:: Check for Python and install if not found
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo Installing Python...
    choco install python -y
)

echo Prerequisites installation complete. You can now run 'bun run install' or 'npm run install'.