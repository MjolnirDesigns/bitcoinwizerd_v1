// scripts/build-no-types.js
import { spawn } from 'child_process';
const build = spawn('next', ['build'], { stdio: 'inherit' });

build.on('error', (error) => {
  console.error('Build error:', error);
  process.exit(1);
});

build.on('exit', (code) => {
  process.exit(code);
});