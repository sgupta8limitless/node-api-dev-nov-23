const fs = require('fs');
const os = require('os');

// sync way of reading / writing

// reading file 
// let data = fs.readFileSync('./abc.txt','utf-8');

// console.log(data);

// writing file 

// fs.writeFileSync("./products.txt",'Apple');



// async way of reading / writing


// fs.readFile('./abc.txt','utf-8',(err,data)=>{

//         console.log(err);
//         console.log(data);

// })

// writing file 

// fs.writeFile('./products.txt','Mango',(err)=>{
//     console.log(err);
// })

// fs.appendFile('./products.txt','\tOrange',(err)=>{
//     console.log(err);
// })

fs.unlinkSync('abc.txt');



// console.log(os.platform());
// console.log(os.hostname())
// console.log(os.freemem());
// console.log(os.homedir());