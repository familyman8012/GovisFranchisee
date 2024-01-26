const fs = require('fs');
const path = require('path');

// 대상 폴더 지정
const targetDirectory = './public/images/icons'; // 여기에 원하는 폴더 경로를 넣어주세요.

fs.readdir(targetDirectory, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    if (file.startsWith('icon-24-')) {
      const oldPath = path.join(targetDirectory, file);
      const newPath = path.join(targetDirectory, file.replace('icon-24-', ''));
      fs.rename(oldPath, newPath, fserr => {
        if (fserr) {
          console.error(`Error renaming file ${file}:`, fserr);
        } else {
          console.log(`Renamed ${file} to ${file.replace('icon-24-', '')}`);
        }
      });
    }
  });
});
