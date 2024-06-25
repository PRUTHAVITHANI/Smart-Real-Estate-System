
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { FaEye } from "react-icons/fa";
import AdminNav from './AdminNav';
import AdminHeader from './AdminHeader';

function HomeLoan() {
  const [userLoan, setuserLoan] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);

  useEffect(() => {
    fetchAllLoans();
  }, []);

  const fetchAllLoans = async () => {
    try {
      const res = await fetch("/api/loan/get");
      const data = await res.json();
      if (data.success === true) {
        console.log(data);
        return;
      }
      setuserLoan(data);
    } catch (error) {
      console.log(error);
      setShowListingsError(true);
    }
  };

  console.log("User Loan Data:", userLoan);



  return (
    
<div className='flex flex-col md:flex-row  text-white'>
      <AdminNav />
      <div className='w-full'>
        <AdminHeader />
        <div className='flex flex-col md:flex-row'>
          <div className='flex-1'>
            <div className="md:min-h-screen p-4 bg-gray-900">
              <h1 className="text-center text-5xl font-mono font-semibold text-[#e5e7eb] mt-4 mb-4">
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
                  <table className="w-full table-auto border-separate border-spacing-1 border-gray-400 bg-[#374151] text-white">
                    <thead className="rounded">
                      <tr className="bg-[#4b5563]">
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
                          Issue Date
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
                          <p className="text-white font-bold">{new Date(loan.createdAt).toLocaleDateString()}</p> {/* Render date */}
        <p className="text-white font-bold">{new Date(loan.createdAt).toLocaleTimeString()}</p> {/* Render time */}
                          </td>

                          <td className="border border-gray-400 px-2 py-2 text-center">
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
                            <Link to={`/admin/loan-detail/${loan._id}`}>
                              <button>
                                <FaEye className='h-6 w-6 text-[#86B6F6] hover:text-[#B4D4FF]'/>
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
      </div>
    </div>
  );
}

export default HomeLoan;