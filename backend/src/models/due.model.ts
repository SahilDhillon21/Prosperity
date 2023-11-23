import mongoose from "mongoose";

const dueSchema = new mongoose.Schema({
    lender: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: true,
    },
    
    borrower: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: true,
    },

    amount: {
        type: Number,
        require: true,
    }, 

    group: {
        type: mongoose.Schema.ObjectId,
        ref: 'Group'
    },

    dueDate: Date,

}, { timestamps: true })

const Due = mongoose.model("Due", dueSchema)

export default Due 