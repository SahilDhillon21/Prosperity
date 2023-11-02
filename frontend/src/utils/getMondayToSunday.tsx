const getMondayToSunday = () => {
    const currentDate = new Date()
    const currentDay = currentDate.getDay()

    const backwardDaysToMonday = currentDay === 0 ? 6 : currentDay - 1
    const mondayDate = new Date(currentDate)

    mondayDate.setDate(currentDate.getDate() - backwardDaysToMonday)
    const sundayDate = new Date(mondayDate)
    sundayDate.setDate(mondayDate.getDate() + 6);

    const dates = []
    dates[0] = mondayDate
    dates[1] = sundayDate

    return dates

}

export default getMondayToSunday