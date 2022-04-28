const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "amberapp1",
});

connection.connect();

module.exports = connection;
