const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{
        type: 'string',
        min:3,
        max:15,
        required: true,
        unique: true
    },
    email:{
        type: 'string',
        max:30,
        required: true,
        unique: true


    },
    password:{
        type: 'string',
        min:12,
        require: true,
        unique: false

    },
    profilePicture:{
        type: 'string',
        default: '',
    },
    coverPicture:{
        type: 'string',
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