const jwt=require("jsonwebtoken")
const User=require("../models/userModel")


const isAuthenticatedUser= async (req, res,next)=>{
    const {token}=req.cookies
    if(!token){
        res.json({
            message:"to access this please login"
        })
    }

    const tokenfound= jwt.verify(token,process.env.JWT_SECRET)

    const loginedPerson= await User.findById(tokenfound.id)

    req.user = loginedPerson
    next()
}

const isUserAdmin =async(req, res,next)=>{
    const role= req.user.role
    console.log(role)
    if(role!="admin"){
        return (res.json({
            message:"not admin"

        }))
    }
    next()

}

module.exports={isAuthenticatedUser,isUserAdmin}
