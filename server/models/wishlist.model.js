import mongoose from "mongoose";

const WishListSchema= new mongoose.Schema({

  userId: {
    type: String,
    ref: 'User',
  },
  
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }]
});


const Wishlist = mongoose.model("Wishlist" , WishListSchema);

export default Wishlist;