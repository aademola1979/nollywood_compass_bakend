const express = require('express')
const {
    createBlog, 
    getAllBlogs, 
    getSingleBlog, 
    updateBlog, 
    deleteBlog
} = require("../controllers/blogController.js")
const requireAuth = require('../middlware/RequireAuth')
 
const router = express.Router();

//GET all blogs
router.get('/blogs', getAllBlogs);

//GET a single blog
router.get('/blog/:id', getSingleBlog)

//Protecting routes
router.use(requireAuth)

//POST a blog
router.post("/blog", createBlog);

//UPDATE a blog
router.patch("/blog/:id", updateBlog)

//DELETE a blog
router.delete('/blog/:id', deleteBlog)

module.exports = router;