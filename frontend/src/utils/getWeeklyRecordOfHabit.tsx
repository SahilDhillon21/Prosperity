import dayjs from "dayjs"
import Habit from "../models/habit.model"
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const getWeeklyRecordOfHabit = (weekDates: string[], completedDaysOfHabit: Habit["completedDays"]) => {
    

    const monday = dayjs(weekDates[0], "DD/MM/YYYY")

    const sunday = dayjs(weekDates[6], "DD/MM/YYYY")
    
    const today = dayjs(new Date())

    const recordArray = []

    var i = completedDaysOfHabit.length - 1

    console.log(JSON.stringify(completedDaysOfHabit))

    while(i > 0 && dayjs(completedDaysOfHabit[i].date, "DD/MM/YYYY") > monday) i--

    if(i<completedDaysOfHabit.length && dayjs(completedDaysOfHabit[i].date, "DD/MM/YYYY") < monday && completedDaysOfHabit.length > 1){
        i++
    }

    console.log("i : "+i+" length of completedDaysOfHabit "+completedDaysOfHabit.length)

    console.log(completedDaysOfHabit[i].date)
    
    // i -> traverses the string containing dates where the habit was done
    // Now, i could be pointing to monday or some day before it.
    // Fill the record array 

    var r = 0

    while(r < 7 && i < completedDaysOfHabit.length){
        
        if(completedDaysOfHabit[i].date === weekDates[r] ){
            recordArray[r] = true
            i++
        } else {
            recordArray[r] = false
        }
        r++
    }

    console.log(recordArray.toString());
    

    // const lastHabitCompletionDay = new Date(completedDaysOfHabit[i].date)

    // var daysFromLastHabitCompletionDayToToday = today.day() - lastHabitCompletionDay.getDay()

    // while(daysFromLastHabitCompletionDayToToday > 0){
    //     recordArray[r++] = false
    //     daysFromLastHabitCompletionDayToToday--
    // }

    // while(r < 7){
    //     recordArray[r++] = "FutureDate"
    // }


    // return recordArray
    return []
}

export default getWeeklyRecordOfHabit