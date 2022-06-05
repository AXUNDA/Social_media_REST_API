const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    userId:{
        type: 'string',
        required: true,
    },
    desc:{
        type: 'string',
        min:2,
        max:500

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