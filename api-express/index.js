const express = require('express');
const mongoose = require('mongoose');

const app = express();

// middleware to read request data in post and put and converet ot js object 
app.use(express.json());

// database connection 

mongoose.connect("mongodb://localhost:27017/mongotuts")
.then(()=>{
    console.log("Database Connection Successfull")
})
.catch((err)=>{
    console.log(err)
})


// coding related to users 

// schema for users 

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Mandatory"]
    },
    email:{
        type:String,
        required:[true,"Email is Mandatory"]
    },
    password:{
        type:String,
        required:[true,"Password is Mandatory"]
    }
},{timestamps:true})


// model for user 

const userModel = mongoose.model("users",userSchema);

// endpoint to create a new user 

app.post("/users",(req,res)=>{

    

})










// coding related to products 

// schema for products 

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Mandatory"]
    },
    price:{
        type:Number,
        required:[true,"Price is Mandatory"],
        min:1
    },
    quantity:{
        type:Number,
        required:[true,"Quantity is Mandatory"],
    },
    category:{
        type:String,
        enum:["Clothing","Electronics","Household"]
    }
},{timestamps:true})


// model creation 

const productModel = mongoose.model("products",productSchema);


// endpoint  to fetch all products 
app.get("/products",(req,res)=>{


    productModel.find()
    .then((products)=>{
        res.send(products);
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some Problem"})
    })

   

})


// endpoint to fetch single product 

app.get("/products/:id",(req,res)=>{

    productModel.findOne({_id:req.params.id})
    .then((product)=>{
        res.send(product);
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some Problem"})
    })


})



// endpoint to create a product 
app.post("/products",(req,res)=>{

    let product = req.body;
    productModel.create(product)
    .then((document)=>{
        res.send({data:document,message:"Product Created"})
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some Problem"})
    })

   
})


// endpoint to delete 

app.delete("/products/:id",(req,res)=>{

    productModel.deleteOne({_id:req.params.id})
    .then((info)=>{
        res.send({message:"Product Deleted"})
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some Problem"})
    })
    

})


// endpoint to update 
app.put("/products/:id",(req,res)=>{

   let product = req.body;

   productModel.updateOne({_id:req.params.id},product)
   .then((info)=>{
        res.send({message:"Product Updated"})
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some Problem"})
    })


})


// sample idea 
// express.json(req,res,next)
// {
//     let product="";
//     req.on("data",(chunk)=>{
//         product+=chunk;
//     })

//     req.on("end",()=>{
//        req.body = JSON.parse(product);
//        next()
//     })

// }









// middleware logic 

// app.get("/testing/:id",middleman,(req,res)=>{

//     console.log("main endpoint")
//     res.send({message:"Testing request"})
//     //100

// })


// function middleman(req,res,next)
// {
//     if(req.params.id<10)
//     {
//         res.send({message:"You are blocked"})
//     }
//     else 
//     {
//         next()
//     }
// }




app.listen(8000,()=>{
    console.log("Server Up and running");
})