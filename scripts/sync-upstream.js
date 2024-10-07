const { execSync } = require('child_process');

function runCommand(command) {
  try {
    return execSync(command, { stdio: 'inherit', encoding: 'utf8' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    return null;
  }
}

function branchExists(branch) {
  try {
    execSync(`git rev-parse --verify ${branch}`, { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

function syncUpstream() {
  const commands = [
    'git remote add upstream https://github.com/exo-explore/exo.git || true',
    'git fetch upstream',
    'git checkout develop || git checkout -b develop',
  ];

  commands.forEach(runCommand);

  if (branchExists('upstream/develop')) {
    runCommand('git merge upstream/develop');
  } else {
    console.log('upstream/develop branch does not exist. Skipping merge.');
  }

  runCommand('git checkout main || git checkout -b main');

  if (branchExists('upstream/main')) {
    runCommand('git merge upstream/main');
  } else {
    console.log('upstream/main branch does not exist. Skipping merge.');
  }

  runCommand('git checkout develop');
  console.log('Successfully synced with upstream');
}

syncUpstream();