import express from "express";
import { createContact } from '../controllers/contact.controller.js'
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/create' , verifyToken, createContact);

export default router;