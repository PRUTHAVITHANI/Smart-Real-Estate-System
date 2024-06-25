import React from 'react'
import {  useState } from 'react';
import {useSelector} from 'react-redux';
import {Link , useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {SignOutUserFailure,SignOutUserStart,SignOutUserSuccess} from '../../redux/user/userSlice';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../../assets/image/logo.png";
import { RiHandCoinLine } from "react-icons/ri";
import { FaSignOutAlt ,  FaHome} from 'react-icons/fa';
import { PiSquaresFourBold } from "react-icons/pi";
import { LuUsers2 } from "react-icons/lu";
import { FaHandHoldingUsd } from "react-icons/fa";
import { AiTwotoneDollarCircle } from "react-icons/ai";


function AdminNav() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate("/sign-in");
    } catch (error) {
      dispatch(SignOutUserFailure (data.message));
    }
  };

  return (
    <>
    <div className='p-7 h-auto border-b-2 border-[#EEEEEE] md:border-r-2 md:min-h-screen md:w-1/4 bg-gray-800 shadow-lg shadow-[#354259]'>

      <nav className="nav flex-column">

        <div className="flex items-center p-3 mb-6">
          <img src={img} alt="" className="h-15 w-15" />
          <Link to="/admin/adminDashboard">
            <h1 className="font-bold text-medium sm:text-3xl ml-4">
              <span className="text-[#DBDFEA] font-bold">Vithani</span>
              <span className="text-[#DBDFEA] font-bold">Estate</span>
            </h1>
          </Link>
        </div>

        <ul className="space-y-2">

          <div className='flex flex-col-2 mb-2 '>
            <div className='justify-between mt-3'><PiSquaresFourBold className='inline-block mr-2 text-xl h-8 w-8 text-[#DBDFEA]' /></div>
            <div className='ml-5 mt-4'> <Link className=" text-lg text-[#DBDFEA] font-bold font-serif" to="/admin/adminDashboard">
              Dashboard
           </Link></div>

          </div>
          <div className="border border-gray-300 mb-4"></div>

          <div className='flex flex-col-2 mb-2'>
            <div className='justify-between mt-3'> <LuUsers2 className='inline-block mr-2 text-xl h-8 w-8 text-[#DBDFEA]' /></div>
            <div className='ml-5 mt-4'>   <Link className="text-lg text-[#DBDFEA] font-bold font-serif" to="/admin/user">Manage Users</Link></div>

          </div>
          <div className="border border-gray-300 mb-4 mt-8"></div>

          <div className='flex flex-col-2 mb-2'>
            <div className='justify-between mt-3'><FaHome className='inline-block mr-2 text-xl h-8 w-8 text-[#DBDFEA]' /></div>
            <div className='ml-5 mt-4'>   <Link className="text-lg text-[#DBDFEA] font-bold font-serif" to="/admin/property" >Manage Property</Link></div>

          </div>

          <div className="border border-gray-300 mb-4"></div>

          <div className='flex flex-col-2 mb-2'>
            <div className='justify-between mt-3'><AiTwotoneDollarCircle className='inline-block mr-2 text-xl h-8 w-8 text-[#DBDFEA]' /></div>
            <div className='ml-5 mt-4'>   <Link className="text-lg text-[#DBDFEA] font-bold font-serif" to="/admin/home-loan" >Manage Loan</Link></div>

          </div>

          <div className="border border-gray-300 mb-4"></div>

      <div className='flex flex-col-2 mb-2'>
            <div className='justify-between mt-3'><FaHandHoldingUsd className='inline-block mr-2 text-xl h-8 w-8 text-[#DBDFEA]' /></div>
            <div className='ml-5 mt-4'>   <Link className="text-lg text-[#DBDFEA] font-bold font-serif" to="/admin/payment" >Manage Payment</Link></div>

          </div>

          <div className="border border-gray-300 mb-4"></div>

          <div className='flex flex-col-2 mb-2'>
            <div className='justify-between mt-3'><FaSignOutAlt className='inline-block mr-2 text-xl h-8 w-8 text-[#DBDFEA]' /></div>
            <div className='ml-5 mt-4'> <Link onClick={handleSignOut} className="text-lg text-[#DBDFEA] font-bold font-serif">Sign Out</Link></div>

          </div>

          <div className="border border-gray-300 mb-4"></div>

        </ul>
      </nav>
    </div> </>


  )
}

export default AdminNav;