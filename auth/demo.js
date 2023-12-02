const express = require('express');
const mongoose = require('mongoose');


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
    },
    "products":[
        {
            {type: mongoose.Schema.Types.ObjectId, ref: 'products'},

        }
    ]
},{timestamps:true})

// model for user 

const userModel = mongoose.model("users",userSchema)