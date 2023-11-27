const http = require('http');
const fs = require('fs');
const url = require('url');


// create a server 

// 127.0.0.1:8000
//localhost:8000

http
.createServer((req,res)=>{

    // console.log(req.method);

    let parsedUrl = url.parse(req.url,true);
    // console.log(parsedUrl);

    // reading the file as string 
    let products=fs.readFileSync("./products.json","utf-8");

    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    res.setHeader("Access-Control-Allow-Methods","GET,PUT,POST,PATCH,DELETE,OPTIONS")
   
    // handling options preflight request which comes before post,put and delete automically 
    if(req.method=="OPTIONS")
    {
        res.end();
    }
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
                else 
                {
                    res.end(JSON.stringify({"message":"Some problem"}))
                }
            })


        })
        
        
    }

    // endpoint to update a product 
    else if(req.method=="PUT" && parsedUrl.pathname=="/products")
    {
        
    
        let product="";

        req.on("data",(chunk)=>{
            product+=chunk;
        })

        req.on("end",()=>{

            let productsArray=JSON.parse(products);
            let productOBJ = JSON.parse(product);

            let index = productsArray.findIndex((product)=>{
                return product.id==parsedUrl.query.id;
            })

            if(index!==-1)
            {
                productsArray[index]=productOBJ;

                fs.writeFile("./products.json",JSON.stringify(productsArray),(err)=>{
                    if(err==null)
                    {
                        res.end(JSON.stringify({"message":"Product successfully updated"}))
                    }
                    else 
                    {
                        res.end(JSON.stringify({"message":"Some problem"}))
                    }
                })


            }
            else 
            {
                res.end(JSON.stringify({"message":"The element with given id is not there"}))
            }



        })

    }

    // end point to delete a product based on id 
    else if(req.method=="DELETE" && parsedUrl.pathname=="/products")
    {
       
        let productsArray = JSON.parse(products);

        let index=productsArray.findIndex((product)=>{
            return product.id == parsedUrl.query.id;
        })

        if(index!==-1)
        {
            productsArray.splice(index,1);

            fs.writeFile("./products.json",JSON.stringify(productsArray),(err)=>{
                if(err==null)
                {
                    res.end(JSON.stringify({"message":"Product successfully deleted"}))
                }
                else 
                {
                    res.end(JSON.stringify({"message":"Some problem"}))
                }
            })
        }
        else 
        {
            res.end(JSON.stringify({"message":"The element with given id is not there"}))
        }
    

       

    }
    

  
   
    

  

})
.listen(8000)