// const express = require("express")
const app=require("./app") // it is used to extract executanle function
const dotenv=require("dotenv")
const connectDatabase= require("./config/Database")

dotenv.config({path:"./config/config.env"}) 

console.log(process.env.PORT) //to accese environment variables
// console.log(app)
connectDatabase()
 const server= app.listen(process.env.PORT,()=>{
    console.log("server is live")
 })