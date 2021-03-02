import express from 'express'
const routes = express.Router()
const AuthController = require('./controllers/AuthController')

// * Auth Operations
routes.post('/user/login', AuthController.loginUser)
routes.delete('/user/logout', AuthController.logoutUser)
routes.post('/user/token', AuthController.token)

export default routes
