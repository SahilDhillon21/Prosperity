import dayjs from "dayjs"
import Habit from "../models/habit.model"
import checkForDay from "./checkForDay"
var customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(customParseFormat)

const getWeeklyRecordOfHabit = (weekDates: string[], completedDaysOfHabit: Habit["completedDays"], createdAt: string) => {

    /*
        week dates array will give the dates of monday and sunday of the week for which the data is to be filled.
        It's sure that while sending, it will only be the current week or some past week
    */

    const weekDateObjects = []

    for (let d = 0; d < 7; d++) {
        weekDateObjects[d] = dayjs(weekDates[d], 'DD/MM/YYYY')
    }

    const habitCreationDay = dayjs(createdAt)

    const today = dayjs(new Date())

    const recordArray: any = []

    for (let d = 0; d < 7; d++) {
        if (weekDates[d] === today.format('DD/MM/YYYY')){
            if(checkForDay(weekDates[d], completedDaysOfHabit)){
                recordArray[d] = true
            } else {
                recordArray[d] = "F"
            }
        }
        else if (weekDateObjects[d] < habitCreationDay) {
            recordArray[d] = "NA"
        } else if (weekDateObjects[d] >= today) {
            recordArray[d] = "F"
        } else if (checkForDay(weekDates[d], completedDaysOfHabit)) {
            recordArray[d] = true
        } else {
            recordArray[d] = false
        }
    }

    return recordArray
}

export default getWeeklyRecordOfHabit