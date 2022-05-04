const express = require('express')
const app = express()
const path = require('path')
const expressLayout = require('express-ejs-layouts')

require('dotenv').config()

const indexRoute = require('./routes/index')
const studentsRoute = require('./routes/students')
const trainersRoute = require('./routes/trainers')

app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.use(expressLayout)
app.use(express.static('public'))
app.use(require('cors')(['*']))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', indexRoute)
app.use('/students', studentsRoute)
app.use('/trainers', trainersRoute)

app.listen(process.env.APP_PORT || 8080, () => {
	console.log()
	console.log(`APP LISTENING ON » http://localhost:${process.env.APP_PORT}`)
	console.log()
})
