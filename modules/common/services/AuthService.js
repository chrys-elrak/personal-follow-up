const DB = require('./DatabaseService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    getUserByUsername(username) {
        return DB.query('SELECT * FROM user WHERE username = ?', [username]); // [{id: 1}, {id: 52}]
    },

    async login({username, password}) {
        const [user] = await this.getUserByUsername(username);
        if (!user) {
            return false;
        }
        const authorized = await bcrypt.compare(password, user.password);
        if (!authorized) {
            return false;
        }
        return jwt.sign({
            sub: user.id,
            iss: process.env.ISS_TOKEN,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1)
        }, process.env.TOKEN_SECRET);
    },

};