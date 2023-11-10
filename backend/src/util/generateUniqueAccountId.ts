const generateUniqueAccountId = (username: string | undefined) => {
    return username +  new Date().getTime().toString()
}

export default generateUniqueAccountId