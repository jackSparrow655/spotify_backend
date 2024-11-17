const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
require('dotenv').config()

const port = process.env.PORT || 5000
const cors = require('cors')
const { dbConnect } = require('./src/config/mongodb')
const { cloudinaryConnect } = require('./src/config/cloudinary')
const songRouter = require('./src/routes/songRoute')
const albumRouter = require('./src/routes/albumRoute')
const userRouter = require('./src/routes/userRoute')

//middleware
app.use(cors({
    origin:[process.env.FRONTEND_URI, "https://spotify-frontend-cyan.vercel.app"]
}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//mount route
app.use('/api/v1', songRouter)
app.use('/api/v1', albumRouter)
app.use('/api/v1', userRouter)


dbConnect()
cloudinaryConnect()



app.get('/',(req, res) => {
    res.status(200).json({
        success: true,
        message: "this is home page baby!"
    })
})

app.listen(port, () => {
    console.log(`app is running at port ${port}`)
})
