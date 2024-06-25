import React from 'react'
import {  useState } from 'react';
import { FaEdit, FaHeart, FaEye, FaSearch, FaPlusCircle, FaSignOutAlt ,FaTrashAlt } from 'react-icons/fa';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {SignOutUserFailure,SignOutUserStart,SignOutUserSuccess, deleteUserFailure,deleteUserStart,deleteUserSuccess} from '../redux/user/userSlice';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProfileNav() {

  const dispatch = useDispatch();

  const {currentUser} = useSelector((state)=> state.user);


  const handleSignOut = async ()=>{
    try {
      dispatch(SignOutUserStart());
     const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success == false){
       dispatch(SignOutUserFailure(data.message));
       toast(data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
        return;
      }
      dispatch(SignOutUserSuccess(data));
      toast("Signout successfully", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      dispatch(SignOutUserFailure (data.message));
    }
  };

  const handleDelete = async ()=>{
    try {
      dispatch(SignOutUserStart());
     const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success == false){
       dispatch(SignOutUserFailure(data.message));
       toast(data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
        return;
      }
      dispatch(SignOutUserSuccess(data));
      toast("Temporary Delete successfully", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      dispatch(SignOutUserFailure (data.message));
    }
  };

  // const handleDeleteUser = async ()=>{
  //   try {
  //     dispatch(deleteUserStart());
  //    const res = await fetch(`/api/user/delete/${currentUser._id}`, 
  //     {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     const data = await res.json();
  //     if(data.success == false){
  //      dispatch(deleteUserFailure(data.message));
  //      toast(data.message, {
  //       position: "top-center",
  //       autoClose: 1500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //       return;
  //     }
  //     dispatch(deleteUserSuccess(data));
  //     toast("Delete successfully", {
  //       position: "top-center",
  //       autoClose: 1500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   } catch (error) {
  //     dispatch(deleteUserFailure(error.message));
  //   }
  // };


  return (

    <div className='p-7  flex-wrap border-b-2 md:border-r-2 md:min-h-screen md:w-1/4 bg-[#ECF2FF] shadow-lg shadow-slate-400'>

    <div className="flex flex-col gap-4 items-center">
     <img
       src={currentUser.avatar}
       aria-label="placeholder profile"
       alt="Prutha Vithani profile"
       className="rounded-full h-10 w-10 object-cover cursor-pointer self-center mt-2"
     />
     </div>

     <div className="flex flex-col gap-2 items-center">
       <div
         className="text-center align-center text-gray-800 font-bold"
       >
         {currentUser.username}
       </div>
       
       <div
         className="text-sm text-gray-600  font-bold font-serif"
       >
         {currentUser.userType}
       </div>
       </div>

 <nav className="nav flex-column mt-5">
   <ul className="space-y-2">
     <li>
           <div className="w-6 h-6">
         </div>
         <Link className="text-sm text-gray-600 font-bold font-serif"   to={"/profile"}> <FaEdit className='inline-block mr-2 text-xl text-slate-500'/> Edit Profile</Link>
     </li>
     <div className="border border-gray-300"></div>

     <li>
           <div className="w-6 h-6">
         </div>
         <Link className="text-sm text-gray-600  font-bold font-serif"  to={"/post-listing/create-account"}> <FaPlusCircle className='inline-block mr-2 text-xl text-slate-500' />Post Property</Link>
        
     </li>
     <div className="border border-gray-300"></div>

     <li>
           <div className="w-6 h-6">
         </div>
         <Link className="text-sm text-gray-600  font-bold font-serif" to={"/profile/saved-home"} > <FaHeart className='inline-block mr-2 text-xl text-slate-500' /> Saved Homes</Link>
     </li>
     <div className="border border-gray-300"></div>

     <li>
           <div className="w-6 h-6">
         </div>
         <Link className="text-sm text-gray-600  font-bold font-serif" to={"/profile/show-userList"}> <FaEye className='inline-block mr-2 text-xl text-slate-500' /> Show your Listing</Link>
     </li>
     <div className="border border-gray-300"></div>

     <li>
           <div className="w-6 h-6">
         </div>
         <Link className="text-sm text-gray-600  font-bold font-serif" to={"/profile/show-loan"}> <FaEye className='inline-block mr-2 text-xl text-slate-500' />Loan Applicant History</Link>
     </li>
     <div className="border border-gray-300"></div>

        <li>
           <div className="w-6 h-6">
         </div>
         <Link onClick={handleSignOut}  className="text-sm text-gray-600  font-bold font-serif"> <FaSignOutAlt className='inline-block mr-2 text-xl text-slate-500' />Sign Out</Link>
         </li>
     <div className="border border-gray-300"></div>

     <li>
     <div className="w-6 h-6">
         </div>
         <Link onClick={handleDelete}  className="text-sm text-gray-600  font-bold font-serif"> <FaTrashAlt  className='inline-block mr-2 text-xl text-slate-500' />Delete Account</Link>
         </li>
         
     <div className="border border-gray-300"></div>
    
   </ul>
 </nav>
</div> 
  )
}

export default ProfileNav