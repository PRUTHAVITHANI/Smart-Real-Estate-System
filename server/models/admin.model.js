import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  password: {
    type: String,
    required: "Password is required",
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
  avatar: {
    type: String,
    default:"https://p7.hiclipart.com/preview/722/101/213/computer-icons-user-profile-circle-abstract.jpg",
   },
   notification: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
  } , {timestamps: true });


const Admin = mongoose.model("Admin" , adminSchema);

export default Admin;