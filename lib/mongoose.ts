const mongoose = require("mongoose") 
require('dotenv').config();

const uri = process.env.MONGO_URI as string

export default async function initMongoose(){
    try {
        mongoose.connection.readyState === 1
        ? await mongoose.connection.asPromise()
        : await mongoose.connect(uri)
        console.log("Mongoose has connected")
        
    } catch (error) {
        return({error:" Connection fail"})
        
    }
}