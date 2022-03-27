const mysql = require('mysql2');

// connect to mysql database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '0077Coke',
        database: 'bizmanager'
    },
    console.log('Connected to bizmanager database')
);

module.exports = db;