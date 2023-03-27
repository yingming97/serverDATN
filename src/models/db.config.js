const mongoose = require('mongoose');
require("dotenv").config();

const username = process.env.USERNAME_DB;
const password = process.env.PASSWORD_DB;

const uri = `mongodb+srv://${username}:${password}@cluster0.qnxwn.mongodb.net/?retryWrites=true&w=majority`;

async function connectDB() {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
            console.log('=====>[INFO] Connect to DB success!');
        });
    } catch (e) {
        console.log(e)
    }
}

module.exports.connectDB = connectDB;