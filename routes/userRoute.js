const express = require('express')
const {signUp, getAllUsers, getSingleUser, updateUser, signIn} = require("../controllers/userController.js")
const adminAuth = require('../middlware/adminAuth.js')

const router = express.Router();

//Sign Up route
router.post("/signUp", signUp)

//Sign In route
router.post("/signIn", signIn)

//Protecting routes
//router.use(adminAuth)

//Admin GET all users route
router.get("/users", getAllUsers)

//Admin GET a single user
router.get("/user/:id", getSingleUser)

//EDIT/UPDATE user route
router.patch("/user/:id", updateUser)

module.exports = router