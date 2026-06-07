const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '..', 'public', 'img');
const outputDir = path.join(inputDir, 'optimized');
const widths = [400, 800, 1200];

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

async function processImage(file) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

  const name = path.basename(file, ext);
  const inputPath = path.join(inputDir, file);

  for (const w of widths) {
    const outWebp = path.join(outputDir, `${name}-${w}.webp`);
    const outJpg = path.join(outputDir, `${name}-${w}.jpg`);

    try {
      await sharp(inputPath)
        .resize({ width: w })
        .webp({ quality: 70 })
        .toFile(outWebp);

      await sharp(inputPath)
        .resize({ width: w })
        .jpeg({ quality: 75 })
        .toFile(outJpg);

      console.log(`Generated: ${outWebp} and ${outJpg}`);
    } catch (err) {
      console.error(`Failed to process ${file} @ ${w}px`, err);
    }
  }
}

fs.readdir(inputDir, (err, files) => {
  if (err) return console.error(err);
  files.forEach((f) => {
    if (fs.lstatSync(path.join(inputDir, f)).isFile()) {
      processImage(f);
    }
  });
});
