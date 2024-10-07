#!/usr/bin/env node

const { program } = require('commander');
const io = require('socket.io-client');
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

function detectLanguage(code) {
  if (code.startsWith('#!/bin/bash') || code.startsWith('#!/bin/sh')) {
    return 'bash';
  } else if (code.includes('def ') || code.includes('import ')) {
    return 'python';
  } else if (code.includes('function ') || code.includes('const ') || code.includes('let ')) {
    return 'javascript';
  }
  return 'unknown';
}

async function executeCode(code, language) {
  const tempDir = path.join(__dirname, 'temp');
  await fs.mkdir(tempDir, { recursive: true });
  const tempFile = path.join(tempDir, `temp_${Date.now()}.${language}`);
  
  await fs.writeFile(tempFile, code);

  let command;
  switch (language) {
    case 'bash':
      command = `bash ${tempFile}`;
      break;
    case 'python':
      command = `python ${tempFile}`;
      break;
    case 'javascript':
      command = `node ${tempFile}`;
      break;
    default:
      throw new Error('Unsupported language');
  }

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      fs.unlink(tempFile).catch(console.error); // Clean up temp file
      if (error) {
        reject(`Error: ${error.message}\n${stderr}`);
      } else {
        resolve(stdout);
      }
    });
  });
}

program
  .command('connect <connectionId>')
  .description('Connect to the Valen server')
  .action((connectionId) => {
    console.log(`Connecting with ID: ${connectionId}`);
    const socket = io('http://localhost:3001');

    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('register', { connectionId });
    });

    socket.on('command', async (data, callback) => {
      console.log('Received command:', data.command);
      const language = detectLanguage(data.command);
      console.log(`Detected language: ${language}`);

      try {
        const output = await executeCode(data.command, language);
        console.log(`Output: ${output}`);
        callback({ output });
      } catch (error) {
        console.error(`Error: ${error}`);
        callback({ error: error.toString() });
      }
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  });

program.parse(process.argv);