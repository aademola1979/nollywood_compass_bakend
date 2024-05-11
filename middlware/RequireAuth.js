const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')


const requireAuth = async(req, res, next) =>{
    //verify authentication
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error: 'Authorization required.'}) 
    }

    const token = authorization.split(' ')[1]
  
    try {
        const {_id} = jwt.verify(token, process.env.SECRET)

        res.user = await User.findOne({_id}).select('_isAdmin')
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'You are not authorized.'})
        
    }

 }

 module.exports = requireAuth