const folders = ['./Array/', './Function/', './Object/', './String/'];
// const testFolder = './Array/';
const fs = require('fs');
const path = require('path');
const cat = require('cat');
const bundlePath = path.resolve(process.cwd(), './index.js');

// clear the file
fs.writeFileSync(path.resolve(process.cwd(), bundlePath), '');
// loop folders
folders.forEach(folder => {
  fs.readdir(folder, (err, files) => {
    files.forEach(file => {
      // console.log(file);
      let filePath = path.resolve(process.cwd(), `${folder}${file}`);
      // console.log(filePath);
      cat(filePath, (error, data)=>{
        if(error !== null) {
          console.log(error);
          process.exit();
        }
        fs.appendFileSync(bundlePath, `//${file}\n${data}\n`);
      });
    });
  });

});
