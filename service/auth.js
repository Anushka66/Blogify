const JWT = require("jsonwebtoken");
require("dotenv").config();

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
    };
    const token = JWT.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
    return token;
}

function validateToken(token){
    const payload= JWT.verify(token, process.env.SECRET_KEY);
    return payload;
}

module.exports={
    createTokenForUser,
    validateToken,
}