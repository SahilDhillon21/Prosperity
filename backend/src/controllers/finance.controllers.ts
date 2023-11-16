import { RequestHandler } from "express";
import Account from "../models/account.model";
import Transaction from "../models/transaction.model";
import User from "../models/user.model";
import generateUniqueTransactionId from "../util/generateUniqueTransactionId";

export const getBalance: RequestHandler = async (req, res) => {
    const accountId = req.params.accountId

    try {
        const account = await Account.findOne({ accountId: accountId })

        if (!account) {
            console.log("account with ID: " + accountId + " doesn't exist");
            return
        }

        const balance = account.balance

        res.status(200).json(balance)
    } catch (error) {
        console.log(error)
    }
}

export const setBalance: RequestHandler = async (req, res) => {
    const amount = req.body.amount
    const accountId = req.body.accountId

    try {
        const updateBalance = {
            $set: {
                "balance": amount
            },
        };

        await Account.updateOne({ accountId: accountId }, updateBalance)

        const newTransaction = await Transaction.create({
            category: "Update balance",
            accountId: accountId,
            type: "Update",
            amount: amount,
            transactionId: generateUniqueTransactionId()
        })

        res.status(200).json(newTransaction)
        res.sendStatus(200)

    } catch (error) {
        console.log(error);
    }
}

export const getCurrentAccount: RequestHandler = async (req, res) => {
    const userId = req.session.userId

    try {
        if (!userId) {
            console.log("user not authenticated");
            res.sendStatus(401)
            return
        }

        const user = await User.findById(userId)

        if (!user) {
            console.log("user doesn't exist");
            return
        }

        const acc = await Account.findOne({ accountId: user.accountId })

        if (!acc) {
            console.log("account for this user not found");
            return
        }

        res.status(200).json(acc)

    } catch (error) {
        console.log(error)
    }
}

export const getAllTransactions: RequestHandler = async (req, res) => {
    try {
        const userId = req.session.userId

        if (!userId) {
            res.sendStatus(401)
            return
        }

        const user = await User.findById(userId)

        if (!user) {
            console.log("user doesn't exist");
            return
        }

        const accountId = user.accountId

        if (!accountId) {
            console.log("no account associated with this user");
            return
        }

        const allTransactions = await Transaction.find({
            $or: [{ accountId: accountId }, { secondAccount: accountId }]
        }).sort({ createdAt: -1 })

        res.status(200).json(allTransactions)
    } catch (error) {
        console.log(error);
    }
}

export const createTransaction: RequestHandler = async (req, res) => {
    const { amount, type, secondAccount, category, note } = req.body

    try {
        const userId = req.session.userId

        if (!userId) {
            res.sendStatus(401)
            return
        }

        const user = await User.findById(userId)

        if (!user) {
            console.log("user doesn't exist");
            return
        }

        const accountId = user.accountId

        if (!accountId) {
            console.log("no account associated with this user");
            return
        }

        const account = await Account.findOne({ accountId: accountId })

        if (!account) {
            console.log("no account associated with this account ID");
            return
        }

        if (type === 'Expense') {
            if (account.balance < amount) {
                console.log("Not enough balance!");
                return
            }

            account.balance = account.balance - amount
            await account.save()

        } else if (type === 'Income') {

            account.balance = account.balance + amount
            await account.save()

        } else {
            // type == transfer
            if (account.balance < amount) {
                console.log("Not enough balance to transfer!");
                return
            }

            account.balance = account.balance - amount
            await account.save()

            const receivingAccount = await Account.findById(secondAccount)


            if (!receivingAccount) {
                console.log("receiving account doesn't exist");
                return
            }

            receivingAccount.balance = receivingAccount.balance + amount
            await receivingAccount.save()

        }

        const newTransaction = await Transaction.create({
            accountId: accountId,
            type: type,
            transactionId: generateUniqueTransactionId(),
            secondAccount: secondAccount,
            amount: amount,
            category: category,
            note: note
        })

        res.status(200).json(newTransaction)
        return

    } catch (error) {
        console.log(error)
    }
}

export const addIncomeExpenseCategory: RequestHandler = async (req, res, next) => {
    const { name, category, imgURL } = req.body

    try {
        const userId = req.session.userId

        if (!userId) {
            res.sendStatus(401)
            return
        }

        const user = await User.findById(userId)

        if (!user) {
            console.log("user doesn't exist");
            return
        }

        const accountId = user.accountId

        console.log("image urL: " + imgURL)

        if (category === 'Expense') {
            await Account.updateOne({ accountId: accountId }, {
                $push: {
                    expenseCategories: {
                        name: name,
                        image: imgURL,
                    }
                }
            })
        } else {
            await Account.updateOne({ accountId: accountId }, {
                $push: {
                    incomeCategories: {
                        name: name,
                        image: imgURL,
                    }
                }
            })
        }

        res.sendStatus(200)

    } catch (error) {
        console.log(error);
        next(error)
    }
}