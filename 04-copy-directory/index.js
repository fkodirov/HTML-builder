const fs = require('fs/promises');
const path = require('path');

async function copyDir() {
  const projectFolder = path.join(__dirname, 'files-copy');
  const dirCreation = await fs.mkdir(projectFolder, { recursive: true });
  const files= await fs.readdir(path.join(__dirname, 'files'),{withFileTypes: true});
  const filescopy= await fs.readdir(path.join(__dirname, 'files-copy'),{withFileTypes: true});
  if(filescopy!=''){
    for (let file of filescopy) {
      await fs.unlink(path.join(__dirname, 'files-copy',file.name));
    }
  }
  for (let file of files) {
    if(file.isFile()){
      const stats=await fs.stat(path.join(__dirname,'files',file.name))
      fs.copyFile(path.join(__dirname,'files',file.name), path.join(__dirname,'files-copy',file.name))           
    }
  }
}
copyDir().catch(console.error);
