const Product= require("../models/productModel")

exports.makeProduct= async (req,res,next)=>{
    try {
        const {name,price, description,category,stock}=req.body
        const create= await Product.create({
            name,
            price, 
            description,
            category,
            stock,
            user:req.user._id
            
        })
        res.json({
            product:create
        })
    } catch (error) {
       console.log(error) 
    }
}
exports.getProduct=async(req,res,next)=>{

    try {
        const Getproduct= await Product.find()
        return(res.json({
            Getproduct
        }))
    
    } catch (error) {
        console.log(error)
    }

    
}