const DB = require('./DatabaseService');

module.exports = {
    getUserById(id) {
        const sql = `
        SELECT *
        FROM user u
        WHERE u.id = ?`;
        return DB.query(sql, [id]);
    }
};