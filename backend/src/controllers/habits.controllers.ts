import { RequestHandler } from "express";
import User from "../models/user.model";
import Habit from "../models/habit.model";
import DayWithReflection from "../models/dayWithReflection.model";
import dayjs from "dayjs";

export const getHabits: RequestHandler = async (req, res) => {
    const userId = req.session.userId
    try {

        if (!userId) {
            res.status(200).json({})
            return
        }

        const data = await User.findOne({_id: userId}).populate({
            path: 'habits', 
            populate: {
                path: 'completedDays'
            }
        })


        if (!data) {
            res.status(401).json({ message: "User doesn't exist" })
            return
        }

        res.status(200).json(data.habits)

    } catch (error) {
        console.log(error);
    }

}

export const createHabit: RequestHandler = async (req, res) => {
    const userId = req.session.userId
    const name = req.body.name
    const description = req.body.description
    const time = req.body.timeValue

    try {

        if (!userId) {
            console.log("user not logged in");
            return
        }

        const user = await User.findById(userId).exec()

        if (!user) {
            console.log("user doesn't have an account");
            return
        }

        if (!name) {
            console.log("can't create habit without name");
            return
        }

        const newHabit = await Habit.create({
            name: name,
            description: description,
            time: time
        })

        user.habits.push(newHabit._id)

        await user.save()

        await newHabit.save()

        res.status(200).json(newHabit)

    } catch (error) {
        console.log(error);
    }
}

export const updateHabit: RequestHandler = async (req, res) => {
    const userId = req.session.userId
    const name = req.body.name
    const description = req.body.description
    const time = req.body.timeValue
    const habitId = req.body.habitId

    try {

        if (!userId) {
            console.log("user not logged in");
            return
        }

        const user = await User.findById(userId).exec()

        if (!user) {
            console.log("user doesn't have an account");
            return
        }

        if (!name) {
            console.log("can't create habit without name");
            return
        }

        const existingHabit = await Habit.findById(habitId).exec()

        if (!existingHabit) {
            console.log("habit doesn't exist");
            return
        }

        existingHabit.name = name
        existingHabit.description = description
        existingHabit.time = time

        const newHabit = await existingHabit.save()

        await newHabit.save()

        res.status(200).json(newHabit)

    } catch (error) {
        console.log(error);
    }
}

export const completeHabit: RequestHandler = async (req, res) => {
    const habitId = req.body.habitId
    const reflection = req.body.reflection

    try {
        if (!habitId) {
            console.log("No habit id provided")
            return
        }

        const today = dayjs(new Date()).format('DD/MM/YYYY')

        const newDayWithReflection = await DayWithReflection.create({
            date: today,
            reflection: reflection
        })


        const habit = await Habit.findByIdAndUpdate(habitId, {
            $push: { completedDays: newDayWithReflection._id }
        })

        if (!habit) {
            console.log("Habit with this ID not found ")
            return
        }

        await habit.save()

        console.log(JSON.stringify(habit));

        res.status(200).json(habit)
    } catch (error) {
        console.log(error)
    }

}