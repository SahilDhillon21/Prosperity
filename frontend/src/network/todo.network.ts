import axios from 'axios'


export const getTodo = async (userId: string) => {
    try {
        const response = await axios.get(`/todo/${userId}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const callCreateTask = async () => {
    try {
        const response = await axios.post('/todo/createTask', { title: "Trial Task 1" })
        return response.data
    } catch (error) {
        console.log(error);
    }
}