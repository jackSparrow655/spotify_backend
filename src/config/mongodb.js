const mongoose = require('mongoose')
require('dotenv').config()
const url = process.env.DATABASE_URL

exports.dbConnect = async() => {
    try{
        mongoose.connect(url)
        console.log('db connection is successfully')
    } catch(err){
        console.error("error in db connection")
    }
}