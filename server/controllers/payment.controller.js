import { instance } from "../index.js";
import crypto from "crypto";
import { Payment } from "../models/payment.model.js";
import  User  from '../models/user.model.js';
import  Property  from '../models/property.model.js';

export const checkout = async (req, res) => {
  try {
    const options = {
      amount :Number(req.body.amount * 10),
      currency: "INR",
    };
    
    const order = await instance.orders.create(options);

    console.log(order);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({
      success: false,
      error: "Error during checkout",
    });
  }
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    try {
      // Database operation
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      res.redirect(
        `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } catch (error) {
      // Handle database operation error
      console.error("Error creating payment record:", error);
      res.status(500).json({
        success: false,
        error: "Error creating payment record",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      error: "Invalid signature",
    });
  }
};

export const AllPayment =  async (req, res) => {
  try {
    // Retrieve all payment records with populated user and property details
    const payment = await Payment.find({})
      .populate({
        path: 'userRef',
        model: User,
        select: 'username', // Select only the username field of the user
      })
      .populate({
        path: 'propertyRef',
        model: Property,
        select: 'id bookingAmount', // Select only the id and bookingAmount field of the property
      });

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    console.error('Error fetching property payments:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching property payments',
    });
  }
};
