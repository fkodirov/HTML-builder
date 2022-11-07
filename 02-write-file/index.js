const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');

const stream = fs.createWriteStream(path.join(__dirname,'text.txt'),'utf-8');
const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout,
})
rl.write(`Hello student! Type something... \n`);
rl.on('line', data=>{
  if(data=='exit') {bye();}
  stream.write(data);
  
});
rl.on('SIGINT', bye);

  function bye (){
  stream.end();
  rl.write(`Bye! Good luck! \n`);
  rl.close();
  process.exit(0);
}




