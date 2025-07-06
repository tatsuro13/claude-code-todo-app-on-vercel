#!/usr/bin/env node

import { spawn } from 'child_process';
import http from 'http';

console.log('Starting development servers...');

// ヘルスチェック関数
function waitForServer(port, maxAttempts = 30) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    
    const checkServer = () => {
      attempts++;
      
      const req = http.get(`http://localhost:${port}/api/health`, (res) => {
        if (res.statusCode === 200) {
          console.log(`Server on port ${port} is ready!`);
          resolve();
        } else if (attempts < maxAttempts) {
          setTimeout(checkServer, 1000);
        } else {
          reject(new Error(`Server on port ${port} failed to start after ${maxAttempts} attempts`));
        }
      });
      
      req.on('error', () => {
        if (attempts < maxAttempts) {
          setTimeout(checkServer, 1000);
        } else {
          reject(new Error(`Server on port ${port} failed to start after ${maxAttempts} attempts`));
        }
      });
      
      req.end();
    };
    
    setTimeout(checkServer, 2000); // 初回は2秒待つ
  });
}

// APIサーバーを起動
const apiServer = spawn('npm', ['run', 'dev:api'], {
  stdio: 'inherit',
  shell: true
});

// APIサーバーが起動するまで待機
await waitForServer(3000).catch((err) => {
  console.error('API server failed to start:', err);
  process.exit(1);
});

// フロントエンドサーバーを起動
const frontendServer = spawn('npm', ['run', 'dev:frontend'], {
  stdio: 'inherit',
  shell: true
});

// プロセス終了時のクリーンアップ
process.on('SIGINT', () => {
  console.log('\nShutting down servers...');
  apiServer.kill();
  frontendServer.kill();
  process.exit();
});

process.on('SIGTERM', () => {
  apiServer.kill();
  frontendServer.kill();
  process.exit();
});