const fs = require('fs/promises');
const path = require('path');
let bundlecss=[];
async function buildPage() {
//create dir project-dist
const dirCreation = await fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
//index.html
let data = await fs.readFile(path.join(__dirname,'template.html'), { encoding: 'utf8' });
const regex = /{{(.*?)}}/g;
let matchAll = data.matchAll(regex);
matchAll = Array.from(matchAll);

const htmlFiles= await fs.readdir (path.join(__dirname,'components'),{withFileTypes: true});
  for (let file of htmlFiles) {
    if(file.isFile() && file.name.split('.')[file.name.split('.').length-1]=='html'){
      for(let arr of matchAll){
        if(arr.includes(file.name.split('.')[0])){
          let getFile=await fs.readFile(path.join(__dirname,'components',file.name), { encoding: 'utf8' });
          data=data.replace(arr[0],getFile);
        }         
      }
    }
  }
fs.writeFile(path.join(__dirname,'project-dist', 'index.html'), data);

  //copy assets
  async function copyFile(dirname){
    let assetsFiles= await fs.readdir(path.join(__dirname, dirname),{withFileTypes: true});
    for (let file of assetsFiles) {
      if(file.isDirectory()){
        await fs.mkdir(path.join(__dirname,'project-dist',dirname,file.name), { recursive: true });
        copyFile(`assets/${file.name}`);
      }
      else{
        await fs.copyFile(path.join(__dirname,dirname,file.name), path.join(__dirname,'project-dist',dirname,file.name));
      }             
    }
  }
  copyFile('assets');

//bundle.css 
const files= await fs.readdir(path.join(__dirname,'styles'),{withFileTypes: true});
  for (let file of files) {
    if(file.isFile() && file.name.split('.')[file.name.split('.').length-1]=='css'){
      let data = await fs.readFile(path.join(__dirname,'styles',file.name), { encoding: 'utf8' });
      bundlecss.push(data);
    }
  }
  fs.access(path.join(__dirname,'project-dist','style.css'), fs.F_OK).then(() => {
    fs.unlink(path.join(__dirname,'project-dist','style.css'));
    fs.appendFile(path.join(__dirname,'project-dist','style.css'), bundlecss.join("\n"));
  }).catch(() => {
    fs.appendFile(path.join(__dirname,'project-dist','style.css'), bundlecss.join("\n"));
  });
}buildPage().catch(console.error);