import express from "express";
import {deleteUser, test, updateUser ,getUserListings, getUser , getAllUsers , searchUser , getUserLoan , getAllNotification } from '../controllers/user.controller.js'
import { verifyToken , verifyAdmin} from "../utils/verifyUser.js";

const router = express.Router();

router.get('/test' , test);
router.get('/get' , verifyToken , getAllUsers);  
router.get('/search' , verifyToken , searchUser);  
router.post("/get-all-notification",verifyToken, getAllNotification );
router.post('/update/:id' , verifyToken, updateUser);
router.delete('/delete/:id' ,verifyToken, deleteUser);
router.get('/listings/:id', verifyToken , getUserListings);
router.get('/loans/:id', verifyToken , getUserLoan);
router.get('/:id', verifyToken , getUser);   
   

export default router;