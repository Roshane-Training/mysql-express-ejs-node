const express = require('express')
const conn = require('../db')
const router = express.Router()

// create view
router.get('/create', (req, res) => {
	res.render('trainer/create')
})

// index view
router.get('/', (req, res) => {
	conn.query('SELECT id,title,first_nm,last_nm FROM amberapp1.trainers;', (err, results) => {
		if (err) throw err.toString()

		res.render('trainer/index', { trainers: results })
	})
})

// edit view
router.get('/edit/:id', (req, res) => {
	const id = Number(req.params.id)
	if (id == NaN) error(res, 'use a number for the trainer id', 422)

	conn.query(`SELECT id,title,first_nm as first_name, last_nm as last_name FROM amberapp1.trainers WHERE id = ${id};`, (err, results) => {
		if (err) throw err.toString()

		res.render('trainer/edit', { trainer: results })
	})
})

// index
router.get('/all', (req, res) => {
	conn.query('SELECT * FROM amberapp1.trainers;', (err, results) => {
		if (err) throw err.toString()
		return success(res, results)
	})
})

// add
router.post('/add', (req, res) => {
	const data = {
		title: req.body.title,
		first_nm: req.body.first_name,
		last_nm: req.body.last_name,
	}

	conn.query(`INSERT INTO trainers SET ?`, data, (err, results) => {
		if (err) throw err
		return success(res, results)
	})
})

// update
router.put('/update/:id', (req, res) => {
	const data = {
		title: req.body.title,
		first_nm: req.body.first_name,
		last_nm: req.body.last_name,
	}

	conn.query(`UPDATE trainers SET ? WHERE id = ${req.params.id}`, data, (err, results) => {
		if (err) throw err

		return success(res, results)
	})
})

// delete
router.delete('/delete/:id', (req, res) => {
	const id = Number(req.params.id)
	if (id == NaN) error(res, 'use a number for the trainer id', 422)

	conn.query(`DELETE FROM trainers WHERE id = ${id};`, (err, results) => {
		if (err) throw err

		success(res, results)
	})
})

// show
router.get('/:id', (req, res) => {
	const id = Number(req.params.id)
	if (id == NaN) error(res, 'use a number for the trainer id', 422)

	conn.query(`SELECT * FROM trainers WHERE id = '${id}';`, (err, results) => {
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
