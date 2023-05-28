const sendToken =(user,statusCode,res)=>{
    const token=user.getJWTToken()
    
    // cookie options
    const options = {
        // expires:new Date(
        //     Date.now + process.env.COOKIE_EXPIRE * 24 *60*60*1000  // changing time to msec
        // ),
        // httpOnly:true
        maxAge: 1000 * 60 * 24*60* process.env.COOKIE_EXPIRE, // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
        // signed: true // Indicates if the cookie should be signed
    };
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token
    });
}

module.exports = sendToken;