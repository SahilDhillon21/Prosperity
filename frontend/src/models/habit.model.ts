import dayWithReflection from "./dayWithReflection.model";

export default interface Habit {
    _id: string,
    name: string,
    description?: string,
    time?: string,
    completedDays: dayWithReflection[],
    createdAt: string,
    updatedAt: string
}