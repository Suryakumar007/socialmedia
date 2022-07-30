const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName:{
        required: true,
        type : String,
        min:3,
        max:8,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    followers:{
        type : Array,
        default:[]
    },
    following:{
        type : Array,
        default:[]
    },
    profilePicture:{
        type:String,
        default : ""
    },
    coverPicture:{
        type:String,
        default:""
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
    
},
{timestamps : true})

const User = mongoose.model("User",userSchema)

module.exports = User