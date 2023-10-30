import express from 'express'
import * as HabitControllers from '../controllers/habits.controllers'

const router = express.Router()

router.get('/', HabitControllers.getHabits)

router.post('/createHabit', HabitControllers.createHabit)

router.post('/updateHabit', HabitControllers.updateHabit)

router.post('/completeHabit', HabitControllers.completeHabit)

router.post('/undoHabit', HabitControllers.undoHabit)

export default router
