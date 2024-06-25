import React, { useState , userRef , useEffect} from 'react'
import { useSelector } from 'react-redux';
import {useParams} from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import Contact from '../../components/Contact';
import location from "../../assets/image/location.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from 'timeago.js';
import ActionDialog from './ActionDialog';
import AdminNav from './AdminNav';
import AdminHeader from './AdminHeader';

function LoanDetail() {
    const {currentUser} = useSelector((state)=> state.user);

    const [loan, setloan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const params = useParams();

    useEffect(() => {
        const fetchloan = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/loan/get/${params.loanId}`);
                const data = await res.json();
                if(data.success === false){
                    setError(true);
                    setLoading(false);
                    return;
                }
                setloan(data);
                console.log(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
                
            }
        }
        fetchloan();
    }, [params.loanId]);

    const handleUpdateAction = (formData) => {
      console.log(formData); // You can perform the action here (e.g., update the loan status)
      toast.success('Action updated successfully!');
      // Close the dialog
      setShowDialog(false);
  };

  return  ( 
    <>
    <div className='flex flex-col md:flex-row  text-white'>
      <AdminNav />
      <div className='w-full'>
        <AdminHeader />

    {loading && <p className='text-center my-7 text-2xl text-[#8EACCD]'>Loading...</p>}
    {error && <p className='text-center my-7 text-2xl'>Something went wrong</p>}
    {loan && !loading && !error && (
    
    <div className='shadow-2xl shadow-slate-600 md:min-h-screen p-1 bg-gray-900'>

  
          <div className='flex flex-col max-w-7xl mx-auto my-7 gap-4 p-3'>
           
          <div className='flex items-center gap-2'>
                                    {/* Display user avatar here */}
          {loan.userRef.avatar && <img src={loan.userRef.avatar} alt="User Avatar" className="h-28 w-28 rounded-full mr-7" />}

          <h1 className='font-bold text-xl text-white'>Application Number :  {loan.id}</h1>
        
                <button
                onClick={() => setShowDialog(true)}
                className="w-96 ml-96 text-xl bg-[#88AB8E] text-[#064420] hover:bg-white border hover:border-[#88AB8E] hover:text-[#88AB8E] font-bold py-2 px-4 rounded mt-4"
              >
                Take Action
              </button>
            </div>
                        <ActionDialog
                            open={showDialog} // Pass the state to control the dialog visibility
                            onClose={() => setShowDialog(false)} // Function to close the dialog
                            onUpdate={handleUpdateAction} // Function to handle the update action
                        />
    

    <div className="grid grid-cols-3 gap-4">
     
          <div className="col-span-1 bg-gray-800 p-3 rounded-lg flex flex-row">
            <p className="text-gray-500 w-32 font-bold">Full Name</p>
           
            <p className="text-white font-bold">{loan.fullname}</p>
          </div>

          <div className="col-span-1 bg-gray-800 p-3 rounded-lg flex flex-row">
            <p className="text-gray-500 w-32 font-bold">Mobile No</p>
           
            <p className="text-white font-bold">{loan.mobileno}</p>
          </div>

          <div className="col-span-1 bg-gray-800 p-3 rounded-lg flex flex-row">
            <p className="text-gray-500 w-32 font-bold">Email Id</p>
           
            <p className="text-white font-bold">{loan.email}</p>
          </div>

          <div className="col-span-1 bg-gray-800 p-3 rounded-lg flex flex-row">
            <p className="text-gray-500 w-32 font-bold">Birth Date</p>
            <p className="text-white font-bold">{loan.birthDate}</p>
          </div>

          <div className="col-span-2 bg-gray-800 p-3 rounded-lg flex flex-row">
            <p className="text-gray-500 w-32 font-bold">Address</p>
           
            <p className="text-white font-bold">{loan.address}</p>
          </div>

          <div className="col-span-1 bg-gray-800 p-3 rounded-lg flex flex-row">
            <p className="text-gray-500 w-32 font-bold">State</p>
           
            <p className="text-white font-bold">{loan.state}</p>
          </div>

          <div className="col-span-1 bg-gray-800 p-3 rounded-lg flex flex-row">
            <p className="text-gray-500 w-32 font-bold">City</p>
           
            <p className="text-white font-bold">{loan.city}</p>
          </div>

          <div className="col-span-1 bg-gray-800 p-3 rounded-lg flex flex-row">
            <p className="text-gray-500 w-32 font-bold">Zip Code</p>
           
            <p className="text-white font-bold">{loan.zipCode}</p>
          </div>
  
      </div>

      <h1 className='font-bold text-xl text-white'>Work/Job Information</h1>

      <div className="grid grid-cols-3 gap-4">
     
     <div className="col-span-1 bg-gray-800 p-3 rounded-lg flex flex-row">
       <p className="text-gray-500 w-32 font-bold ">Title</p>
      
       <p className="text-white font-bold">{loan.jobTitle}</p>
     </div>

     <div className="col-span-2 bg-gray-800 p-3 rounded-lg flex flex-row">
       <p className="text-gray-500 w-32 font-bold">Address</p>
      
       <p className="text-white font-bold">{loan.jobAddress}</p>
     </div>

     <div className="col-span-1 bg-gray-800 p-3 rounded-lg flex flex-row">
       <p className="text-gray-500 w-32 font-bold">State</p>
      
       <p className="text-white font-bold">{loan.jobState}</p>
     </div>

     <div className="col-span-1 bg-gray-800 p-3 rounded-lg flex flex-row">
       <p className="text-gray-500 w-32 font-bold">City</p>
      
       <p className="text-white font-bold">{loan.jobCity}</p>
     </div>

     <div className="col-span-1 bg-gray-800 p-3 rounded-lg flex flex-row">
       <p className="text-gray-500 w-32 font-bold">Zip Code</p>
      
       <p className="text-white font-bold">{loan.jobZipCode}</p>
     </div>

 </div>

 <h1 className='font-bold text-xl text-white'>Loan Detail</h1>


 <div className="grid grid-cols-3 gap-4">

     <div className="col-span-1 bg-gray-800 p-3 rounded-lg flex flex-row">
       <p className="text-gray-500 w-32 font-bold">Monthly Income</p>
      
       <p className="text-white font-bold">{loan.monthlyNetIncome}</p>
     </div>

     <div className="col-span-1 bg-gray-800 p-3 rounded-lg flex flex-row">
       <p className="text-gray-500 w-32 font-bold">Credit Score</p>
      
       <p className="text-white font-bold">{loan.creditScore}</p>
     </div>

     <div className="col-span-1 bg-gray-800 p-3 rounded-lg flex flex-row">
       <p className="text-gray-500 w-32 font-bold">Expected Tenure</p>
      
       <p className="text-white font-bold">{loan.terms}</p>
     </div>

     <div className="col-span-1 bg-gray-800 p-3 rounded-lg flex flex-row">
       <p className="text-gray-500 w-32 font-bold">Expected Loan Amount</p>
      
       <p className="text-white font-bold">{loan.requestedLoanAmount}</p>
     </div>

     <div className="col-span-1 bg-gray-800 p-3 rounded-lg flex flex-row">
       <p className="text-gray-500 w-32 font-bold">Zip Code</p>
      
       <p className="text-white font-bold">{loan.zipCode}</p>
     </div>

     <div className="col-span-1 bg-gray-800 p-3 rounded-lg flex flex-row">
       <p className="text-gray-400 w-32">Issue Date</p>
      
        <div className=" grid grid-rows-2 gap-1"> {/* Add a div for flex layout */}
        <p className="text-white font-bold">{new Date(loan.createdAt).toLocaleDateString()}</p> {/* Render date */}
        <p className="text-white font-bold">{new Date(loan.createdAt).toLocaleTimeString()}</p> {/* Render time */}
    </div>
</div>

 </div>
            <h1 className='font-bold text-xl text-white'>Contact Applicant</h1>
  
    {currentUser && loan.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-[#2D3250] text-white font-bold rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact Applicant
              </button>
            )}
            {contact && <Contact loan={loan} />}

    </div>
    </div>
   )}

   </div>
   </div>


  </>
  );
}


export default LoanDetail;