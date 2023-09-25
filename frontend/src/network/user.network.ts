import axios from 'axios'
import User from '../front_models/user.model'

export interface SignupCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignupCredentials) {
    try {
        const newUser = await axios.post<User>("/users/signup", credentials)
        return newUser
    } catch (error) {
        alert("error in singup function (frontend)")
    }
}

export interface LoginCredentials {
    username: string,
    passwod: string,
}

export async function login(credentials: LoginCredentials) {
    try {
        const user = await axios.post<User>("/users/login", credentials)
        return user
    } catch (error) {
        alert("error in login function (frontend)")
    }
}

export async function logout() {
    try {
        await axios.post("/users/logout")
    } catch (error) {
        alert("error in logout function (frontend)")
    }
}

export async function getAuthenticatedUser() {
    try {
        const res = await axios.get("/users")
        return res.data
    } catch (error) {
        alert("can't get user")
    }
}



