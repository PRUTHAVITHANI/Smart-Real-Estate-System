import  Wishlist from "../models/wishlist.model.js";

export const addToWishList = async (req, res) => {
  try {

    const userId = req.body.userId;

    const propertyId = req.body.propertyId;

    let wishlistedProd = await Wishlist.findOne({ userId: userId });


    if (!wishlistedProd) {
      let addToWishList = new Wishlist({
        userId: userId,

        wishlist: [propertyId]
      });



      await addToWishList.save();
      return res.send({ message: "property added to wishlist", success: true });

    }



    wishlistedProd.wishlist.push(propertyId);


    await wishlistedProd.save();
    res.json({ message: "property added to wishlist", success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

export const deleteFromWishlist = async (req, res) => {
  try {
    // console.log(req.params);
    const { userId, propertyId } = req.params;
    const deleted = await Wishlist.findOneAndUpdate(
      { userId: userId },
      { $pull: { wishlist: propertyId } },
      { safe: true }
    ).clone();


    if (!deleted) {
      throw new Error("Something went wront")
    }
    res.json({ message: "deleted from wishlist", success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};


export const isPropertyWishlisted = async (req, res) => {
  try {
    const { userId, propertyId } = req.params;

    const property = await Wishlist.findOne({ userId: userId, wishlist: propertyId });

    if (!property) {
      return res.json({ isWishlisted: false });
    } else {
      return res.json({ isWishlisted: true });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};



export const getAllWishlist = async (req, res) => {
  try {
    // console.log(req.params);
    const properties = await Wishlist.find({ userId: req.params.userId }).populate({
      path: 'wishlist',
      model: 'Property',
    }).exec();

    if (properties.length == 0) {
      throw new Error("Wishlist is empty");
    }

    // console.log(properties[0].wishlist)

    res.json({ properties: properties[0].wishlist, success: true })

  } catch (error) {
    res.json({ message: error.message, success: false })
  }
};



