const { execSync } = require('child_process');
const os = require('os');

function installDocker() {
  const platform = os.platform();

  console.log('Checking for Docker installation...');

  try {
    execSync('docker --version', { stdio: 'ignore' });
    console.log('Docker is already installed.');
    return;
  } catch (error) {
    console.log('Docker is not installed. Attempting to install...');

    try {
      if (platform === 'darwin') {
        // macOS
        console.log('Installing Docker for macOS using Homebrew...');
        execSync('brew install docker', { stdio: 'inherit' });
        console.log('Docker installed successfully. You may need to start the Docker daemon manually.');
      } else if (platform === 'linux') {
        // Linux
        console.log('Installing Docker for Linux...');
        execSync('curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh', { stdio: 'inherit' });
        console.log('Docker installed successfully. You may need to start the Docker daemon manually.');
      } else if (platform === 'win32') {
        // Windows
        console.log('Automatic installation on Windows is not supported.');
        console.log('Please install Docker manually:');
        console.log('1. Install WSL2: https://docs.microsoft.com/en-us/windows/wsl/install');
        console.log('2. Install Docker Engine for WSL2: https://docs.docker.com/engine/install/ubuntu/');
      } else {
        console.log('Unsupported platform for automatic Docker installation.');
        console.log('Please install Docker manually: https://docs.docker.com/engine/install/');
      }
    } catch (installError) {
      console.error('Failed to install Docker:', installError.message);
      console.log('Please install Docker manually: https://docs.docker.com/engine/install/');
    }
  }
}

installDocker();