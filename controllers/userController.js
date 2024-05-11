const { default: mongoose } = require('mongoose');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken')
const config =require('dotenv').config()

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "1h"})

};


const signUp = async(req, res)=>{
    
    try {
        const user = await User.signUp(req.body); 

        //Create token
        const token = createToken(user._id)


        res.status(200).json({email:user.email, token})
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
}

const signIn = async(req, res)=>{
    const {email, password} = await req.body
    try {
        const user = await User.signIn(email, password)

        const token = createToken(user._id)
       
        res.status(200).json({email:user.email, token})
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }

}

const getAllUsers = async(req, res)=>{
   const users = await User.find({})
   return res.status(200).json(users)
}

const getSingleUser = async(req, res)=>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such user"})
    }

    try {
        const user = await User.findOne({_id:id})
        if(!user){
            return res.status(404).json({error: "User not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({error:error.message})
        
    }



}

const updateUser = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such user"})
    }

    const {first_name, last_name, email, password} = req.body;

    let emptyFields = [];
    if (!first_name){
        emptyFields.push('First Name')
    }

    if(!last_name){
        emptyFields.push('Last Name')
    }

    if(!email){
        emptyFields.push('Email')
    }

    if(!password){
        emptyFields.push('password')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error:"All field must filled.", emptyFields})
    }


    try {
        const updatedUser = User.findOneAndUpdate({_id: id}, {...req.body})
        if(!updateUser){
            return res.status(404).json({error: "User not found"})
        }

        return res.status(200).json(updatedUser)
        
    } catch (error) {
        return res.status(400).json({error: error.message})
        
    }

}

module.exports = {
    signUp,
    getAllUsers,
    getSingleUser,
    updateUser,
    signIn,
} 