import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

const ASSETS_DIR = './src/assets';
const QUALITY = 85;
const EXTENSIONS = ['.png', '.jpg', '.jpeg'];

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = join(dir, entry.name);
      return entry.isDirectory() ? getFiles(fullPath) : fullPath;
    })
  );
  return files.flat();
}

function formatKB(bytes) {
  return (bytes / 1024).toFixed(1) + ' KB';
}

async function convertToWebP(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!EXTENSIONS.includes(ext)) return null;

  const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  if (existsSync(webpPath)) {
    return null; // already converted
  }

  const before = (await stat(filePath)).size;
  await sharp(filePath).webp({ quality: QUALITY }).toFile(webpPath);
  const after = (await stat(webpPath)).size;

  return { filePath, webpPath, before, after };
}

async function main() {
  console.log('Converting images to WebP...\n');

  const files = await getFiles(ASSETS_DIR);
  const results = await Promise.all(files.map(convertToWebP));
  const converted = results.filter(Boolean);

  if (converted.length === 0) {
    console.log('All images already converted.');
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;

  converted.forEach(({ filePath, before, after }) => {
    const saving = (((before - after) / before) * 100).toFixed(0);
    console.log(`  ${basename(filePath)}`);
    console.log(`    ${formatKB(before)} → ${formatKB(after)} (-${saving}%)`);
    totalBefore += before;
    totalAfter += after;
  });

  const totalSaving = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(0);
  console.log(`\nTotal: ${formatKB(totalBefore)} → ${formatKB(totalAfter)} (-${totalSaving}%)`);
  console.log(`Converted ${converted.length} images.`);
}

main().catch(console.error);
