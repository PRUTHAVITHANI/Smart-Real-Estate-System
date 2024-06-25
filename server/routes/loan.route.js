import express from 'express';
import { createLoan , getLoan , updateLoanStatus , getAllLoans} from '../controllers/loan.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyToken, createLoan);
router.get('/get/:id' , getLoan);
router.get('/get' , verifyToken , getAllLoans);  
router.put('/update-status/:id', verifyToken, updateLoanStatus);

export default router;  