
export default interface Account {
    _id: string,
    user: string,
    accountId: string,
    balance: number,
    expenseCategories: {
        name: string,
        url: string,
    }
    incomeCategories: {
        name: string,
        url: string,
    }
}