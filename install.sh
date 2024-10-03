#!/bin/bash

set -e  # Exit on error

echo "🚀 Starting project setup..."

# Function to check command existence
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 is not installed"
        return 1
    fi
    echo "✅ $1 is installed"
    return 0
}

# Check for required commands
echo "🔍 Checking required tools..."
check_command "bun" || { echo "Bun is required but not installed. Please install from https://bun.sh/"; exit 1; }
check_command "python3" || { echo "Python 3 is required but not installed."; exit 1; }

# Clean up existing build artifacts
echo "🧹 Cleaning up old build artifacts..."
rm -rf node_modules bun.lockb
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
find . -name ".next" -type d -prune -exec rm -rf '{}' +
find . -name ".turbo" -type d -prune -exec rm -rf '{}' +

# Setup Bun environment
echo "📦 Installing dependencies..."
bun install


echo """
✅ Setup complete! 
"""