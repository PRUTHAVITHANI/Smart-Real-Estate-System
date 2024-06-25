import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import contactRouter from "./routes/contact.route.js";
import propertyRouter from "./routes/property.route.js";
import loanRouter from "./routes/loan.route.js";
import wishlistRouter from "./routes/wishlist.route.js";
import paymentRouter from "./routes/payment.route.js";
import http from "http";
import Razorpay from "razorpay";

const app = express();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret:process.env.RAZORPAY_API_SECRET,
});

// Middleware and routes setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/contact', contactRouter);
app.use('/api/property', propertyRouter);
app.use('/api/loan', loanRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/payment', paymentRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.get('/api/getkey', (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

const httpServer = http.createServer(app);

const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB!");

    // Start the Node.js server
    const port = process.env.PORT || 5000;
    httpServer.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);

      // Start the Flask server after the Node.js server is running
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

// Start the server after establishing MongoDB connection
startServer();
