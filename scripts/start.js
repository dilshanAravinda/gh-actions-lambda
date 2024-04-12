const fs = require('fs');
const path = require('path');

const assetsDir = path.resolve(__dirname, '../dist/assets');

fs.readdir(assetsDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const mainFile = files.find(file => file.endsWith('.js')); // Assuming main file has .js extension

  if (!mainFile) {
    console.error('No JavaScript files found in dist/assets directory.');
    return;
  }

  const filePath = path.resolve(assetsDir, mainFile);
  require(filePath);
});
