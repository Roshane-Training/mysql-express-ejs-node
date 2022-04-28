const express = require("express");
const conn = require("../include/db");
const router = express.Router();
const path = require("path");

// create
router.get("/create", (req, res) => {
	res.sendFile(path.resolve("./src/public/create_student.html"));
});

// index
router.get("/all", (req, res) => {
	conn.query("SELECT name, email_address, cohort FROM amberapp1.students;", (err, results) => {
		if (err) throw err.toString();
		return success(res, results);
	});
});

// add
router.post("/add", (req, res) => {
	const data = {
		name: req.body.name,
		cohort: req.body.cohort,
		username: req.body.username,
		email_address: req.body.email_address,
		password: req.body.password,
	};

	conn.query(`INSERT INTO students SET ?`, data, (err, results) => {
		if (err) throw err;
		return success(res, results);
	});
});

// update

// delete

// show
router.get("/:id", (req, res) => {
	const id = Number(req.params.id);
	if (id == NaN) error(res, "use a number for the user id", 422);

	conn.query(`SELECT * FROM students WHERE id = '${id}';`, (err, results) => {
		if (err) throw err;
		success(res, results);
	});
});

function success(response, data = [], message = "success", status = 200) {
	response.send({ status, message, data });
}

function error(response, message = "error", status = 500, data = []) {
	response.send({ status, message, data });
}

module.exports = router;
