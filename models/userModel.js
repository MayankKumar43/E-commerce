const mongoose=require("mongoose")
const validator= require("validator")
const bcrypt= require("bcrypt")
const jwt=require("jsonwebtoken")


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxlength:[30,"Name cannot excced 30 letters"],
        minlength:[4,"Name should have 4 charcters"],
    
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter valid email"],

    },
    password:{
        type: String,
        required:[true ,"Please enter password"],
        minlength:[8,"Password shoul have more than 8 charcters"],
        select:false ,        // prevent from showing password
    },
    role:{
        type:String,
        default:"user",
    },
    // createdAt:{
    //     type:Date,
    //     default:Date.now,
    // }
   

},
{
   timestamps:true, 
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){ //  this is use prevent password  from again hashing itself
        next()
    }

    this.password = await bcrypt.hash(this.password,10)
    // this.name= this.name +"kumar"             //to add something in attribute

})

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

userSchema.methods.comparePassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)

}

module.exports=new mongoose.model("User",userSchema)


