import axios from "axios"
import User from "../models/user.model";

export const getBalance = async (accountId: string) => {
    try {
        const response = await axios.get(`/finances/getBalance/${accountId}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const setBalance = async (accountId: string, amount: number) => {
    try {
        const response = await axios.post('finances/setBalance', { "amount": amount, "accountId": accountId })
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const getCurrentAccount = async () => {
    try {
        const response = await axios.get('/finances/getCurrentAccount')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getUsernameFromAccountId = async (accountId: string) => {
    try {
        const response = await axios.get(`/finances/getUsernameFromAccountId/${accountId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

interface CreateTransactionProps {
    type: string,
    amount: number,
    secondAccount?: string,
    category: string,
    defaultNoteValue: string,
}

export const createTransaction = async (data: CreateTransactionProps) => {
    try {
        const response = await axios.post('/finances/createTransaction', data)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const getAllTransactions = async () => {
    try {
        const response = await axios.get('/finances/getAllTransactions')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

interface AddCategoryProps {
    name: string,
    category: string,
    imgURL: string,
}

export const addCategory = async (data: AddCategoryProps) => {
    try {
        await axios.post('/finances/addCategory', data)
    } catch (error) {
        console.log(error)
    }
}

export const getUserGroups = async () => {
    try {
        const response = await axios.get('/finances/getUserGroups')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

interface CreateGroupProps {
    groupName: string,
    selectedUsers: User[],
    descriptionValue: string,
}

export const createGroup = async (data: CreateGroupProps) => {
    try {
        const response = await axios.post('/finances/createGroup', data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}