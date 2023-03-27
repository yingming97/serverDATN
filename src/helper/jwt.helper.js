const jwt = require('jsonwebtoken')
const crypto = require('crypto');

const jwtHelper = {
    generateAccessToken: async (user) => {
        return jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn: '1d'}
        );
    },

    generateRefreshToken: async () => {
        return crypto.randomBytes(20).toString('hex');
    },
    decodeToken: (token) => {
        return jwt.verify(token, process.env.JWT_ACCESS_KEY);
    }

}
module.exports = jwtHelper;