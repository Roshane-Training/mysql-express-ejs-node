const express = require('express')
const conn = require('../db')
const router = express.Router()

// Create form
router.get('/create', (req, res) => {
	res.render('student/create')
})

// All form
router.get('/', (req, res) => {
	conn.query('SELECT id,name,username,email_address,cohort FROM amberapp1.students;', (err, results) => {
		if (err) throw err.toString()

		res.render('student/index', { students: results })
	})
})

// Edit form
router.get('/edit/:id', (req, res) => {
	conn.query(`SELECT id,name,username,email_address,cohort FROM amberapp1.students WHERE id = ${Number(req.params.id)};`, (err, results) => {
		if (err) throw err.toString()

		return res.render('student/edit', { student: results })
	})
})

// index
router.get('/all', (req, res) => {
	conn.query('SELECT name, email_address, cohort FROM amberapp1.students;', (err, results) => {
		if (err) throw err.toString()

		return success(res, results)
	})
})

// create
router.post('/add', (req, res) => {
	const data = {
		name: req.body.name,
		username: req.body.username,
		email_address: req.body.email_address,
		address_line1: req.body.address_line1,
		address_line2: req.body.address_line2,
		mailing_address1: req.body.mailing_address1,
		mailing_address2: req.body.mailing_address2,
		cohort: req.body.cohort,
		home_phone: req.body.home_phone,
		password: req.body.password,
	}

	conn.query(`INSERT INTO students SET ?`, data, (err, results) => {
		if (err) throw err

		return success(res, results)
	})
})

// update
router.put('/update/:id', (req, res) => {
	const data = {
		name: req.body.name,
		cohort: 1,
		username: req.body.username,
		email_address: req.body.email_address,
	}

	conn.query(`UPDATE students SET ? WHERE id = ${req.params.id}`, data, (err, results) => {
		if (err) throw err

		return success(res, results)
	})
})

// delete
router.delete('/delete/:id', (req, res) => {
	const id = Number(req.params.id)
	if (id == NaN) error(res, 'use a number for the user id', 422)

	conn.query(`DELETE FROM students WHERE id = ${id}`, (err, results) => {
		if (err) throw err
		return success(res, results)
	})
})

// show
router.get('/:id', (req, res) => {
	const id = Number(req.params.id)
	if (id == NaN) error(res, 'use a number for the user id', 422)

	conn.query(`SELECT * FROM students WHERE id = '${id}';`, (err, results) => {
		if (err) throw err

		success(res, results)
	})
})

function success(response, data = [], message = 'success', status = 200) {
	response.send({ status, message, data })
}

function error(response, message = 'error', status = 500, data = []) {
	response.send({ status, message, data })
}

module.exports = router
