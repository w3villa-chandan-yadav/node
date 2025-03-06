const jwt = require("jsonwebtoken")




exports.isValidUser = async(req,res,next)=>{

    // console.log(req.headers)
    console.log("here")
    // console.log(req.header("Authorization"))
    try {
        const value = req.cookies.token || req.body.token  || req.headers["authorization"] 
        console.log(value,"the value")
        const token =value.replace("Bearer ","");
        console.log(token ,"token")

        try {            
            const decode = await jwt.verify(token,"chanda")
        } catch (error) {
            console.log("can't destructure the token")
            throw new Error("please provide a valid valid token")
        }
        if(!token){
            return res.status(401).json({
                message:"please provide a token"
            })
        }

        console.log("token",token)
        next()
    } catch (error) {
        console.log("error in the auth middleware",error.message)
        res.status(400).json({
            message:"something went wrong"
        })
    }
}