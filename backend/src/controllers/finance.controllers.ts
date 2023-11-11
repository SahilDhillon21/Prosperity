import { RequestHandler } from "express";
import Account from "../models/account.model";
import Transaction from "../models/transaction.model";
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

        const acc = await Account.updateOne({ accountId: accountId }, updateBalance)

        console.log("account: "+JSON.stringify(acc));
        

        // const newTransaction = await Transaction.create({
        //     category: "Update balance",
        //     accountId: accountId,
        //     type: "Update",
        //     amount: amount,
        //     transactionId: generateUniqueTransactionId
        // })

        // res.status(200).json(newTransaction)
        res.sendStatus(200)

    } catch (error) {
        console.log(error);
    }
}