@echo off
echo Cleaning up old dependencies...
bun run rimraf node_modules **/node_modules

echo Installing dependencies...
bun install

echo Setup complete!