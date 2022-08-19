const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    // sign a newtoekn with particular ID of newly generated user
    // uniqueUserID, JWTsecret, expiryDurationOfToken
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

module.exports = generateToken;