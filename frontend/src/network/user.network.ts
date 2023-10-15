import axios from "axios"
import { SignupFormProps } from "../components/SignupDialog"
import { LoginFormProps } from "../components/LoginDialog"

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

export const callUserLogin = async (credentials : LoginFormProps) => {
    try {
        const response = await axios.post("/users/login", credentials)
        return response;

    } catch (error) {
        alert("error in network (call user login)")
    }
}