const { uploadToCloudinary, isFileSupported } = require('../config/fileUpload')
const Song = require('../models/songModel')
const Album = require('../models/albumModel')

exports.addSong = async(req, res) => {
    try{
        const name = req.body.name
        const desc = req.body.desc
        const album = req.body.album
        // const albumId = req.body.albumId
        // const albumName = req.body.albumName
        if(! (await Album.findOne({name:album}))){
            return res.status(400).json({
                success: false,
                album:album,
                message: "album is not found"
            })
        }
        
        const audioFile = req.files.audio
        const imageFile = req.files.image
        const imageExtension = imageFile.name.split('.')[1].toLowerCase()
        const audioExtension = audioFile.name.split('.')[1].toLowerCase()
        
        if(!isFileSupported("image", imageExtension) || !isFileSupported("music", audioExtension)){
            return res.status(400).json({
                success: false,
                message: "file type is not supported"
            })
        }
        
        
        const audioUpload = await uploadToCloudinary(audioFile, "arijitMusic01")
        const imageUpload = await uploadToCloudinary(imageFile, "arijitMusic01")
        
        const audioUrl = audioUpload.secure_url
        const imageUrl = imageUpload.secure_url
        const duration = `${Math.floor(Number(audioUpload.duration)/60)}:${Math.floor(Number(audioUpload.duration)%60)}`
        
        const dbResponse = await Song.create({
            name,
            desc,
            album,
            image:imageUrl,
            file:audioUrl,
            duration
        })
        
        // const updatedAlbum = await Album.findByIdAndUpdate(albumId, {
        //     $push:{songs: dbResponse._id}
        // }, {new:true})
        
        const updatedAlbum = await Album.findOneAndUpdate({name:album}, {
            $push:{songs:dbResponse._id}
        }, {new:true})
        
        
        // console.log("name", name)
        // console.log("album", album)
        // console.log("desc", desc)
        // console.log("audiofile", audioFile)
        // console.log("image", imageFile)
        
        return res.status(200).json({
            success: true,
            message: "file uploaded successfully",
            dbResponse,
            updatedAlbum
        })
        
    } catch(err){
        return res.status(400).json({
            success: false,
            message: "error in file upload",
            error: err.message
        })
    }
}

exports.listSong = async(req, res) => {
    try{
        const songList = await Song.find({})
        return res.status(200).json({
            success:true,
            message: "all song fetched successfully",
            songList
        })
    } catch(err){
        return res.status(400).json({
            success: false,
            message: "error while fetchig all song"
        })
    }
}