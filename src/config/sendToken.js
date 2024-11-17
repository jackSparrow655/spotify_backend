require('dotenv').config()

exports.sendToken = async(user, statuscode, res, message, req) => {
    const token = await user.getToken()
    user = user.toObject()
    user.token = token
    req.user = user
    const options = {
        httpOnly:true,
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000 
        )
    }
    res.status(statuscode).cookie("token", token, options).json({
        success: true,
        message,
        user,
        token
    }) 
}