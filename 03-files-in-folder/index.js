const fs = require('fs/promises');
const path = require('path');
const dirpath=path.join(__dirname,'secret-folder');
(async function stats(){const files= await fs.readdir (dirpath,{withFileTypes: true});
    for (let file of files) {
      if(file.isFile()){
        const stats=await fs.stat(path.join(__dirname,'secret-folder',file.name))
        console.log(`${file.name.split('.')[0]}-${file.name.split('.')[1]}-${stats.size/1024}kb`);            
      }
    }
})();
