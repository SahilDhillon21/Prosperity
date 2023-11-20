export default interface User{
    _id: string,
    username: string,
    email: string,
    image: string,
    password: string,
    notes: string[],
    habits: string[],
    accountId: string,
}