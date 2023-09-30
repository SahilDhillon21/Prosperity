import axios from "axios"
import { SignupFormProps } from "../components/SignupDialog"

export const callUserSignup = async (newUser: SignupFormProps) => {
    try {
        const response = await axios.post('/users/signup', newUser)
        return response.data
    } catch (error) {
        alert(error)
    }
}

export const callAuthenticatedUser = async () => {
    try {
        const response = await axios.get('/users');
        console.log(response.data);
        return response.data
    } catch (error) {
        alert(error)
    }
}

export const callUserLogout = async () => {
    try {
        await axios.post('/users/logout')
    } catch (error) {
        alert(error)
    }
}