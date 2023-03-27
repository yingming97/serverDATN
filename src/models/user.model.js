const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        },
        name: {
            type: String,
            require: true,
            min: 6,
            unique: true,
        },
        phoneNumber: {
            type: String,
            require: true,
            max: 10,
            unique: true,
        },
        email: {
            type: String,
            require: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            min: 6,
        },
        status: {
            type: Boolean,
            require: true,
            min: 6,
        },
        role: {
            type: String,
            require: true
        },
        deviceId: {
            type: String,
            require: true
        },
        linkAvt: {
            type: String,
            default: ""
        },
        accessToken: {
            type: String,
            default: "",
        },
        refreshToken: {
            type: String,
            default: "",
        },

    },
    {timestamps: true}
);

module.exports = mongoose.model('User', UserSchema);