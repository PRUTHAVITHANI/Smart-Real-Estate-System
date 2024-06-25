
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Property from '../models/property.model.js';
import Loan from '../models/loan.model.js';
import Admin from '../models/admin.model.js';


export const test = (req,res) =>{
    res.json({
        message: 'api route is working',
    })
}

export const searchUser = async (req, res, next) => {
    const { query } = req.query;
  
    try {
      const users = await User.find({
        $or: [
          { username: { $regex: new RegExp(query, 'i') } },
          { email: { $regex: new RegExp(query, 'i') } },
          { location: { $regex: new RegExp(query, 'i') } },
        ],
      });
  
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  
export const updateUser = async(req,res,next) => {
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
                userType: req.body.userType,
                location: req.body.location,
                mobileno: req.body.mobileno,
            },
        }, {new: true} )

        const {password, ...rest} = updateUser._doc

        res.status(200).json(rest);
    } catch (error) {
        next(error)
        
    }
}

export const deleteUser = async(req,res,next) => {

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted!')
    } catch (error) {
        next(error); 
    }
}

export const getUserLoan = async (req,res, next) => {

    if(req.user.id === req.params.id){
        try {
            const loans = await Loan.find({userRef: req.params.id });
            res.status(200).json(loans);
        } catch (error) {
            next(error);
        }
    }else{
       return next(errorHandler(401, "You can only View your own loan application!"));
    }
}


export const getUserListings = async (req,res, next) => {

    if(req.user.id === req.params.id){
        try {
            const properties = await Property.find({userRef: req.params.id });
            res.status(200).json(properties);
        } catch (error) {
            next(error);
        }
    }else{
       return next(errorHandler(401, "You can only View your own listings!"));
    }
}


// Example fix in the backend controller
export const getAllUsers = async (req, res, next) => {
    try {
      // Retrieve all users from the database
      const users = await User.find({}); // Ensure you're using the correct model and variable name
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };
  

export const getUser = async (req,res, next) => {
    try {
        
        const user = await User.findById(req.params.id);
     
        if(!user) return next(errorHandler(404, 'User not found!'));
     
        const { password: pass, ...rest } = user._doc;
     
        res.status(200).json(rest);
    } catch (error) {
        next(error);
        
    }
}

export const getAllNotification = async (req, res) => {
  try {
      const users = await Admin.find(); // Fetch all admins
      if (users.length === 0) {
          return res.status(404).json({ message: "No admins found" });
      }
      const admin = users[0]; // Assuming there's only one admin
      const seennotification = admin.seennotification || []; // Initialize seennotification if undefined
      const notification = admin.notification;
      seennotification.push(...notification);
      admin.notification = [];
      admin.seennotification = seennotification;

      const updatedAdmin = await admin.save();
      res.status(200).json({
          success: true,
          message: "All notifications marked as read",
          data: updatedAdmin,
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({
          message: "Error in notification",
          success: false,
          error,
      });
  }
};



