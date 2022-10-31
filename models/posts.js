const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        min:2,
        max:500,
        required: true,

    },
    likes:{
        type:Array,
        default:[]
    },
    img:{
        type:String,
        default:"img.png"
    }
},{timestamps:true})
module.exports = mongoose.model("Post",postSchema)