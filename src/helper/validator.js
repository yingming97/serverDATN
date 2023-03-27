const Joi = require("joi")
const regexEmail = /([-!#-'*+/-9=?A-Z^-~]+(\\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \\t]|(\\\\[\\t -~]))+")@([-!#-'*+/-9=?A-Z^-~]+(\\.[-!#-'*+/-9=?A-Z^-~]+)*|\\[[\\t -Z^-~]*])/
const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/i;

const validateLogin = Joi.object({
    phoneNumber: Joi.string()
        .min(10)
        .max(10)
        .messages({
            "string.base": `Username should be a type of string`,
            "string.empty": `Username must contain value`,
            "any.required": `Username is a required field`
        }),
    password: Joi.string()
        .min(3)
        .max(10)
        .messages({
            "string.base": `Password should be a type of string`,
            "string.empty": `Password must contain value`,
            "any.required": `Password is a required field`
        })
}).required();

const validateRegister = Joi.object({
    name: Joi.string()
        .min(2)
        .message({
            "string.empty": 'name not empty!',
            "string.min": 'name should have a minimum length of {#limit}',
        }),
    email: Joi.string()
        .pattern(new RegExp(regexEmail))
        .message({
            "string.empty": 'Email not empty!',
            "any.required": 'Email is a required field',
            "string.pattern.base": 'Invalid email!',
        }),
    phoneNumber: Joi.string()
        .pattern(new RegExp(regexPhoneNumber))
        .message({
            "string.empty": 'phone number not empty!',
            "any.required": 'Phone number is a required field',
            "string.pattern.base": 'Invalid phone number!',
        }),
    password: Joi.string()
        .min(3)
        .max(10)
        .messages({
            'string.empty': `Password cannot be an empty field`,
            'string.min': `Password should have a minimum length of {#limit}`,
            'any.required': `Password is a required field`
        }),
    role: Joi.string()
        .min(2)
        .message({
            "string.empty": 'Role not empty!',
            "string.min": 'Role should have a minimum length of {#limit}',
        }),
    status: Joi.string()
        .min(4)
        .message({
            "string.empty": 'status not empty!',
            "string.min": 'status should have a minimum length of {#limit}',
        }),
    deviceId: Joi.string()
        .min(4)
        .message({
            "string.empty": 'deviceId not empty!',
            "string.min": 'deviceId should have a minimum length of {#limit}',
        }),
    linkAvt: Joi.string()
        .min(10)
        .message({
            "string.empty": 'Avatar not empty!',
        }),
}).required();

const validateRefreshToken = Joi.object({
    _id: Joi.string()
        .min(24)
        .max(24)
        .message({
            'string.empty': `Id cannot be an empty field`,
            'string.min': `Id should have a minimum length of {#limit}`,
            'string.max': `Id should have a minimum length of {#limit}`,
            'any.required': `Id is a required field`
        }),
    accessToken: Joi.string()
        .min(30)
        .message({
            'string.empty': `Access token cannot be an empty field`,
            'string.min': `Access token should have a minimum length of {#limit}`,
            'any.required': `Access token is a required field`
        }),
    refreshToken: Joi.string()
        .min(20)
        .max(20)
        .message({
            'string.empty': `Refresh token cannot be an empty field`,
            'string.min': `Refresh token should have a minimum length of {#limit}`,
            'string.max': `Refresh token should have a minimum length of {#limit}`,
            'any.required': `Refresh token is a required field`
        })
}).required();

const validateChangePassword = Joi.object({
    id: Joi.string()
        .min(24)
        .max(24)
        .message({
            'string.empty': `Id cannot be an empty field`,
            'string.min': `Id should have a minimum length of {#limit}`,
            'string.max': `Id should have a minimum length of {#limit}`,
            'any.required': `Id is a required field`
        }),
    phoneNumber: Joi.string()
        .pattern(new RegExp(regexPhoneNumber))
        .message({
            "string.empty": 'phone number not empty!',
            "any.required": 'Phone number is a required field',
            "string.pattern.base": 'Invalid phone number!',
        }),
    oldPass: Joi.string()
        .min(3)
        .max(10)
        .messages({
            'string.empty': `Old password cannot be an empty field`,
            'string.min': `Old password should have a minimum length of {#limit}`,
            'any.required': `Old password is a required field`
        }),
    newPass: Joi.string()
        .min(3)
        .max(10)
        .messages({
            'string.empty': `New password cannot be an empty field`,
            'string.min': `New password should have a minimum length of {#limit}`,
            'any.required': `New password is a required field`
        }),
})


module.exports = {validateLogin, validateRegister, validateChangePassword}