const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const klawSync = require('klaw-sync');

const source = path.resolve(__dirname, 'src/public/images');
const destination = path.resolve(__dirname, 'dist/images');

const makeDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

makeDir(destination);

klawSync(source, { nodir: true })
  .forEach(({ path: imagePath }) => {
    const ACCEPTED_EXTENSIONS = ['.png', '.jpg', '.svg', '.tiff', '.webp'];
    const { dir, name, ext } = path.parse(imagePath);
    const subdir = dir.replace(source, '');

    if (!ACCEPTED_EXTENSIONS.includes(ext)) return;

    if (subdir) {
      makeDir(`${destination}${subdir}`);
    }

    sharp(imagePath)
      .resize(800)
      .toFile(`${destination}${subdir}/${name}-large${ext}`);

    sharp(imagePath)
      .resize(480)
      .toFile(`${destination}${subdir}/${name}-small${ext}`);
  });
