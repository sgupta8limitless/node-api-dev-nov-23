const http = require('http');




// create a server 

// 127.0.0.1:8000
//localhost:8000

http
.createServer((req,res)=>{

    console.log(req.url);
    console.log(req.method);

    if(req.url==="/products" && req.method=="GET")
    {
       
        res.end("Get Products Data");
    }
    else if (req.url=="/products" && req.method=="POST")
    {
        res.end("Created Product Data");
    }
    else if(req.url=="/users" && req.method=="POST")
    {
        res.end("Created User");
    }

  

})
.listen(8000)