const mongoose=require("mongoose")
const connectDatabase=()=>{
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then((response)=>{
        console.log("Database connected succesfully")
    }).catch((Error)=>{
 console.log(Error)
    })

}

module.exports=connectDatabase