const fs = require('fs/promises');
const path = require('path');
let bundlecss=[];

async function bundle() {
  const cssFolder = path.join(__dirname, 'styles');
  const files= await fs.readdir(cssFolder,{withFileTypes: true});
  for (let file of files) {
    if(file.isFile() && file.name.split('.')[file.name.split('.').length-1]=='css'){
      let data = await fs.readFile(path.join(cssFolder,file.name), { encoding: 'utf8' });
      bundlecss.push(data);
    }
  }
  
fs.access(path.join(__dirname,'project-dist','bundle.css'), fs.F_OK).then(() => {
	fs.unlink(path.join(__dirname,'project-dist','bundle.css'));
  fs.appendFile(path.join(__dirname,'project-dist','bundle.css'), bundlecss.join("\n"));
}).catch(() => {
	fs.appendFile(path.join(__dirname,'project-dist','bundle.css'), bundlecss.join("\n"));
});
  
}
bundle().catch(console.error);



