const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true
    },
    songs:[
        {
        type:mongoose.Types.ObjectId,
        ref:"Song"
    }
    ],
    bgColour:{
        type:String,
        required:true
    },
    image:{
        type:String,
        requied:true
    }
})

module.exports = mongoose.model("Album", albumSchema)
