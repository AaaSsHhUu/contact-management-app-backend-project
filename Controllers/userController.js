const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc  register
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req,res)=>{
    let {username, email, password} = req.body;
    // if any field is empty or undefined
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    // if user with given email is already registered
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error(`User with email : ${email} already registered`);
    }
    // Hashing the password
    let hashedPassword = await bcrypt.hash(password,10); // bcrypt.hash(<plaintext>,<salt_rounds>)
    // console.log(hashedPassword);
    const user = await User.create({
        username,
        email,
        password : hashedPassword    
    })
    
    if(user){
        res.status(201).json({_id : user._id, email : user.email})
    }
    else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({message : "registered"});
})

// @desc login
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req,res)=>{
    let {email, password} = req.body;
    if(!email, !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user : {
                username : user.username,
                email : user.email,   
                id : user.id
            }
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn : "20m"});
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Email or password is not valid");
    }
})

// @desc current user info
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user);
})

module.exports = {registerUser,loginUser,currentUser};