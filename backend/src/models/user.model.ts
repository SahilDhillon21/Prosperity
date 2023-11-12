import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    notes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Note'
        }
    ],

    todo: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Task'
        }
    ],

    habits: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Habit'
        }
    ],

    accountId: {
        type: String,
        require: true
    }

}, {timestamps: true})

const User = mongoose.model("User",userSchema)

export default User

