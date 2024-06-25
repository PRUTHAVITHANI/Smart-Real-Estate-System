import express from 'express';
import {createProperty , getProperty ,deleteProperty , getProperties ,updateProperty , approveProperty,searchProperty, rejectProperty} from '../controllers/property.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createProperty);
router.delete('/delete/:id' , verifyToken, deleteProperty);
router.post('/update/:id' , verifyToken, updateProperty);
router.get('/search' , verifyToken, searchProperty);
router.get('/get/:id' , getProperty);
router.get('/get' , getProperties);
router.put('/approve/:id', verifyToken, approveProperty); 
router.put('/reject/:id', verifyToken, rejectProperty); 

export default router;  
