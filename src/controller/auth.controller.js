const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const response = require("../helper/response");
const jwtHelper = require("../helper/jwt.helper");
const {validateLogin, validateRegister, validateChangePassword} = require("../helper/validator")
const {isTokenExpired} = require('../middleware/auth')
const refreshTokens = [];
require("dotenv").config();

const roleAccounts = {
    manager: 'Manager',
    staff: 'Staff'
}

const authController = {

    /*
    * req: name, email, phoneNumber, password, role, status, deviceId, linkAvt
    * */
    registerUser: async (req, res) => {

        try {
            console.log(req.body)
            const {name, password, email, phoneNumber, status, role, deviceId, linkAvt} = req.body;
            // validate
            const validateResult = validateRegister.validate(req.body, {errors: {label: 'key', wrap: {label: false}}});
            if (validateResult.error) {
                return response.validationError(res, validateResult.error.message);
            }

            // check role
            if (!roleAccounts.hasOwnProperty(role)) {
                return response.unauthorizedResponse(res, 'Role is valid!')
            }

            const user = await User.findOne({name: name});
            if (user) {
                return response.notFoundResponse(res, 'User already exists');
            }

            const salt = await bcrypt.genSaltSync(10);
            const hashed = await bcrypt.hash(password, salt);

            //Create new user
            const newUser = await new User({
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                password: hashed,
                status: status,
                role: role,
                deviceId: deviceId,
                linkAvt: linkAvt ? linkAvt : "",
            });
            //Save user to DB
            await newUser.save(function (err, result) {
                if (err == null) {
                    delete result._doc["password"]
                    return response.successResponseWithData(res, 'Register success!', result);
                } else {
                    return response.errorResponse(res, err.message);
                }
            })
        } catch (err) {
            return response.errorResponse(res, err.message);
        }
    },


    /*
    * req: phoneNumber, password
    * */
    login: async (req, res) => {
        try {

            const {phoneNumber, password} = req.body;
            // validate
            const validateResult = validateLogin.validate(req.body, {errors: {label: 'key', wrap: {label: false}}});
            if (validateResult.error) {
                return response.validationError(res, validateResult.error.message);
            }

            const user = await User.findOne({phoneNumber: phoneNumber});
            if (!user) {
                return response.unauthorizedResponse(res, 'Incorrect phone number')
            }

            const validPassword = await bcrypt.compare(
                password,
                user.password
            );
            if (!validPassword) {
                return response.unauthorizedResponse(res, 'Incorrect password')
            }
            if (user && validPassword) {

                const {password, ...others} = user._doc;

                if (user.accessToken !== "" && user.refreshToken !== "" && !isTokenExpired(user.accessToken)) {
                    return response.successResponseWithData(res, 'Success', {...others})
                }
                //Generate access token
                const accessToken = await jwtHelper.generateAccessToken(user);
                //Generate refresh token
                const refreshToken = await jwtHelper.generateRefreshToken();
                refreshTokens.push(refreshToken);
                // UPDATE USER
                await User.updateOne({"_id": user._id},
                    {$set: {"accessToken": accessToken, "refreshToken": refreshToken}});

                return response.successResponseWithData(res, 'Success', {...others, accessToken, refreshToken})
            }

        } catch (err) {
            return response.errorResponse(res, err.message);
        }
    },

    // req: id, accessToken, refreshToken
    refreshToken: async (req, res) => {
        try {
            const oldToken = req.headers.authorization.split(" ")[1];
            const oldRefreshToken = req.body.refreshToken;

            // find user
            const user = await User.findOne({_id: req.body.id})
            if (!user) {
                return response.unauthorizedResponse(res, "User do not exist!");
            }

            // check token con han k
            if (!isTokenExpired(oldToken)) {
                return response.successResponseWithData(res, 'Token is not expired!', {
                    accessToken: oldToken,
                    refreshToken: oldRefreshToken
                });
            }
            // neu het han va === token trong db => gen token moi
            if (user.accessToken === oldToken && user.refreshToken === oldRefreshToken) {
                //Generate access token
                const newAccessToken = await jwtHelper.generateAccessToken(user);
                //Generate refresh token
                const newRefreshToken = await jwtHelper.generateRefreshToken();
                refreshTokens.push(newRefreshToken);
                // UPDATE USER
                await User.updateOne({"_id": user._id},
                    {$set: {"accessToken": newAccessToken, "refreshToken": newRefreshToken}});

                const {password, ...others} = user._doc;
                return response.successResponseWithData(res, 'Success', {...others, newAccessToken, newRefreshToken})
            }
        } catch (e) {
            return response.errorResponse(res, e.message);
        }
    },

    forgotPass: async (req, res) => {
        return response.successResponse(res, 'Forgot password is coming!');
    },

    logout: async (req, res) => {
        try {
            const token = req.cookies.accessToken || (req.headers.authorization).split(" ")[1];
            if (!token) {
                return response.unauthorizedResponse(res, 'Token is empty!');
            }
            const id = await jwtHelper.decodeToken(token).id;
            await User.updateOne({"_id": id}
                , {$set: {"accessToken": "", "refreshToken": ""}})

            return response.successResponse(res, "Logout success!")

        } catch (e) {
            return response.errorResponse(res, e.message);

        }
    },


    /*
    * req: idUser, phoneNumber, oldPass, newPass
    * */
    changePassword: async (req, res) => {
        try {
            const {id, phoneNumber, oldPass, newPass} = req.body;
            const validateResult = validateChangePassword.validate(req.body, {
                errors: {
                    label: 'key',
                    wrap: {label: false}
                }
            });
            if (validateResult.error) {
                return response.validationError(res, validateResult.error.message);
            }


            const user = await User.findOne({_id: `${id}`});
            if (!user) {
                return response.errorResponse(res, 'User not found!');
            }
            // console.log(user.phoneNumber)
            if (phoneNumber !== user.phoneNumber) {
                return response.errorResponse(res, 'Phone number incorrect!');
            }

            const validPassword = await bcrypt.compare(
                oldPass,
                user.password
            );
            if (!validPassword) {
                return response.errorResponse(res, 'Old password incorrect!');
            }

            if (oldPass === newPass) {
                return response.errorResponse(res, 'New password cannot be equal to the old password!');
            }
            // update pass
            const salt = await bcrypt.genSaltSync(10);
            const newHashed = await bcrypt.hash(newPass, salt);

            const updateNewPass = await User.updateOne({_id: user._id}, {$set: {'password': newHashed}})

            // console.log(updateNewPass);
            if (!updateNewPass) {
                return response.errorResponse(res, 'Change password has error!');
            }

            return response.successResponse(res, 'Change password is success!')


        } catch (e) {
            console.log(e.message)
            return response.errorResponse(res, 'Sever error!');
        }
    },

    getAllNameUser: async (req, res) => {
        try {
            const users = await User.find();
            const newObjs = [];

            for (let i = 0; i < users.length; i++) {
                let obj = {
                    id: users[i]._id,
                    name: users[i].name,
                }
                newObjs.push(obj);
            }
            return response.successResponseWithData(res, "Logout success!", newObjs);
        } catch (e) {
            return response.errorResponse(res, e.message);
        }
    },
    clearDB: async (req, res) => {
        try {

            const de = await User.deleteMany();

            console.log(de)
            if (de.acknowledged) {
                return response.successResponse(res, 'ok')
            }

        } catch (e) {
            return response.errorResponse(res, e.message);
        }
    }

}

module.exports = authController;