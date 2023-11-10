import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

    accountNumber: {
        type: String,
        require: true
    },

    balance: {
        type: Number,
        default: 0
    }
})

const Account = mongoose.model("Account",accountSchema)
export default Account