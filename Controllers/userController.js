const asyncHandler = require("express-async-handler");

// @desc of register
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req,res)=>{
    res.json({message : "Reister the user"});
})

// @desc of register
// @route POST /api/users/register
// @access public
const loginUser = asyncHandler(async (req,res)=>{
    res.json({message : "Login user"});
})

// @desc of register
// @route POST /api/users/register
// @access public
const currentUser = asyncHandler(async (req,res)=>{
    res.json({message : "Current user information"});
})

module.exports = {registerUser,loginUser,currentUser};