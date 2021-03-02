import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import routes from './routes'

import authenticateUser from './middleware/authenticateUser'
// const path = require("path");
const app = express()

// Only use env variables if not production
if (process.env.NODE_ENV != 'production') {
	require('dotenv').config()
}

const PORT = process.env.PORT || 3000

// Enable cors on all routes
app.use(cors())
// No need for body-parser
app.use(express.json())

try {
	mongoose.connect(process.env.MONGO_DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	console.log('DB connected')
} catch (error) {
	console.log(error)
}

app.use(authenticateUser)
app.use(routes)

app.listen(PORT, () => {
	console.log(`AuthServer running on ${PORT}`)
})
