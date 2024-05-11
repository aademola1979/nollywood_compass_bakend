const { default: mongoose } = require('mongoose');
const Blog = require('../models/blogSchema')


 

const createBlog = async(req, res)=>{
    const {title, description, authorId, tags, body} = await req.body;
    console.log(req.body)

    let emptyFields = [];
    if (!title){
        emptyFields.push('title')
    }

    if(!description){
        emptyFields.push('description')
    }

    if(!tags){
        emptyFields.push('tags')
    }

    if(!body){
        emptyFields.push('body')
    }

    if(!authorId){
        emptyFields.push('authorId')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error:"All field must filleds.", emptyFields})
    }

    try {
        const blog = await Blog.create({title, description, body, tags, authorId

        })
        res.status(200).json(blog)
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
}

const getAllBlogs = async (req, res)=> {
    const page = req.query.page || 0;
    const booksPerpage = 20

    try {
        const blogs = await Blog.find({})
        .sort({createdAt: -1})
        .skip(page * booksPerpage)
        .limit(booksPerpage)

        res.status(200).json(blogs) 
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
}


const getSingleBlog = async(req, res)=>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such blog"})
    }

    try {
        const blog = await Blog.findOne({_id:id})
        if(!blog){
            return res.status(404).json({error: "Blog not fund"})
        }
        return res.status(200).json(blog)
    } catch (error) {
        return res.status(400).json({error:error.message})
        
    }

}

const updateBlog = async(req, res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such blog"})
    }
    const {title, description, authorId, tags, body} = await req.body;
    console.log(req.body)

    let emptyFields = [];
    if (!title){
        emptyFields.push('title')
    }

    if(!description){
        emptyFields.push('description')
    }

    if(!tags){
        emptyFields.push('tags')
    }

    if(!body){
        emptyFields.push('body')
    }

    if(!authorId){
        emptyFields.push('authorId')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error:"All field must filleds.", emptyFields})
    }


    try {
        const updatedblog = await Blog.findOneAndUpdate({_id:id},
            {...req.body}
        )

        if(!updateBlog){
            return res.status(400).json({error: "No such blog"})
        }
        res.status(200).json(updatedblog)
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
}


const deleteBlog = async(req, res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such blog."})
    }

    try {
        const deletedBlog = await Blog.findOneAndDelete({_id: id})
        res.status(200).json("Blog deleted successfully.")
    } catch (error) {
        return res.status(404).json({error: error.message})
        
    }

}



module.exports = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
} 