const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
    paymentID:{
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    cart:{
        type:Array,
        default:[]
    },
    status:{
        type:Boolean,
        default:false
    }

},{
    timestamps: true
})
module.exports = mongoose.model("Payments",paymentSchema);