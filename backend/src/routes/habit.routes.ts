import express from 'express'
import * as HabitControllers from '../controllers/habits.controllers'

const router = express.Router()

router.get('/', HabitControllers.getHabits)

export default router
