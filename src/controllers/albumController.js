const { isFileSupported, uploadToCloudinary } = require('../config/fileUpload')
const Album = require('../models/albumModel')

exports.createAlbum = async(req, res) => {
    try{
        const {name, desc, bgColour} = req.body
        const imageFile = req.files.image
        // console.log("name", name)
        // console.log("desc", desc)
        // console.log("bgColor", bgColour)
        // console.log("imagefille", imageFile)
        // console.log("req-->", req.files.image)
        const extension = imageFile.name.split('.')[1].toLowerCase()
        if(!isFileSupported("image", extension)){
            return res.status(400).json({
                success: false,
                message:"image file is not supported"
            })
        }
        console.log("joo")
        const imageUpload = await uploadToCloudinary(imageFile, "arijitMusic01")
        const imageUrl = imageUpload.secure_url
        const albumDb = await Album.create({
            name,
            desc,
            bgColour,
            image:imageUrl
        })
        
        return res.status(200).json({
            success: true,
            message: "album is created successfully",
            albumDb,
        })
        
    } catch(err){
        return res.status(400).json({
            success: false,
            message: "error while creation album",
            error:err.message
        })
    }
}

exports.getAlbum = async(req, res) => {
    try{
        const album = await Album.find({}).populate("songs")
        return res.status(200).json({
            success: true,
            message: "all album fetched successfully",
            album: album
        })
    } catch(err){
        return res.status(400).json({
            success: false,
            message: "error white fetching all abums",
            error: err.message
        })
    }
}

exports.getAlbumName = async(req, res) => {
    try{
        const albumRes = await Album.find({})
        const albumName = []
        albumRes.forEach((el) => {
            const nameVal = el.name
            albumName.push(nameVal)
        })
        return res.status(200).json({
            success:true,
            message: "album name fetched succesfully",
            albumName
        })
    } catch(err){
        return res.status(400).json({
            success: false,
            message: "error while fetching album name",
            error: err.message
        })
    }
}