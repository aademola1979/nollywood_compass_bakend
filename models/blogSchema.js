const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const commentChema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    content:{
        type: String,
        required: true
    }

})

const blogSchema = new Schema({
    title:{type:String, required:true, unique:true},
    description:{type:String, required:true},
    image: {type: String},
    authorId:{
        type:mongoose.Schema.Types.ObjectId, 
        required: true,
        ref:"User"
    },
    comments:[commentChema],
    image: {type:String},
    published: {type: Boolean, default:false},
    read_count:{type: Number},
    read_time:{type: Number},
    tags: [String],
    body: {type: String, required: true},
    viewCount:{type:Number}

},
{
    timestamps: true
})

module.exports = mongoose.model('Blog', blogSchema)