import axios from "axios"
import { SignupFormProps } from "../components/SignupDialog"
import { LoginFormProps } from "../components/LoginDialog"

export const getAllUsers = async () => {
    try {
        const response = await axios.get('/users/getAllUsers')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getProfileDetails = async (username: string) => {
    try {
        const response = await axios.get(`/users/profiles/${username}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const callUserSignup = async (newUser: SignupFormProps) => {
    try {
        const response = await axios.post('/users/signup', newUser)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const callAuthenticatedUser = async () => {
    try {
        const response = await axios.get('/users');
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const callUserLogout = async () => {
    try {
        await axios.post('/users/logout')
    } catch (error) {
        console.log(error)
    }
}

export const callUserLogin = async (credentials: LoginFormProps) => {
    const response = await axios.post('/users/login', credentials)
    return response.data
}