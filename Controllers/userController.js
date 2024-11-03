const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc  register
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req,res,next)=>{
    let {username, email, password} = req.body;
    // if any field is empty or undefined
    if(!username || !email || !password){
        res.status(400)
        return next(new Error("All fields are mandatory"));
    }
    // if user with given email is already registered
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        return next(new Error(`User with email : ${email} already registered`));
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
        return res.status(201).json({
            _id : user._id, 
            email : user.email,
            message : "User registered successfully"
        })
    }
    else{
        res.status(400);
        return next(new Error("User data is not valid"));
    }
})

// @desc login
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req,res,next)=>{
    let {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        return next(new Error("All fields are mandatory"));
    }
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user : {
                username : user.username,
                email : user.email,   
                id : user.id
            }
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn : "45m"});
        res.cookie("accesstoken",accessToken,{
            httpOnly : true,
            maxAge : 24 * 60 * 60 * 1000,
            secure : process.env.ENVIRONMENT === "production"
        });
        res.status(200).json({
            success : true,
            message : "Logged in Successfully"
        });
    }
    else{
        res.status(401);
        return next(new Error("Email or password is not valid"));
    }
})

// @desc current user info
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req,res)=>{
    if(!req.user){
        return res.json({
            success : false,
            message : "Login first"
        })
    }
    res.json(req.user);
})

module.exports = {registerUser,loginUser,currentUser};