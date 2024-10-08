#!/bin/bash

# Function to detect the operating system
detect_os() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "macos"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo "linux"
    else
        echo "unknown"
    fi
}

# Function to install packages on Linux
install_linux() {
    if command -v apt-get &> /dev/null; then
        sudo apt-get update
        sudo apt-get install -y $1
    elif command -v yum &> /dev/null; then
        sudo yum install -y $1
    elif command -v dnf &> /dev/null; then
        sudo dnf install -y $1
    else
        echo "Unsupported package manager. Please install $1 manually."
        exit 1
    fi
}

OS=$(detect_os)

if [ "$OS" == "macos" ]; then
    # Check for Homebrew and install if not found
    if ! command -v brew &> /dev/null; then
        echo "Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi

    # Check for Node.js and install if not found
    if ! command -v node &> /dev/null; then
        echo "Installing Node.js..."
        brew install node
    fi

    # Check for Python and install if not found
    if ! command -v python3 &> /dev/null; then
        echo "Installing Python..."
        brew install python
    fi
elif [ "$OS" == "linux" ]; then
    # Check for Node.js and install if not found
    if ! command -v node &> /dev/null; then
        echo "Installing Node.js..."
        install_linux nodejs
    fi

    # Check for Python and install if not found
    if ! command -v python3 &> /dev/null; then
        echo "Installing Python..."
        install_linux python3
    fi
else
    echo "Unsupported operating system"
    exit 1
fi

# Check for Bun and install if not found (works for both macOS and Linux)
if ! command -v bun &> /dev/null; then
    echo "Installing Bun..."
    curl -fsSL https://bun.sh/install | bash
fi

echo "Prerequisites installation complete. You can now run 'bun run install' or 'npm run install'."