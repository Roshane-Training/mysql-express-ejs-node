const express = require("express");
const app = express();
const conn = require("./db");

conn.query("SELECT name, email_address, cohort FROM amberapp1.students;", (err, results) => {
	if (err) throw err.toString();
	prettyPrint("Students Info", results);
});

const searchQuery = "King";
conn.query(`SELECT name,username,email_address,address_line1,address_line2,mailing_address1 FROM amberapp1.students WHERE mailing_address1 LIKE '%${searchQuery}%';`, (err, results) => {
	if (err) throw err.toString();
	prettyPrint("Search Query", results);
});

const prettyPrint = (title, results) => {
	if (title) {
		console.log("\n\n\n");
		console.log("================================================================");
		console.log("\t\t\t", title);
		console.log("================================================================");
	}
	console.table(results);
};
