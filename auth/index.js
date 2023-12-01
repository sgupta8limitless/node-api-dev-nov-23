const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// database connection 

mongoose.connect("mongodb://localhost:27017/auth-demo")
.then(()=>{
    console.log("DB Connection Successfull")
})
.catch((err)=>{
    console.log(err);
})

// schema for user 
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

// model for user 

const userModel = mongoose.model("users",userSchema)


// endpoints 

const app = express();

app.use(express.json())

app.post("/register",(req,res)=>{

    let user = req.body;

    bcrypt.genSalt(10,(err,salt)=>{
        if(!err)
        {
            bcrypt.hash(user.password,salt,(err,hpass)=>{
                if(!err)
                {
                   user.password = hpass;

                   userModel.create(user)
                    .then((doc)=>{
                        res.status(201).send({message:"User Registration Successfull"})
                    })
                    .catch((err)=>{
                        console.log(err);
                        res.status(500).send({message:"Some Problem"})
                    })

                }
               

            })
        }
    })


})


// endpoint for login 


app.post("/login",(req,res)=>{

    let userCred=req.body;

    userModel.findOne({email:userCred.email})
    .then((user)=>{

       if(user!==null)
       {
        bcrypt.compare(userCred.password,user.password,(err,result)=>{
            if(result===true)
            {
                // generate a token and send it back 

                jwt.sign({email:userCred.email},"thorabhkey",(err,token)=>{
                    if(!err)
                    {
                        res.send({token:token})
                    }
                    else 
                    {
                        res.status(500).send({message:"Some issue while creating the token please try again"})
                    }
                })


            }
            else 
            {
                res.status(401).send({message:"Incorrect Password"})
            }
        })
       }
       else 
       {
        res.status(404).send({message:"Wrong Email No User found"})
       }
       

    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some Problem"})
    })

    

})


app.get("/getdata",verifyToken,(req,res)=>{

    res.send({message:"I am a bad developer with a good heart"});

})


function verifyToken(req,res,next)
{
    let token = req.headers.authorization.split(" ")[1];

    jwt.verify(token,"thorabhkey",(err,data)=>{
        if(!err)
        {
            console.log(data);
            next();
        }
        else 
        {
            res.status(401).send({message:"Invalid Token please login again"})
        }

    })

    
}



app.listen(8000,()=>{
    console.log("Server is up and running");
})