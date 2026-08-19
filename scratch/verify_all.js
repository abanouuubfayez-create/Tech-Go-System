const fs = require('fs');
const path = require('path');

console.log('=== 1. Checking JS Syntax for All Files ===');
const jsFiles = [
  'app.js',
  'auth.js',
  'firebase-config.js',
  'formsend.js',
  'livetrack.js',
  'theme.js',
  'sw.js',
  'migration.js'
];

let jsErrors = 0;
jsFiles.forEach(f => {
  try {
    const code = fs.readFileSync(f, 'utf8');
    new Function(code);
    console.log(`[PASS] ${f} (${(code.length / 1024).toFixed(1)} KB) - Syntax Valid`);
  } catch (err) {
    console.error(`[FAIL] ${f} Error: ${err.message}`);
    jsErrors++;
  }
});

console.log('\n=== 2. Checking HTML files & Linked Local Assets ===');
const htmlFiles = ['index.html', 'employee.html', 'login.html', 'attendance.html', 'setup.html'];
let assetErrors = 0;

htmlFiles.forEach(hf => {
  if (!fs.existsSync(hf)) {
    console.error(`[FAIL] Missing HTML file: ${hf}`);
    assetErrors++;
    return;
  }
  const html = fs.readFileSync(hf, 'utf8');
  console.log(`Checking ${hf} (${(html.length / 1024).toFixed(1)} KB)...`);

  // Check script tags
  const scriptRegex = /<script\s+[^>]*src=["']([^"']+)["']/gi;
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    const src = match[1].split('?')[0];
    if (!src.startsWith('http') && !src.startsWith('//')) {
      const fullPath = path.resolve('.', src);
      if (fs.existsSync(fullPath)) {
        console.log(`  [OK] Script: ${src}`);
      } else {
        console.error(`  [FAIL] Missing Script in ${hf}: ${src}`);
        assetErrors++;
      }
    }
  }

  // Check stylesheet links
  const linkRegex = /<link\s+[^>]*href=["']([^"']+\.css[^"']*)["']/gi;
  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1].split('?')[0];
    if (!href.startsWith('http') && !href.startsWith('//')) {
      const fullPath = path.resolve('.', href);
      if (fs.existsSync(fullPath)) {
        console.log(`  [OK] CSS: ${href}`);
      } else {
        console.error(`  [FAIL] Missing CSS in ${hf}: ${href}`);
        assetErrors++;
      }
    }
  }
});

console.log('\n=== 3. Checking Manifest and PWA Assets ===');
if (fs.existsSync('manifest.json')) {
  try {
    const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
    console.log(`[PASS] manifest.json is valid (App name: "${manifest.name}")`);
    if (Array.isArray(manifest.icons)) {
      manifest.icons.forEach(icon => {
        if (fs.existsSync(icon.src)) {
          console.log(`  [OK] Icon: ${icon.src}`);
        } else {
          console.error(`  [FAIL] Missing Icon: ${icon.src}`);
          assetErrors++;
        }
      });
    }
  } catch (err) {
    console.error(`[FAIL] manifest.json parse error: ${err.message}`);
    assetErrors++;
  }
}

console.log('\n=== 4. Checking Service Worker Cache List ===');
if (fs.existsSync('sw.js')) {
  const swContent = fs.readFileSync('sw.js', 'utf8');
  const cacheNameMatch = swContent.match(/const CACHE_NAME = '([^']+)'/);
  if (cacheNameMatch) {
    console.log(`[PASS] sw.js active cache name: ${cacheNameMatch[1]}`);
  }
}

console.log('\n=== 5. Checking Firestore Rules File ===');
if (fs.existsSync('firestore.rules')) {
  const rules = fs.readFileSync('firestore.rules', 'utf8');
  console.log(`[PASS] firestore.rules exists (${(rules.length / 1024).toFixed(1)} KB)`);
}

console.log('\n========================================');
console.log(`DIAGNOSTICS SUMMARY:`);
console.log(`JavaScript Syntax Errors: ${jsErrors}`);
console.log(`Missing Assets/Links Errors: ${assetErrors}`);
console.log(`OVERALL STATUS: ${jsErrors === 0 && assetErrors === 0 ? 'ALL SYSTEMS OPERATIONAL & HEALTHY' : 'ISSUES DETECTED'}`);
console.log('========================================');
