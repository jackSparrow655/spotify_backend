const express = require('express')
const { createAlbum, getAlbum, getAlbumName } = require('../controllers/albumController')
const albumRouter = express.Router()
const {auth} = require('../config/auth')


albumRouter.post('/createalbum', createAlbum)
albumRouter.get('/getalbum', getAlbum)
albumRouter.get('/getalbumname', getAlbumName)


module.exports = albumRouter