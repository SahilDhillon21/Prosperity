import { RequestHandler } from "express"
import Task from "../models/task.model"
import User from "../models/user.model"

export const createTask: RequestHandler = async (req,res) => {
    const title = req.body.title
    const description = req.body.description
    const target = req.body.target

    const userId = req.session.userId

    try {
        
        const user = await User.findById(userId).exec()

        if(!user) {
            res.status(200).json({message: "This user doesn't exist"})
            return
        }

        if(!title){
            res.status(200).json({messaege: "Task must have a title"})
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