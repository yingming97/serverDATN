const jwt = require("jsonwebtoken");
const response = require('../helper/response')
require("dotenv").config();

const verifyTokenFromApi = (req, res, next) => {
    //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
    const token = req.headers.authorization;
    // const refreshToken = req.cookies.refreshToken;
    if (token) {
        const tokens = token.split(" ");

        let accessToken = '';
        if (tokens.length === 1) {
            accessToken = token;
        } else if (tokens.length === 2) {
            accessToken = tokens[1];
        }
        jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                return response.errVerifyToken(res, "Token is not valid!");
            }
            req.user = user;
            next();
        });
    } else {
        return response.unauthorizedResponse(res, "You're not authenticated")
    }
};

const verifyTokenFromWebPage = (req, res, next) => {
    //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
    const tokenFromCookies = req.cookies;

    if (tokenFromCookies.accessToken) {
        jwt.verify(tokenFromCookies.accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                // return response.errVerifyToken(res, "Token is not valid!");
                return res.redirect('/auth/login')
            }
            req.user = user;
            next();
        });
    } else {
        return res.redirect('/auth/login')
    }
};

const verifyTokenAndUserAuthorization = (req, res, next) => {
    verifyTokenFromApi(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return response.errVerifyToken(res, "You're not allowed to do that!");

        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyTokenFromApi(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return response.errVerifyToken(res, "You're not allowed to do that!");
        }
    });
};

const isTokenExpired = (token) => (Date.now() >= JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).exp * 1000)


module.exports = {
    isTokenExpired,
    verifyTokenFromApi,
    verifyTokenFromWebPage,
    verifyTokenAndUserAuthorization,
    verifyTokenAndAdmin,
};