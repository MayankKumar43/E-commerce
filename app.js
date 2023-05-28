const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const cookieParser=require("cookie-parser")


app.use(express.json({limit:"50mb"}))

app.use(cookieParser())

app.use(bodyParser.urlencoded({limit:"50mb", extended:true}))

const user=require("./routes/userRoute")
const product=require("./routes/productRoute")

app.use("/api/user", user)
app.use("/api/product",product)
module.exports=app