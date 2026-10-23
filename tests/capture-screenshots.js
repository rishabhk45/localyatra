import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFile } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = path.join(rootDir, reqPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    res.end(data);
  });
});

const PORT = 3333;
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.join(rootDir, 'docs', 'screenshots');

const viewports = [
  { 
    name: '360px', 
    width: 360, 
    height: 800,
    mobile: true
  },
  { 
    name: '768px', 
    width: 768, 
    height: 1024,
    mobile: false
  },
  { 
    name: '1280px', 
    width: 1280, 
    height: 900,
    mobile: false
  }
];

const routes = [
  { prefix: 'landing', hash: '#/' },
  { prefix: 'plan', hash: '#/plan' }
];

function capture(url, outPath, vp) {
  return new Promise((resolve, reject) => {
    const tmpProfile = path.join(rootDir, '.temp_chrome_' + Date.now() + '_' + Math.random().toString(36).substring(7));
    const args = [
      '--headless=new',
      '--incognito',
      '--disable-cache',
      '--disable-gpu',
      '--hide-scrollbars',
      '--enable-viewport',
      '--force-device-scale-factor=1',
      `--user-data-dir=${tmpProfile}`,
      `--window-size=${vp.width},${vp.height}`,
      `--screenshot=${outPath}`
    ];

    if (vp.mobile) {
      args.push('--enable-viewport');
      args.push('--use-mobile-user-agent');
      args.push('--user-agent=Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36');
    }

    args.push(url);

    execFile(CHROME_PATH, args, (err) => {
      try {
        fs.rmSync(tmpProfile, { recursive: true, force: true });
      } catch (e) {}
      if (err) return reject(err);
      resolve();
    });
  });
}

server.listen(PORT, async () => {
  console.log(`Test static server running on http://localhost:${PORT}`);
  try {
    for (const route of routes) {
      for (const vp of viewports) {
        const outFileName = `${route.prefix}-${vp.name}.png`;
        const outPath = path.join(outDir, outFileName);
        const targetUrl = `http://localhost:${PORT}/${route.hash}`;
        console.log(`Capturing ${outFileName} at ${vp.width}x${vp.height}...`);
        await capture(targetUrl, outPath, vp);
        console.log(`✓ Saved ${outFileName}`);
      }
    }
    console.log('All screenshots captured successfully!');
  } catch (err) {
    console.error('Error capturing screenshots:', err);
  } finally {
    server.close(() => {
      console.log('Test server closed.');
      process.exit(0);
    });
  }
});
