import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String
    }
}, {timestamps: true})

const Note = mongoose.model("Note",noteSchema)

export default Note