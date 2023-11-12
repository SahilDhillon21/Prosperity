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
        name: String,
        image: String,
    }],

    incomeCategories:[{
        name: String,
        image: String,
    }],

})

const Account = mongoose.model("Account", accountSchema)
export default Account