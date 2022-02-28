const mongoose = require('mongoose')
const imagesSchema = new mongoose.Schema({
    public_id:{
        type:String,
        trim:true
    },
    url:{
        type:String,
        trim:true
    },
    product_id:{
        type:String,
        trim:true
    }
    
},{
    timestamps:true
})

module.exports = mongoose.model("Images",imagesSchema)