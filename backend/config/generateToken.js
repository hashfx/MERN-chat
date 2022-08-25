const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    // sign a newtoekn with particular ID of newly generated user
    // uniqueUserID, JWTsecret, expiryDurationOfToken
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

module.exports = generateToken;