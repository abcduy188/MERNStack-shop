const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique: true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:Number,
        default:0
    },
    address:{
        type:String,
        trim:true,
        default:"HCMC,VN"
    },
    cart:{
        type:Array,
        default: []
    }

},{
    timestamps:true
})
module.exports = mongoose.model('Users', userSchema)