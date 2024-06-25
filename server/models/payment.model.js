import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  userRef: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'User',
    default: '66305cce5ccf44d65f5c6184'
},
propertyRef: {
  type: mongoose.Schema.Types.Mixed,
  ref: 'Property',
  default: '65ef177d976c62fc2e003ad3'
},

}, {timestamps: true });

export const Payment = mongoose.model("Payment", paymentSchema);