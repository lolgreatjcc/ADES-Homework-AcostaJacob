var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b7ae6c8a4557d4',
    password: '817375f8',
    database: 'heroku_2230e5a57d0e906'
});

module.exports = pool;