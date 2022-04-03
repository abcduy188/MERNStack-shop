const mongoose = require('mongoose')

const categoryProductSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
        unique: true,
        
    },
    isdelete:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})
module.exports = mongoose.model("CategoryProduct", categoryProductSchema)