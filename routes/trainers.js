const express = require("express");
const conn = require("../include/db");
const router = express.Router();
const path = require("path");

// create
router.get("/create", (req, res) => {
	// res.sendFile(path.resolve("./src/public/create_trainer.html"));
	res.render("create_trainer");
});

// index
router.get("/all", (req, res) => {
	conn.query("SELECT * FROM amberapp1.trainers;", (err, results) => {
		if (err) throw err.toString();
		return success(res, results);
	});
});

// add
router.post("/add", (req, res) => {
	const data = {
		title: req.body.title,
		first_nm: req.body.first_name,
		last_nm: req.body.last_name,
	};

	conn.query(`INSERT INTO trainers SET ?`, data, (err, results) => {
		if (err) throw err;
		return success(res, results);
	});
});

// update

// delete

// show
router.get("/:id", (req, res) => {
	const id = Number(req.params.id);
	if (id == NaN) error(res, "use a number for the trainer id", 422);

	conn.query(`SELECT * FROM trainers WHERE id = '${id}';`, (err, results) => {
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
