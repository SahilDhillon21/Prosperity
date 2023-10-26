import dayjs from "dayjs";
import Habit from "../models/habit.model";

export const wasDoneToday = (completedDays: Habit["completedDays"]) => {
    var today = dayjs(new Date()).format('DD/MM/YYYY')
    var lastCompletedDayWithReflection = completedDays[completedDays.length - 1]

    return today === lastCompletedDayWithReflection.date
}