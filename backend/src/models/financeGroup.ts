import mongoose, { mongo } from "mongoose";

const financeGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

    members: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],

    dues: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Due'
        }
    ]

}, { timestamps: true })

const Group = mongoose.model("Group", financeGroupSchema)

export default Group