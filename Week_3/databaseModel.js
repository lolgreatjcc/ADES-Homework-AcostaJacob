var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'FrozenLava123',
    database: 'ades_hw'
});

module.exports = pool;