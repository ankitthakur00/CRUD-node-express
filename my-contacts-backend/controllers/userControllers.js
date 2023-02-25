const asyncHandler = require('express-async-handler')

const Contact = require("../models/contactModel");
const Users = require('../models/userModel');
const bcrypt = require("bcrypt");

//@desc Get register User
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async(req, res)=>{
    const {username, email, password}= req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await Users.findOne({email});
    if (userAvailable){
        res.status(400);
        throw new Error("Users already registerd");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password,10);
    
    const user = await Users.create({
        username,
        email,
        password:hashedPassword,
    });
    if(user){
        res.status(201).json({_id:user.id, email:user.email});
    }
    else
    {
        res.status(400);
        throw new Error("User data is not valid");

    }
});

//@desc Get register User
//@route POST /api/users/register
//@access public
const loginUser = asyncHandler(async(req, res)=>{
    res.json({message:"login user"});
});

//@desc Get current User
//@route GET /api/users/register
//@access public
const currentUser = asyncHandler(async(req, res)=>{
    res.json({message:"Current User information"});
});


module.exports = {
    registerUser,
    loginUser,
    currentUser
};
