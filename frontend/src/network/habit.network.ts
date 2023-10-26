import axios from "axios";
import { CreateEditHabitFormProps } from "../components/CreateEditHabit";

export const callCreateHabit = async (data: CreateEditHabitFormProps) => {
    try {
        const response = await axios.post('/habits/createHabit', data)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const callUpdateHabit = async (data: CreateEditHabitFormProps) => {
    try {
        const response = await axios.post('/habits/updateHabit', data)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const callCompleteHabit = async (habitId: string, reflection: string) => {
    const data = {"habitId": habitId, "reflection": reflection}
    try {
        const response = await axios.post('/habits/completeHabit', data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchHabits = async () => {
    try {
        const response = await axios.get('/habits')
        return response.data
    } catch (error) {
        console.log(error);
    }
}

