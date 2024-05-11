const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name:{type: String, required: true},
    last_name: {type: String, required: true},
    hash_password: {type: String, required: true},
    email:{type:String, required: true, unique: true},
    isAdmin: {type:Boolean, default: false}

},
{
    timestamps: true
})


userSchema.statics.signUp = async function(body){
    const {first_name, last_name, email, password, confirmPassword} = body
   
    if(!email || !confirmPassword || !password){
        throw Error("All field must be filled.")
    }

    const exists = await this.findOne({email});

    if(exists){
        throw Error(`${email} is already in use.`)
    }

    if(!validator.isEmail(email)){
        throw Error("Email is invalid.")
    }

    if(password !== confirmPassword){
        throw Error("Password and password confirmation do not tally.")
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong. Password must include 8 characters including uppercase and a symbol.')
    }
    

    

    const salt = await bcrypt.genSalt(11);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, first_name, last_name, hash_password:hash});
    return user;
}

userSchema.statics.signIn = async function(email, password){
    
    if(!email || !password){
        throw Error("All fields must be filled.")
    }

    const user = await this.findOne({email});

    if(!user){
        throw Error(`${email} is incorrect.`)
    }

    const match = await bcrypt.compare(password, user.hash_password);

    if(!match){
        throw Error('Email and password are incompatible')
    }

    return user;

}

module.exports = mongoose.model('User', userSchema)