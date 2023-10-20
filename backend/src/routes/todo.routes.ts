import  express  from "express";
import * as TodoController from '../controllers/task.controller'

const router = express.Router()

router.get('/:userId', TodoController.getTasks)

router.post('/createTask', TodoController.createTask)

export default router