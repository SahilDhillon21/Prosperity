import { RequestHandler } from "express"
import Task from "../models/task.model"
import User from "../models/user.model"

export const createTask: RequestHandler = async (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const target = req.body.target

    const userId = req.session.userId

    try {

        const user = await User.findById(userId).exec()

        if (!user) {
            res.status(200).json({ message: "This user doesn't exist" })
            return
        }

        if (!title) {
            res.status(200).json({ messaege: "Task must have a title" })
        }

        const newTask = await Task.create({
            title: title,
            description: description,
            target: target,
        })

        await user.todo.push(newTask._id)

        await user.save()

        await newTask.save()

        res.status(200).json(newTask)

    } catch (error) {
        console.log("can't create task (create task controller)");
    }
}

export const updateTask: RequestHandler = async (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const target = req.body.target
    const taskId = req.body.taskId

    const userId = req.session.userId

    try {

        const user = await User.findById(userId).exec()

        if (!user) {
            res.status(200).json({ message: "This user doesn't exist" })
            return
        }

        if (!title) {
            res.status(200).json({ messaege: "Task must have a title" })
        }

        const existingTask = await Task.findById(taskId).exec()

        if(!existingTask) return
        
        existingTask.title = title
        existingTask.description = description
        existingTask.target = target

        const newTask = await existingTask.save()

        res.status(200).json(newTask)

    } catch (error) {
        console.log("can't create task (create task controller)");
    }
}

export const deleteTask: RequestHandler = async (req, res) => {
    const taskId = req.body.taskId

    console.log("task id: " + taskId)

    if (!taskId) return

    try {
        const task = await Task.findById(taskId).exec()

        if (!task) {
            res.status(404).json({ "message": "Task doesn't exist" })
            return
        }

        await task.deleteOne()

        res.sendStatus(204)
    } catch (error) {
        console.log(error);
    }
}

export const getTasks: RequestHandler = async (req, res) => {
    try {
        const userId = req.params.userId

        if (!userId) {
            res.status(200).json({ message: "no user id sent" })
            return
        }

        const user = await User.findById(userId).populate('todo')

        if (!user) {
            res.status(200).json({ message: "user doesn't exist" })
            return
        }

        res.status(200).json(user.todo)
    } catch (error) {
        console.log(error);

    }
}