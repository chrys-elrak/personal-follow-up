const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = {
    pool: null,
    connect() {
        // For pool initialization, see above
        pool.getConnection((err, conn) => {
            this.pool = conn;
            if (err) {
                console.error('ERROR DURING THE CONNECTION ...');
                throw err;
            }
            console.log('DATABASE CONNECTED ...');
        });
    },
    close() {
        if (this.pool) {
            this.pool.close();
        }
    },
    query(sql, params = []) {
        return new Promise((resolve, reject) => {
            if (!this.pool) {
                throw (new Error('POOL IS NOT INITIALIZED ...'));
            }
            this.pool.query(sql, params, (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }
};

