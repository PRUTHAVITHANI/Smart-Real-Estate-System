import Loan from '../models/loan.model.js';
import { errorHandler } from '../utils/error.js';
import Admin from '../models/admin.model.js';


export const createLoan = async (req, res, next) => {
  try {
    const loanData = { ...req.body };

    // Create the loan using Loan model
    const loan = await Loan.create(loanData);

    // Get the ObjectID of the newly created loan
    const loanId = loan._id;

    // Construct the notification object
    const notification = {
      type: "apply-loan-request",
      message: `${req.body.fullname} Has Applied For Loan`,
      data: {
        loanId: loanId, // Store the ObjectID of the loan
        name: req.body.fullname,
        onClickPath: "/admin/home-loan",
      },
    };

    // Find all admin users
    const adminUsers = await Admin.find({});

    if (!adminUsers || adminUsers.length === 0) {
      // Handle case where admin users are not found
      return res.status(404).json({ message: 'Admin users not found!' });
    }

    // Update notifications for each admin user
    for (const adminUser of adminUsers) {
      // Check if adminUser.notification is not defined or null, then set it to an empty array
      if (!adminUser.notification) {
        adminUser.notification = [];
      }
      adminUser.notification.push(notification);
      await adminUser.save();
    }

    return res.status(201).json(loan);

  } catch (error) {
    next(error);
  }
};



export const getLoan = async(req, res, next) => {
    try {
      const loan = await Loan.findById(req.params.id)
        .populate({
          path: 'userRef',
          select: 'username mobileno email avatar' // Specify the fields to retrieve from the userRef
        });
  
      if (!loan) {
        return next(errorHandler(404, 'Loan detail not found!'));
      }
    
      return res.status(201).json(loan);
    } catch(error) {
      next(error);
    } 
  }

  export const updateLoanStatus = async (req, res, next) => {
    const { id } = req.params;
    const { status, remark } = req.body;
  
    try {
      // Find the loan by ID
      const loan = await Loan.findById(id);
      if (!loan) {
        return next(errorHandler(404, 'Loan not found!'));
      }
  
      // Update the status and remark
      loan.status = status;
      loan.remark = remark || ''; // If no remark provided, set it to empty string
  
      // Save the updated loan
      await loan.save();
  
      return res.status(200).json({ message: 'Loan status updated successfully!', loan });
    } catch (error) {
      next(error);
    }
  };

  export const getAllLoans = async (req, res, next) => {
    try {
      // Retrieve all users from the database
      const loans = await Loan.find({}); // Ensure you're using the correct model and variable name
      res.status(200).json(loans);
    } catch (error) {
      next(error);
    }
  };
  

