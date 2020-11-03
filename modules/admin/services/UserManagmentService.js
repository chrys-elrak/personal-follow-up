const DB = require('../../common/services/DatabaseService');
const bcrypt = require('bcrypt');

module.exports = {
    getAllUsers() {
        return DB.query('SELECT * FROM user');
    },

    createUser({username, password, roleId}) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return DB.query('INSERT INTO user (username, password, roles_id) VALUES (?, ?, ?)', [username, hashedPassword, roleId]);
    },

};