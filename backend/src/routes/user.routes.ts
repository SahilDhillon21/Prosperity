import express from "express"
import * as UserController from '../controllers/user.controllers'

const router = express.Router()

router.get('/',UserController.getAuthenticatedUser)

router.post('/signup', UserController.handleUserSignup)

router.post('/login', UserController.handleUserLogin)

router.post('/logout', UserController.logout)

export default router

