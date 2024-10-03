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
check_command "node" || { echo "Node.js is required but not installed."; exit 1; }
check_command "python3" || { echo "Python 3 is required but not installed."; exit 1; }

# Install Bun if not already installed
if ! check_command "bun"; then
    echo "📦 Installing Bun..."
    curl -fsSL https://bun.sh/install | bash
    # Reloading shell configuration
    source ~/.bashrc 2>/dev/null || source ~/.zshrc 2>/dev/null || true
fi

# Clean up existing build artifacts
echo "🧹 Cleaning up old build artifacts..."
rm -rf node_modules bun.lockb
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
find . -name ".next" -type d -prune -exec rm -rf '{}' +
find . -name ".turbo" -type d -prune -exec rm -rf '{}' +

# Setup Node.js environment
echo "📦 Installing dependencies..."
bun install

# Build all packages
echo "🏗️ Building packages..."
bun run build

echo """
✅ Setup complete! 

To start development:
1. Start both backend and frontend: bun dev

The frontend will be available at http://localhost:3000
"""