import express from 'express'
import * as FinanceControllers from '../controllers/finance.controllers'

const router = express.Router()

router.get('/getBalance/:accountId', FinanceControllers.getBalance)

router.post('/setBalance', FinanceControllers.setBalance)

export default router