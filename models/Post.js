const mongoose = require("mongoose")

let postSchema = new mongoose.Schema({
    userID : {
        type : String,
        required : true
    },
    description :{
        type:String,
        max:500
    },
    image:{
        type:String
    },
    likes: {
        type : Array,
        default : []
    },
    comments : {
        type : Array,
        default : []
    }
},
{timestamps:true})

const Post = mongoose.model("Post",postSchema)
module.exports = Post