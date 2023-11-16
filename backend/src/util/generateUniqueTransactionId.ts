import  uuid = require('uuid');

const generateUniqueTransactionId = () => {
    return uuid.v4()
}

export default generateUniqueTransactionId