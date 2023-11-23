import Due from "./due.model";
import User from "./user.model";

interface Group{
    _id: string,
    name: string,
    description: string,
    members: User[],
    dues: Due[],
    createdAt: string,
    updatedAt: string,
}

export default Group