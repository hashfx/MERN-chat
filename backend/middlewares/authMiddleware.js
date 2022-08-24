const jwt = require('jsonwebtoken')
const User = require('../models/userModel.js')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {  // next: to move to next operation
    let token;
    if (
        req.headers.authorization &&  // send token inside headers of the request
        req.headers.authorization.startsWith("Bearer")  // token is Bearer token
    ) {
        try {
            // token model(looks like): Bearer sldkfjriuislao
            token = req.headers.authorization.split(" ")[1];  // remove Bearer and take the token

            // decodes token ID
            const decoded = jwt.verify(token, process.env.JWT_SECRET);  // verify token
            req.user = await User.findById(decoded.id).select("-password");  // find user in DB and return it without database
            next();  // move to next operation
        } catch (error) {
            res.status(401)
            throw new Error("Not Authorised, token verification failed")  // error message
        }
    }

    if (!token) {  // if token is not present
        res.status(401)
        throw new Error("Not Authorised, Token not available")
    }
})

module.exports = { protect }