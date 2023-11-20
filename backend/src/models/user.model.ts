import mongoose from "mongoose";
import { defaultUserImage } from "../constants";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        select: false,
    },

    image: {
        type: String,
        require: true,
        default: defaultUserImage,
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

