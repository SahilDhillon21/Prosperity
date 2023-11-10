import { uuid } from "uuidv4"

const generateUniqueTransactionId = () => {
    return uuid().toString()
}

export default generateUniqueTransactionId()