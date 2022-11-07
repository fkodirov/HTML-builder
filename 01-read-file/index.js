const fs = require('fs');
const path = require('path');


var stream = new fs.ReadStream(path.join(__dirname,'text.txt'),'utf-8');
let data=''; let chunk;
stream.on('readable', function(){
  
   if((chunk=stream.read())!=null){data+= chunk;}
});
 
stream.on('end', function(){
    console.log(data);
});