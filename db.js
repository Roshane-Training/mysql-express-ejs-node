const mysql = require('mysql')
require('dotenv').config()

const connection = mysql.createConnection({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASS || '',
	database: process.env.DB_DATABASE || 'amberapp1',
})

connection.connect()
module.exports = connection
