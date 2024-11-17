const {addSong, listSong} = require('../controllers/songController')
const express = require('express')
const {auth} = require('../config/auth')

const songRouter = express.Router()

songRouter.post('/add', addSong)
songRouter.get('/list', listSong)


module.exports = songRouter