const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesURLs = require('./routes/routes')
const cors = require('cors')


dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS, () => {
	console.log('Database Connected')
})

// order matters for these lines below
app.use(express.json())
app.use(cors())
app.use('', routesURLs) // base path is /app
app.listen(3000, () => {
	console.log("Server is running!")
})

