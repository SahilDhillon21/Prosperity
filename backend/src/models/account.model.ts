import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

    accountId: {
        type: String,
        require: true
    },

    balance: {
        type: Number,
        default: 0
    },

    expenseCategories:[{
        type: String
    }],

    incomeCategories:[{
        type: String
    }],

})

const Account = mongoose.model("Account", accountSchema)
export default Account