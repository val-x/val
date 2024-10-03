const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const isWindows = process.platform === 'win32';

function checkPythonVenv() {
  const venvPath = isWindows ? 'venv\\Scripts\\python.exe' : 'venv/bin/python';
  return fs.existsSync(venvPath);
}

function createVenv() {
  console.log('Creating Python virtual environment...');
  try {
    execSync('python -m venv venv', { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to create virtual environment:', error);
    process.exit(1);
  }
}

function activateAndInstall() {
  const venvPath = isWindows ? '.\\venv\\Scripts' : './venv/bin';
  const pythonPath = path.join(venvPath, 'python');
  const pipPath = path.join(venvPath, 'pip');

  try {
    if (isWindows) {
      execSync(`${pythonPath} -m pip install -e .`, { stdio: 'inherit' });
    } else {
      execSync(`${pythonPath} -m pip install -e .`, { stdio: 'inherit' });
    }
  } catch (error) {
    console.error('Failed to install Python dependencies:', error);
    process.exit(1);
  }
}

function startPythonApp() {
  console.log('Starting Python application...');
  try {
    const venvPythonPath = isWindows ? path.join(process.cwd(), 'venv', 'Scripts', 'python.exe') : path.join(process.cwd(), 'venv', 'bin', 'python');
    console.log(`Using Python path: ${venvPythonPath}`);
    
    // Check if the Python executable exists
    if (!fs.existsSync(venvPythonPath)) {
      throw new Error(`Python executable not found at ${venvPythonPath}`);
    }

    // Check if main.py exists
    const mainPyPath = path.join(process.cwd(), 'main.py');
    if (!fs.existsSync(mainPyPath)) {
      throw new Error(`main.py not found at ${mainPyPath}`);
    }

    console.log('Executing: ' + `${venvPythonPath} ${mainPyPath}`);
    
    // Use spawn instead of execSync for better control
    const pythonProcess = require('child_process').spawn(venvPythonPath, [mainPyPath], {
      stdio: 'inherit',
      shell: true
    });

    pythonProcess.on('error', (error) => {
      console.error('Failed to start Python process:', error);
      process.exit(1);
    });

    pythonProcess.on('exit', (code) => {
      if (code !== 0) {
        console.error(`Python process exited with code ${code}`);
        process.exit(code);
      }
    });

    // Handle SIGINT (Ctrl+C) to gracefully shut down the Python process
    process.on('SIGINT', () => {
      console.log('Received SIGINT. Stopping Python process...');
      pythonProcess.kill('SIGINT');
    });

  } catch (error) {
    console.error('Failed to start Python application:', error);
    console.error('Current working directory:', process.cwd());
    console.error('Directory contents:', fs.readdirSync(process.cwd()));
    process.exit(1);
  }
}

function main() {
  if (!checkPythonVenv()) {
    createVenv();
  }
  activateAndInstall();
  console.log('Python environment prepared successfully!');
  startPythonApp();
}

main();