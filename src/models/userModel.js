const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next()
    }
    else{
        this.password = await bcrypt.hash(this.password, 10)
    }
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.getToken = async() =>{
    const options = {
        id:this._id,
        name:this.name,
        email:this.email
    }
    const token = jwt.sign(options, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRES
    })
    return token
}


module.exports = mongoose.model("User", userSchema)