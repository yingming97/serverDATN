const {isTokenExpired} = require('../../middleware/auth')

const authViewsController = {

    getLoginPage: async (req, res) => {
        const tokenFromCookies = req.cookies;
        console.log(tokenFromCookies)
        if (!tokenFromCookies.accessToken) {
            return res.render('./auth/login');
        } else {
            if (!isTokenExpired(tokenFromCookies.accessToken)) {
                return res.redirect('/')
            }
            return res.render('./auth/login');
        }

    },
    getRegisterPage: (req, res) => {
        res.render('./auth/register');
    },
}

module.exports = authViewsController;