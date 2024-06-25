
import Property from '../models/property.model.js';
import nodemailer from "nodemailer";
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const createProperty = async (req, res, next) => {
  try {
      const id = Math.random().toString(36).substring(2, 8).toUpperCase();

      const propertyData = { ...req.body, id };

      const property = await Property.create(propertyData);

      return res.status(201).json(property);
  } catch (error) {
      next(error);
  }
}

export const getProperty = async(req, res, next) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate({
        path: 'userRef',
        select: 'username mobileno email avatar' // Specify the fields to retrieve from the userRef
      });

    if (!property) {
      return next(errorHandler(404, 'Property not found!'));
    }
  
    return res.status(201).json(property);
  } catch(error) {
    next(error);
  } 
}


export const updateProperty = async(req,res,next) => {
  const property = await Property.findById(req.params.id);
  if(!property){
    return next(errorHandler(404, 'Listing not found!'));
  }
  if(req.user.id !== property.userRef){
    return next(errorHandler(401, "You can only update your own listings!"))
  }
  try {

      const updatedProperty = await Property.findByIdAndUpdate(
         req.params.id,
         req.body,
        {new: true} )

      res.status(200).json(updatedProperty);
  } catch (error) {
      next(error)
  }
}

export const deleteProperty = async (req,res ,next) => {
  const property = await Property.findById(req.params.id);
  if(!property){
    return next(errorHandler(404, 'property not found!'));
  }
  if(req.user.id !== property.userRef){
    return next(errorHandler(401, "You can only delete your own properties!"))
  }
  try{
    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json('property has been deleted!')
  }
  catch(error){
    next(error);
  } 
}


const sendApprovalEmail = async (recipientEmail) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'pruthavithani5889@gmail.com',
      pass: 'xozzmdjlzrcnbdbp',
    },
  });

  // Email content
  const mailOptions = {
    from: 'pruthavithani5889@gmail.com',
    to: recipientEmail,
    subject: 'Property Approval Notification',
    text: 'Congratulations! Your property has been approved by the admin.', // Customize your message here
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};


const sendRejectionEmail = async (recipientEmail) => {
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'pruthavithani5889@gmail.com',
      pass: 'xozzmdjlzrcnbdbp',
    },
  });

  // Email content
  const mailOptions = {
      from: 'pruthavithani5889@gmail.com', // Your email
      to: recipientEmail,
      subject: 'Property Rejection Notification',
      text: 'Your property has been rejected by the admin.' // You can customize the message here
  };

  try {
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ', info.response);
  } catch (error) {
      console.error('Error sending email: ', error);
  }
};

export const approveProperty = async (req, res, next) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );

    // Check if property is defined
    if (!property) {
      return next(errorHandler(404, 'Property not found!'));
    }

    // Log the property object to console
    console.log('Property Object:', property);

    // Fetch the user associated with the property
    const user = await User.findById(property.userRef);

    // Check if user is defined
    if (!user) {
      console.error('User not found for property:', property._id);
      return next(errorHandler(404, 'User not found!'));
    }

    // Get the email address of the user
    const recipientEmail = user.email;

    // Send approval email to the property owner
    await sendApprovalEmail(recipientEmail);

    // Return approved property
    res.status(200).json(property);
  } catch (error) {
    console.error('Error approving property:', error);
    next(error);
  }
};



export const rejectProperty = async (req, res, next) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return next(errorHandler(404, 'Property not found!'));
    }

    // Get the email address of the property owner
    const recipientEmail = property.userRef;

    // Send email to property owner
    await sendRejectionEmail(recipientEmail);

    // Respond to request
    res.status(200).json('Property has been rejected and deleted!');
  } catch (error) {
    next(error);
  }
};
export const getProperties = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let propertyFor = req.query.propertyFor;
    let saleType = req.query.saleType;

    if (propertyFor === undefined) {
      propertyFor = { $in: ['sell', 'rent'] };
    }

    if (saleType === undefined) {
      saleType = { $in: ['Resale Property', 'New Property'] };
    }

    let searchTerm = req.query.searchTerm || '';

    let sort = req.query.sort || 'createdAt';

    let order = req.query.order || 'desc';
    let maxSuperArea = req.query.maxSuperArea || Number.MAX_SAFE_INTEGER;
    let minSuperArea;

    if (maxSuperArea === 5000) {
      minSuperArea = 0;
    } else {
      minSuperArea = req.query.minSuperArea || 0;
    }

    let properties = await Property.find({
      $or: [
        { propertyType: { $regex: searchTerm, $options: 'i' } },
        { locality: { $regex: searchTerm, $options: 'i' } },
      ],
      propertyFor,
      saleType,
      superArea: { $lte: maxSuperArea, $gte: minSuperArea },
    })
      .populate({
        path: 'userRef',
        select: 'username mobileno email' // Specify the fields to retrieve from the userRef
      })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    // Check if userRef exists and is not null before populating username
    properties = properties.map(property => ({
      ...property.toObject(),
      status: property.approved ? 'approved' : property.rejected ? 'rejected' : 'pending',
      username: property.userRef ? property.userRef.username : 'Admin', 
      email: property.userRef ? property.userRef.email : 'prutha@gmail.com', 
      mobileno: property.userRef ? property.userRef.mobileno : '6353797920' // Get mobileNo if userRef exists
    }));

    return res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

export const searchProperty = async (req, res, next) => {
  const { query } = req.query;

  try {
    let properties = await Property.find({
      $or: [
        { locality: { $regex: new RegExp(query, 'i') } },
        { username: { $regex: new RegExp(query, 'i') } },
        { mobileno: { $regex: new RegExp(query, 'i') } },
      ],
    })
      .populate({
        path: 'userRef',
        select: 'username mobileno' // Specify the fields to retrieve from the userRef
      }); 

    // Check if userRef exists and is not null before populating username
    properties = properties.map(property => ({
      ...property.toObject(),
      status: property.approved ? 'approved' : property.rejected ? 'rejected' : 'pending',
      username: property.userRef ? property.userRef.username : 'Admin', 
      email: property.userRef ? property.userRef.email : 'prutha@gmail.com', 
      mobileno: property.userRef ? property.userRef.mobileno : '6353797920' // Get mobileNo if userRef exists
    }));

    return res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};
