import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },

    description: {
        type: String,
    },

    target: {
        type: Date
    },
})

const Task = mongoose.model("Task",taskSchema)

export default Task