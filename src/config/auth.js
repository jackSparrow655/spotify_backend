const jwt = require('jsonwebtoken')

exports.auth = async(req, res, next) => {
    try{
        // const token = req.headers.cookie.replace("token=", "");
        // const token = req.user.token
        // const token = req.rawHeaders[3].replace("token=", "")
        const token = req.headers['authorization'].replace("Bearer ", "");
        console.log(token)
        if(!token){
            return res.status(400).json({
                success: false,
                message:"token not found"
            })
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        if(!payload){
            return res.status(400).json({
                success: false,
                message:"error while verify the token"
            })
        }
        req.payload = payload
        console.log("authorization is completed")
        next()
        return true
    } catch(err){
        return res.status(400).json({
            success: false,
            message:"error in authorization",
            message2:err.message
        })
    }
}