const asyncHandler = require('express-async-handler');  // for automatic error handling
const generateToken = require('../config/generateToken');
const User = require('../models/userModel');  // import user model

// logic for user registration
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;  // destructure { compenents } from the body

    // throw error if name, email, password is not provided
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please provide all details');  // pic is optional in models/userModels.js
    }

    // check if user already exists in database using queries
    const userExists = await User.findOne({ email });

    // if user already exists
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // else create a new user
    const user = await User.create({
        name,
        email,
        password,
        pic
    });

    // the above query return created values with ID
    // if there is something inside 'user': user returns some value
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('User not Created');
    }
});

// logic for user registration
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;  // take { compenents } for login

    // check if user already exists in database
    const user = await User.findOne({ email });  // find user in database

    // if user exists and password is correct
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid Username & Password');
    }
});

// search users through queries: /api/user?search={variable}
const allUsers = asyncHandler(async(req, res) => {
    // take variable from query
    const keyword = req.query.search
    console.log(keyword);
})

module.exports = { registerUser, authUser, allUsers };