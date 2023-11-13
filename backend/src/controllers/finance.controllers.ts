import { RequestHandler } from "express";
import Account from "../models/account.model";
import Transaction from "../models/transaction.model";
import generateUniqueTransactionId from "../util/generateUniqueTransactionId";
import User from "../models/user.model";
import cloudinary from "../util/cloudinary";

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
            transactionId: generateUniqueTransactionId
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

        const acc = await Account.find({ accountId: user.accountId })

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

        const allTransactions = await Transaction.find({ accountId: accountId })

        res.status(200).json(allTransactions)
    } catch (error) {
        console.log(error);
    }
}

export const addIncomeExpenseCategory: RequestHandler = async (req, res, next) => {
    const { name, image, accountId } = req.body

    try {
        const result = await cloudinary.uploader.upload(image, {
            folder: 'transaction_category_images',
        })

        await Account.updateOne({ accountId: accountId }, {
            $push: {
                expenseCategories: {
                    name: name,
                    image: {
                        public_id: result.public_id,
                        url: result.secure_url
                    }
                }
            }
        })

    } catch (error) {
        console.log(error);
        next(error)
    }
}