import express from "express";
import { google, signOut, signin,adminLogin, signup, generateOTP , forgetPassword , resetPassword } from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
 
const router = express.Router();

router.post("/generateOTP", generateOTP);
router.post("/signup" , signup);
router.post("/signin" , signin);
router.post('/google', google);
router.get('/signout', signOut);
router.post('/adminLogin', adminLogin);
router.post('/forget-password',verifyToken ,forgetPassword);
router.post('/reset-password/:id' ,verifyToken, resetPassword);

export default router;  