export default interface Account{
    _id: string,
    user: string,
    accountId: string,
    balance: number,
    expenseCategories : {
        name: string,
        image: string,
    }
    incomeCategories : {
        name: string,
        image: string,
    }
}