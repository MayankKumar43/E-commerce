const express= require("express")
const router= express.Router()
const{makeProduct, getProduct}=require("../controllers/productController")
const { isAuthenticatedUser, isUserAdmin } = require("../middleware/auth")
  
router.route("/create").post(isAuthenticatedUser,isUserAdmin,makeProduct)
router.route("/getProduct").get(getProduct)
module.exports=router