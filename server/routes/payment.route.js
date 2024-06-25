import express from "express";
import {
  checkout,
  paymentVerification,
  AllPayment
} from "../controllers/payment.controller.js";


const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);

router.get('/property-payments' , AllPayment);  


export default router;