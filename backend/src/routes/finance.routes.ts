import express from 'express'
import * as FinanceControllers from '../controllers/finance.controllers'

const router = express.Router()

router.get('/getBalance/:accountId', FinanceControllers.getBalance)

router.post('/setBalance', FinanceControllers.setBalance)

router.post('/createTransaction', FinanceControllers.createTransaction)

router.get('/getCurrentAccount', FinanceControllers.getCurrentAccount)

router.get('/getAllTransactions', FinanceControllers.getAllTransactions)

router.post('/addCategory', FinanceControllers.addIncomeExpenseCategory)

router.get('/getUserGroups', FinanceControllers.getUserGroups)

export default router