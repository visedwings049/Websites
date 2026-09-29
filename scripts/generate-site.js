#!/usr/bin/env node
// Generates a business site from templates/<template> using a config JSON.
// Usage: node scripts/generate-site.js <config.json> [templateName]

const fs = require('fs');
const path = require('path');

const configPath = process.argv[2];
const templateName = process.argv[3] || 'business';

if (!configPath) {
  console.error('Usage: node scripts/generate-site.js <config.json> [templateName]');
  process.exit(1);
}

const root = path.resolve(__dirname, '..');
const templateDir = path.join(root, 'templates', templateName);
const config = JSON.parse(fs.readFileSync(path.resolve(configPath), 'utf8'));

if (!config.slug) {
  console.error('Config must include a "slug" field (used as the output directory name).');
  process.exit(1);
}
if (!fs.existsSync(templateDir)) {
  console.error(`Template "${templateName}" not found at ${templateDir}`);
  process.exit(1);
}

const outDir = path.join(root, 'sites', config.slug);
fs.mkdirSync(outDir, { recursive: true });

function renderString(str) {
  return str.replace(/{{\s*([\w.]+)\s*}}/g, (match, key) => {
    const value = key.split('.').reduce((obj, part) => (obj == null ? undefined : obj[part]), config);
    return value === undefined ? match : String(value);
  });
}

function renderServices() {
  return (config.services || [])
    .map((s) => `      <div class="card">\n        <h3>${escapeHtml(s.title)}</h3>\n        <p>${escapeHtml(s.description)}</p>\n      </div>`)
    .join('\n');
}

function renderTestimonials() {
  return (config.testimonials || [])
    .map((t) => `      <div class="testimonial">\n        <p class="quote">"${escapeHtml(t.quote)}"</p>\n        <p class="author">— ${escapeHtml(t.author)}</p>\n      </div>`)
    .join('\n');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function copyAndRender(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.name === 'config.example.json') continue;
    if (entry.isDirectory()) {
      copyAndRender(srcPath, destPath);
    } else if (/\.(html|css|js|svg)$/.test(entry.name)) {
      let content = fs.readFileSync(srcPath, 'utf8');
      content = renderString(content);
      if (entry.name === 'index.html') {
        content = content.replace('<!-- SERVICES -->', renderServices());
        content = content.replace('<!-- TESTIMONIALS -->', renderTestimonials());
      }
      fs.writeFileSync(destPath, content);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyAndRender(templateDir, outDir);

console.log(`Site generated at sites/${config.slug}/`);
console.log(`Open sites/${config.slug}/index.html in a browser to preview.`);
