#!/bin/bash

# Install Bun (if not already installed)
if ! command -v bun &> /dev/null
then
    curl -fsSL https://bun.sh/install | bash
fi

# Clean up node_modules and other build artifacts
rm -rf node_modules
rm -rf exo/packages/*/node_modules
rm -rf exo/packages/*/build

# Install root dependencies
bun install

# Bootstrap the project using Lerna
bun run bootstrap

# Install Python dependencies
python3.12 -m venv venv
source venv/bin/activate
pip install -e .

echo "Setup complete!"