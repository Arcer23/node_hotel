const mongoose = require("mongoose")

const items = new mongoose.Schema({
    name:{
        type : String, 
        required:true,
    },
    price:{
        type:Number,
        required:true, 
    },
    taste:{
        type:String,
        emum :['sweet', 'spicy' , 'sour'],
        required:true,
    },
    drink:{
        type : Boolean , 
        default : false ,
    },
    ingedrients:{
        type : [String],
        default : []
    }
})

const food = mongoose.model('food', items);
module.exports = food;