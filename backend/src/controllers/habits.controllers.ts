import { RequestHandler } from "express";
import User from "../models/user.model";
import Habit from "../models/habit.model";

export const getHabits: RequestHandler = async (req, res) => {
    const userId = req.session.userId
    try {

        if (!userId) {
            res.status(200).json({})
            return
        }

        const user = await User.findById(userId).populate('habits')

        if (!user) {
            res.status(401).json({ message: "User doesn't exist" })
            return
        }

        res.status(200).json(user.habits)

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

        if(!existingHabit){
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