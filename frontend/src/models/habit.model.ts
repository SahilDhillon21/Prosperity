export default interface Habit{
    _id: string,
    name: string,
    description? : string,
    time?: string,
    completedDays: string[],
    createdAt: string,
    updatedAt: string
}