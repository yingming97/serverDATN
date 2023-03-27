const db = require('../models/db.config')
const userModel = require('../models/user.model');

class UserController {

    async createUser(req, res) {
        await db.connectDB();
        const d = 'kkkk';
        await db.disConnectDB()
        return res.json(d);
    }

}

module.exports = new UserController();

