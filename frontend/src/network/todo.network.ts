import axios from 'axios'
import { Dayjs } from 'dayjs';


export const getTodo = async (userId: string) => {
    try {
        const response = await axios.get(`/todo/${userId}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const callCreateTask = async (data: {title: string, description: string}, datevalue: Dayjs | null ) => {
    try {
        const response = await axios.post('/todo/createTask', { title: data.title, description: data.description, target: datevalue })
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const callCompleteTask = async (taskId: any) => {
    try {
        const response = await axios.post('/todo/deleteTask',{taskId: taskId})
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}

export const callUpdateTask = async (data: {title: string, description: string}, datevalue: Dayjs | null, taskId: string) => {
    try {
        const response = await axios.post('/todo/updateTask', { title: data.title, description: data.description, target: datevalue, taskId: taskId })
        return response.data
    } catch (error) {
        console.log(error);
    }
}