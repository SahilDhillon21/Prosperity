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

    expenseCategories: [{
        name: String,
        image: {
            public_id: {
                type: String,
                require: true,
            },

            url: {
                type: String,
                require: true,
            }
        }
    }],

    incomeCategories: [{
        name: String,
        image: {
            public_id: {
                type: String,
                require: true,
            },

            url: {
                type: String,
                require: true,
            }
        }
    }],

})

const Account = mongoose.model("Account", accountSchema)
export default Account