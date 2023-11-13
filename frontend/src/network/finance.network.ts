import axios from "axios"

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

export const getAllTransactions = async () => {
    try {
        const response = await axios.get('/finances/getAllTransactions')
        return response.data
    } catch (error) {
        console.log(error)
    }
}