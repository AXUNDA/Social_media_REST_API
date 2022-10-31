const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        min:3,
        max:15,
        required: true,
        unique: true
    },
    email:{
        type: String,
        max:30,
        required: true,
        unique: true


    },
    password:{
        type: String,
        min:12,
        require: true,
        unique: false

    },
    profilePicture:{
        type: String,
        default: '',
    },
    coverPicture:{
        type: String,
        default: '',
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]

    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationships:{
        type:Number,
        enum:[1,2,3]
    }
    
},{timestamps:true})
module.exports = mongoose.model("User",userSchema)