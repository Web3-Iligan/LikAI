#!/bin/bash

set -e

echo "Starting post-create installation script..."

# 1. Install libunwind-dev
echo "Installing libunwind-dev..."
sudo apt-get update -y
sudo apt-get install -y libunwind-dev
echo "libunwind-dev installed."

# 2. Install nvm (Node Version Manager) and the latest Node.js
echo "Installing nvm..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Source nvm to make it available in the current session
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 

echo "Installing latest Node.js via nvm..."
nvm install node 
nvm use node
nvm alias default node
echo "Node.js (latest) installed and set as default via nvm."
node -v
npm -v


echo "Installing IC CDK (dfx) using the official install script..."
DFXVM_INIT_YES=true sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"

source "$HOME/.local/share/dfx/env"
echo "IC CDK (dfx) installed."
dfx --version

# Install the Motoko Package Manager
npm i -g ic-mops
mops install

# 5. Install npm packages
echo "Installing npm packages..."
npm run setup
echo "npm install executed."


echo "All specified packages and tools installed successfully!"
