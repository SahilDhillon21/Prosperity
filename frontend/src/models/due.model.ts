import Group from "./group.model";
import User from "./user.model";

interface Due {
    _id: string,
    lender: User,
    borrower: User,
    amount: number,
    group?: Group,
    createdAt: string,
    updatedAt: string,
}

export default Due