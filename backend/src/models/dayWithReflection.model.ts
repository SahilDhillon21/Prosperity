import mongoose from "mongoose";

const dayWithReflectionSchema = new mongoose.Schema({
    date: {
        type: Date,
        require: true,
    },

    reflection: String,
})

const DayWithReflection = mongoose.model("DayWithReflection", dayWithReflectionSchema)

export default DayWithReflection