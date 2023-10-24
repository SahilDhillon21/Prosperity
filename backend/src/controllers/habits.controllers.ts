import { RequestHandler } from "express";
import User from "../models/user.model";

export const getHabits: RequestHandler = async (req, res) => {
    const userId = req.session.userId

    try {

        if (!userId) {
            res.status(200).json({})
            return
        }

        const user = await User.findById(userId).populate('habits').populate('DayWithReflection')

        if (!user) {
            res.status(401).json({ message: "User doesn't exist" })
            return
        }

        res.status(200).json(user.habits)

    } catch (error) {
        console.log(error);
    }

}