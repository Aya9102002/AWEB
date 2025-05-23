const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Aya@9102002',
    database: 'task_management_sys',
});

module.exports = connection;
