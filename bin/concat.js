const folders = ['./Array/', './Function/', './JSON/', './Object/', './String/', './Date/'];
const fs = require('fs');
const path = require('path');
const cat = require('cat');
const bundlePath = path.resolve(process.cwd(), './index.js');
const bundleTypeScriptDefinitionPath = path.resolve(process.cwd(), './index.d.ts');
let hasLicense = false;

// clear the files (if not exists, it will be created)
fs.writeFileSync(bundlePath, '');
fs.writeFileSync(bundleTypeScriptDefinitionPath, '');

// loop folders
folders.forEach((folder) => {
  fs.readdir(folder, (err, files) => {
    files = files.filter((file) => !(/(^|\/)\.[^\/\.]/g).test(file));
    
    files.forEach((file) => {
      let filePath = path.resolve(process.cwd(), `${folder}${file}`);
      cat(filePath, (error, data) => {
        if (error !== null) {
          console.log(error);
          process.exit();
        }

        fs.appendFileSync(bundlePath, `//${file}\n${data}\n`);
      });
    });
  });

  // build TypeScript-Definition path
  const tsdFilename = `${path.basename(folder)}.d.ts`;
  const tsdPath = path.resolve(process.cwd(), tsdFilename);

  // if TypeScript-Definition exists
  if (fs.existsSync(tsdPath)) {
    cat(tsdPath, (error, data) => {
      if (error !== null) {
        console.log(error);
        process.exit();
      }

      if (!hasLicense) {
        // add one times Apache license
        hasLicense = true;
      } else {
        // remove Apache License
        data = data.split('\n').slice(14).join('\n');
      }

      fs.appendFileSync(bundleTypeScriptDefinitionPath, `// ${tsdFilename}\n${data}\n`);
    });
  }
});