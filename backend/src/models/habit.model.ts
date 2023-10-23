import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

    description: String,

    time: String,

    completedDays: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'DayWithReflection'
        }
    ],

}, { timestamps: true })

const Habit = mongoose.model("Habit", habitSchema)

export default Habit