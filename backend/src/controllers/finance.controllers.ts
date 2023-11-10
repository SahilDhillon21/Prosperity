import { RequestHandler } from "express";
import Account from "../models/account.model";
import Transaction from "../models/transaction.model";
import generateUniqueTransactionId from "../util/generateUniqueTransactionId";

export const getBalance: RequestHandler = async (req, res) => {
    const accountId = req.params.accountId

    try {
        const account = await Account.findOne({ accountId: accountId })

        console.log("account id: "+accountId);

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
        await Account.updateOne({ accountNumber: accountId }, {
            $set: {
                balance: amount
            }
        })

        const newTransaction = await Transaction.create({
            category: "Update balance",
            accountId: accountId,
            type: "Update",
            amount: amount,
            transactionId: generateUniqueTransactionId
        })


        res.status(200).json(newTransaction)
    } catch (error) {
        console.log(error);
    }
}