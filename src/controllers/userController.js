const { sendToken } = require('../config/sendToken')
const User = require('../models/userModel')

exports.signup = async(req, res, next) => {
    try{
        const {name, email, password, confirmPassword} = req.body
        if(!name || !email || !password || !confirmPassword){
            return res.status(400).json({
                success: false,
                message:"all fields are required"
            })
        }
        if(password != confirmPassword){
            return res.status(400).json({
                success: false,
                message:"password and confirm password not matched"
            })
        }
        
        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({
                success:false,
                message:"user is exist with the same email"
            })
        }
        
        //send email and confirm with otp that valid email
        
        
        
        const newUser = await User.create({
            name,
            email,
            password
        })
        
        await sendToken(newUser, 200, res, "user signed in successfully", req)
        next()
    } catch(err){
        return res.status(400).json({
            success: false,
            message:"error in sign up",
            message2:err.message
        })
    }
}

exports.login = async(req, res, next) => {
    try{
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }
        const findUser = await User.findOne({email: email})
        if(!findUser){
            return res.status(400).json({
                success: false,
                message:"user not found in database"
            })
        }
        const isPasswordMatched = await findUser.comparePassword(password)
        if(!isPasswordMatched){
            return res.status(400).json({
                success:false,
                message:"password not matched"
            })
        }
        await sendToken(findUser, 200, res, "logged in successfully", req)
        next()
    } catch(err){
        return res.status(400).json({
            success: false,
            message:"error while log in",
            message2:err.message
        })
    }
}

exports.logout = async(req, res) => {
    try{
        const options = {
            expires: new Date(Date.now()),
            httpOnly:true
        }
        return res.status(200).cookie("token","", options).json({
            success: true,
            message: "logged out successfully"
        })
    } catch(err){
        return res.status(400).json({
            success: false,
            message:"error in logged out",
            message2:err.message
        })
    }
}