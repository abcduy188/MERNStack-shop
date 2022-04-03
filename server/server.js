require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

//routes
app.use('/user', require('./user/userRouter'))
app.use('/api', require('./category/cateprodRouter'))
app.use('/api', require('./upload/upload'))
app.use('/api', require('./product/productRouter'))
app.use('/api', require('./payment/paymentRouter'))
//connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser: true, useUnifiedTopology: true 
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

app.get('/', (req, res)=>{
    res.json({
        msg:"welcome to abcduy"
    })
})

//start server
const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log('Server is running on port', port);
})