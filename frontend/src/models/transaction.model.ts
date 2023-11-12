export default interface Transaction{
    accountId: string,
    transactionId: string,
    amount: number,
    type: string,
    secondaccount?: string,
    category: string,
}