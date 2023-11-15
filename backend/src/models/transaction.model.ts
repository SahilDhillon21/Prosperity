import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    accountId: {
        type: String,
        require: true
    },

    transactionId: {
        type: String,
        require: true
    },

    amount: {
        type: Number,
        require: true
    },

    type: {
        type: String,
        require: true
    },

    secondAccount: String,

    category: {
        type: String,
        require: true
    },

    note: String,

}, { timestamps: true })

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction