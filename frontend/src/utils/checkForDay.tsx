import Habit from "../models/habit.model"

const checkForDay = (date: string, completedDays: Habit["completedDays"]) => {
    for(let i=0; i<completedDays.length; i++){
        if(date === completedDays[i].date) return true
    }

    return false
}

export default checkForDay