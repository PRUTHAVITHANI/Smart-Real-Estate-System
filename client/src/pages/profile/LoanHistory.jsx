
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { format } from 'timeago.js';
import ProfileNav from '../../components/ProfileNav'
import { FaEye } from "react-icons/fa";

function LoanHistory() {
  const [userLoan, setuserLoan] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch user listings when the component mounts
    handleShowLoan();
  }, [currentUser]); // Include currentUser in the dependency array

  const handleShowLoan = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/loans/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        toast(data.message, {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      setuserLoan(data);
      toast('Show Listing', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      setShowListingsError(true);
    }
  };


  return (
    
<div className='flex flex-col md:flex-row'>
    <ProfileNav/>
    <div className='flex-1'>
          <div className="md:min-h-screen p-4  bg-[#F3F8FF]">
            <h1 className="text-center text-5xl font-mono font-semibold text-[#435585] mt-4 mb-4">
            Loan Application History
            </h1>
            <div>
            
            </div>
            <div className="flex flex-row">
              <p className="text-red-700 mt-5">
                {showListingsError ? 'Error showing listings' : ''}
              </p>
            </div>
            {userLoan && userLoan.length > 0 && (
              <div className="flex col-span-3 flex-auto w-full">
                <table className="w-full  table-auto border-separate border-spacing-1 border-gray-400 bg-[#435585] text-white">
                  <thead className="rounded">
                    <tr className="bg-white text-black">
                      <th className="border border-gray-400 px-4 py-2 text-lg">
                        S.No
                      </th>
                      <th className="border border-gray-400 px-4 py-2 text-lg">
                        Application No
                      </th>
                      <th className="border border-gray-400 px-4 py-2 text-lg">
                        Name
                      </th>
                      <th className="border border-gray-400 px-4 py-2 text-lg">
                        Mobile Number
                      </th>
                      <th className="border border-gray-400 px-4 py-2 text-lg">
                        Created At
                      </th>
                      <th className="border border-gray-400 px-4 py-2 text-lg">
                        Status
                      </th>
                      <th className="border border-gray-400 px-4 py-2 text-lg">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userLoan.map((loan, index) => (
                      <tr key={loan._id} className="">
                
                <td className="border border-gray-400 px-4 py-2 text-center text-lg">
      {index + 1}
    </td>
                        <td className="border border-gray-400 px-4 py-2 text-center text-lg">
            {loan.id}
                        </td>

                        <td className="border border-gray-400 px-4 py-2 text-center text-lg">
            {loan.fullname}
                        </td>
                        <td className="border border-gray-400 px-4 py-2 text-center text-lg">
                          {loan.mobileno}
                        </td>
                        <td className="border border-gray-400 px-4 py-2 text-center text-lg">
                          {format(loan?.createdAt)}
                        </td>
                  
                        <td className="border border-gray-400 px-4 py-2 text-center">
  <p
    className={`text-sm font-semibold rounded ${
      loan.status === 'Approved' ? 'bg-[#009378] text-[#114232]' : 
      loan.status === 'Reject' ? 'bg-[#CE5A67] text-[#5D0E41]' : 
      'bg-[#FEEFAD] text-[#C0B236]'
    }`} 
  >
    {loan.status}
  </p>
</td>


                            
                        <td className="border border-gray-400 px-4 py-2 text-center">
                          <Link to={`/profile/loan-detail/${loan._id}`}>
                            <button className="">
                            <FaEye />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
     


    </div>
    </div>
  )
}

export default LoanHistory;