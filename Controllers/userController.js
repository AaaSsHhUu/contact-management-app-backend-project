const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// @desc  register
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req,res)=>{
    let {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error(`User with email : ${email} already registered`);
    }

    let hashedPassword = await bcrypt.hash(password,10); // bcrypt.hash(<plaintext>,<salt_rounds>)
    console.log(hashedPassword);
    res.json({message : "registered"});
})

// @desc login
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req,res)=>{
    res.json({message : "Login user"});
})

// @desc current user
// @route GET /api/users/current
// @access public
const currentUser = asyncHandler(async (req,res)=>{
    res.json({message : "Current user information"});
})

module.exports = {registerUser,loginUser,currentUser};