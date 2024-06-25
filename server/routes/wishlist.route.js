import express from "express";;
const router = express.Router();
import  { addToWishList, deleteFromWishlist, getAllWishlist, isPropertyWishlisted } from '../controllers/wishlist.controller.js';

router.route('/addtowishlist').post(addToWishList);
router.route('/getallwishlist/:userId').get(getAllWishlist)
router.route('/deletefromwishlist/:userId/:propertyId').patch(deleteFromWishlist);
router.route('/isPropertyWishlisted/:userId/:propertyId').get(isPropertyWishlisted);



export default router; 