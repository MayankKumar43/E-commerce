const User=require("../models/userModel")
const sendToken = require("../utils/jwtToken")

exports.registerUser=async(req,res)=>{

    try {
        const {name,email,password }=req.body
        const register=await User.create({
            name,
            email,
            password,
            
        })
        res.json({
            user:register
        })

        
    } catch (error) {
        console.log(error)
    }
}


exports.getloginUser =async(req,res)=>{
    try{
        if(!req.body.email && !req.body.password){
            return (res.json({
                message:"Invalid Email or Password"
            }))
        }
        const loginUser=await User.findOne({email:req.body.email}).select("+password") //we will check is loginUser is filled or not

        // console.log(loginUser)

        if(!loginUser){         //output is comming in array
            return (res.json({
                message:"Invalid email or password"
            }))
            
        }
        // console.log("Hi")

        // if(req.body.password !== loginUser.password){             //output is comming in array
        //     return (res.json({
        //         message:"Invalid email or password"
        //     }))
        // }



        const isPassswordMatched =await loginUser.comparePassword(req.body.password)
      

        if( isPassswordMatched != true  ){
            return(res.json({
                message: "Invalid password or email"
            }))
        }

        sendToken(loginUser,200,res)
    
    }catch(err){
        console.log(err)
    }
}                                 


exports.getUserDetails = async(req,res,next)=>{
    const user= await User.findById(req.user.id)
    res.json({
        user,
     })
    
}

exports.getAllUsers = async(req,res,next)=>{
    const users =await User.find()
    res.json({
        users
    })
}

exports.makeAdmin =async(req,res,next)=>{
    
    const {_id}=req.params
        const update= await User.findByIdAndUpdate(_id, {role:"admin"})
        res.json({
            message:"now  you are admin"
        })


    
}
exports.deleteUser = async(req,res,next)=>{
    const {_id}=req.params
    const Delete =await User.findByIdAndDelete(_id)
    res.json({
        message:"user deleted"
    })
}

exports.updatePassword=async(req,res,next)=>{
    const {_id}= req.params
    const passwordUpdate= await User.findByIdAndUpdate(_id,{password:req.body.password}).select("password")
    res.json({
        message:"password updated"
    })
}
exports.updateProfile=async(req,res,next)=>{
    const {_id}= req.params
    const profileUpdate= await User.findByIdAndUpdate(_id,{name:req.query.name,email:req.query.email,password:req.query.pasword}).select("password")
    res.json({
        message:"your profile is updated"
    })
}