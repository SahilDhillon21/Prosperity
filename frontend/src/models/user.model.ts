export default interface User{
    _id: string,
    username: string,
    email: string,
    password: string,
    notes: string[],
    habits: string[],
}