const cloudinary = require('cloudinary').v2

exports.uploadToCloudinary = async(file, folder, quality) => {
    try{
        const options = {
            folder: "spotify_app",
            resource_type:'auto'
        }
        if(quality){
            options.quality = quality
        }
        const uploadResponse = await cloudinary.uploader.upload(file.tempFilePath, options)
        return uploadResponse
        
    } catch(err){
        throw new Error(err)
    }
}


exports.isFileSupported = (fileType, extension) => {
    const supportedExtensionImage = ["jpg", "png", "webp", "jpeg", "avif"]
    const supportedExensionMusic = ["mp3"]
    if(fileType === "image"){
        console.log("image type-->", extension)
        return supportedExtensionImage.includes(extension)
    }
    else if(fileType === "music"){
        console.log("audio type-->", extension)
        return supportedExensionMusic.includes(extension)
    }
}