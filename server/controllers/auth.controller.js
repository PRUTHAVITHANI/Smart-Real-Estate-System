import User from '../models/user.model.js';
import Admin from '../models/admin.model.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from "jsonwebtoken";


import nodemailer from "nodemailer";
let otpSent = "";

const otpGenerator = () => {
  const numbers = '0123456789';

  let otp = "";

  for (let i = 0; i < 6; i++) {
    otp += numbers[Math.floor(Math.random() * 10)];
  }

  return otp;

}

const sendmail = (email) => {

  // sending mail 
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'pruthavithani5889@gmail.com',
      pass: 'xozzmdjlzrcnbdbp',
    },
  });

  // Define email options
  otpSent = otpGenerator();
  console.log(email);
  console.log(otpSent);
  // console.log(otp)
  const mailOptions = {
    from: 'pruthavithani5889@gmail.com',
    to: email,
    subject: 'OTP',
    html: `<div> Your otp is : <h1>` + otpSent + `</h1> </div>`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}


export const generateOTP = async (req, res) => {
  try {

    console.log(req.body);

    const dbemail = await User.findOne({ email: req.body.email });
    if (dbemail) {
      throw new Error("Email Address already exists")
    }

    // console.log("dbemail", dbemail);

    // sendmail(req.body.email)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'pruthavithani5889@gmail.com',
        pass: 'xozzmdjlzrcnbdbp',
      },
    });


    // Define email options
    otpSent = otpGenerator();
    console.log(otpSent)
    const mailOptions = {
      from: 'pruthavithani5889@gmail.com',
      to: req.body.email,
      subject: 'OTP',
      html: `<div> Your otp is : <h1>` + otpSent + `</h1> </div>`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });

    res.json({ message: "OTP has been sent to you", success: true });

  } catch (err) {
    res.json({ message: err.message, success: false })
  }
}


export const signup = async (req,res ,next) => {
    const { username , email , password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({ username , email , password: hashedPassword });

    try{
        await newUser.save();
        res.status(201).json("User created successfully!")
    }
    catch(error){
      next(error);
    } 
}

export const signin = async (req,res ,next) => {
  const { email , password } = req.body;
  
  try{
    const validUser = await User.findOne({ email:email });
    if(!validUser) return next(errorHandler(404, "User Not Found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if(!validPassword) return next(errorHandler(401, "Wrong credential!")); 
    const token = jwt.sign({id: validUser._id} , process.env.JWT_SECRET);
    const {password: Pass, ...rest} = validUser._doc;
    res
    .cookie('access_token' , token , {httpOnly: true})
    .status(200)
    .json(rest);
  }
  catch(error){
    next(error);
  } 
};

export const forgetPassword = async (req, res, next) => {
  try {
    const validUser = await User.findOne({ email: req.body.email }); // Updated to use req.body.email
    if (!validUser) return next(errorHandler(404, "User Not Found!"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'pruthavithani5889@gmail.com',
        pass: 'xozzmdjlzrcnbdbp',
      },
    });

    const mailOptions = {
      from: 'pruthavithani5889@gmail.com',
      to: req.body.email, // Updated to use req.body.email
      subject: 'Reset your password',
      text: `http://localhost:5173/reset_password/${validUser._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return next(error); // Call next with the error in case of failure
      } else {
        // Set the cookie before sending the response
        res.cookie('access_token', token, { httpOnly: true });
        return res.status(200).send({ Status: "Success" });
      }
    });
  } catch (error) {
    next(error);
  }
};
     


export const resetPassword = async (req, res , next) => {

  try {
      if(req.body.password){
          req.body.password = bcryptjs.hashSync(req.body.password, 10)
      }

      const updateUser = await User.findByIdAndUpdate(req.params.id,{
          $set: {
              password: req.body.password,
          },
      }, {new: true} )

      const {password, ...rest} = updateUser._doc
      res.status(200).json(rest);
  } catch (error) {
      next(error)
      
  }
}


export const adminLogin = async (req,res ,next) => {
  const { email , password } = req.body;
  
  try{
    const validUser = await Admin.findOne({ email:email });
    if(!validUser) return next(errorHandler(404, "Admin Not Found!"));

    if (password !== validUser.password) {
      return next(errorHandler(401, "Wrong credential!"));
    }

    const token = jwt.sign({id: validUser._id} , process.env.JWT_SECRET);
    const {password: Pass, ...rest} = validUser._doc;
    res
    .cookie('access_token' , token , {httpOnly: true})
    .status(200)
    .json(rest);
    
  }
  catch(error){
    next(error);
  } 
};

export const google = async (req,res, next) => {
  try {
    const user = await User.findOne({email: req.body.email})
    if(user){
      const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
      const {password: Pass, ...rest} = user._doc;
      res
      .cookie('access_token' , token , {httpOnly: true})
      .status(200)
      .json(rest);
      
    }
    else{
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
      const newUser = new User({ username:req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4)  , email:req.body.email , password: hashedPassword, avatar: req.body.photo });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id} , process.env.JWT_SECRET);
      const {password: Pass, ...rest} = newUser._doc;
      res
      .cookie('access_token' , token , {httpOnly: true})
      .status(200)
      .json(rest);
      

    }
  } catch (error) {
    next(error)
    
  }
}

export const signOut = async (req,res ,next) => {
  try{
      res.clearCookie('access_token');
      res.status(200).json('User has been logged out!')
  }
  catch(error){
    next(error);
  } 
}