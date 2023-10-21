import  express  from "express";
import * as TodoController from '../controllers/task.controller'

const router = express.Router()

router.get('/:userId', TodoController.getTasks)

router.post('/createTask', TodoController.createTask)

router.post('/updateTask', TodoController.updateTask)

router.post('/deleteTask', TodoController.deleteTask)

export default router