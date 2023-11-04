import Habit from "../models/habit.model"

const getWeeklyRecordOfHabit = (weekDates: string[], completedDaysOfHabit: Habit["completedDays"]) => {
    const monday = new Date(weekDates[0])

    const recordArray = []

    var i = completedDaysOfHabit.length - 1

    while(new Date(completedDaysOfHabit[i].date) > monday) i--

    // i -> traverses the string containing dates where the habit was done
    // j -> traverses over the week dates

    for(let j=0; j<7; j++){
        if(completedDaysOfHabit[i].date === weekDates[j]){
            recordArray[j] = true
            i++
        } else {
            recordArray[j] = false
            if(new Date(completedDaysOfHabit[i].date) < new Date(weekDates[j])) i++;
        }

    }

    return recordArray
}

export default getWeeklyRecordOfHabit