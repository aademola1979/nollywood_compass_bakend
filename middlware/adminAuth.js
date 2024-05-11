const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')


const adminAuth = async(req, res, next) =>{
    //verify authentication
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error: 'Authorization required.'}) 
    }

    const token = authorization.split(' ')[1]
  
    try {
        const {_id} = jwt.verify(token, process.env.SECRET)

        const isAdmin = await User.findOne({_id}).select('isAdmin')

        if(!isAdmin){
            throw Error("You are not authorized to perform this action.")
            return
        }

        res.user = await User.findOne({_id}).select('_id')
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'You are not authorized.'})
        
    }

 }

 module.exports = adminAuth