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
    ]

}, {timestamps: true})

const User = mongoose.model("User",userSchema)

export default User

