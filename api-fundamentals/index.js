const http = require('http');
const fs = require('fs');
const url = require('url');


// create a server 

// 127.0.0.1:8000
//localhost:8000

http
.createServer((req,res)=>{

    let parsedUrl = url.parse(req.url,true);
    console.log(parsedUrl);

    // reading the file as string 
    let products=fs.readFileSync("./products.json","utf-8");

    // fetch all the products 
    if(parsedUrl.pathname=="/products" && req.method=="GET" && parsedUrl.query.id==undefined)
    {
       res.end(products);
    }
    // fetch product based on id 
    else if(parsedUrl.pathname=="/products" && req.method=="GET" && parsedUrl.query.id!=undefined)
    {
        let productArray=JSON.parse(products);

        let product = productArray.find((product)=>{
            return product.id==parsedUrl.query.id;
        })

        if(product!=undefined)
        {
            res.end(JSON.stringify(product));
        }
        else 
        {
            res.end(JSON.stringify({"message":"Product Not Found"}))
        }
     
    }
    // create new product 
    else if(req.method=="POST" && parsedUrl.pathname=="/products")
    {

        let product="";

        // this event is called for every chunk recived
        req.on("data",(chunk)=>{
           
            product=product+chunk;
        })

        // this event is called at the end of stream and converts bytes to readable string 
        req.on("end",()=>{

            let productsArray=JSON.parse(products);
            let newProduct = JSON.parse(product);

            productsArray.push(newProduct);

            fs.writeFile("./products.json",JSON.stringify(productsArray),(err)=>{
                if(err==null)
                {
                    res.end(JSON.stringify({"message":"New Product Created"}))
                }
            })


        })
        
        
    }

  
   
    

  

})
.listen(8000)