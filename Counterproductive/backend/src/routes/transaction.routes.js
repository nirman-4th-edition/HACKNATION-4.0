import { Router } from 'express';
import { 
    createTransaction, 
    getTransactions, 
    updateTransactionStatus 
} from '../controllers/transaction.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/transactions').post(verifyJWT, createTransaction);

router.route('/transactions').get(verifyJWT, getTransactions);

router.route('/transactions-status').put(verifyJWT, updateTransactionStatus);

export default router;