const mysql = require('mysql2')
const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "root",
database:"master_inventory",
port: 3306
})

module.exports = db;
