import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Contact from '../../components/Contact';
import location from "../../assets/image/location.png";
import { ToastContainer, toast } from "react-toastify";
import { format } from 'timeago.js';
import img from "../../assets/image/loanbg.jpeg";


function LoanPage() {
    const { currentUser } = useSelector((state) => state.user);

    const [loan, setLoan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [contact, setContact] = useState(false);

    const params = useParams();

    useEffect(() => {
        const fetchLoan = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/loan/get/${params.loanId}`);
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setLoan(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchLoan();
    }, [params.loanId]);

    return (
        <>
            {loading && <p className='text-center my-7 text-2xl text-[#354259]'>Loading...</p>}
            {error && <p className='text-center my-7 text-2xl text-red-600'>Something went wrong</p>}
            {loan && !loading && !error && (
                <div className='shadow-2xl shadow-slate-600 md:min-h-screen p-1 bg-[#D6E6F2]' >
                    <div className='flex flex-col max-w-7xl mx-auto my-7 gap-4 p-3'>
                        <div className='flex items-center gap-2'>
                            {/* Display user avatar here */}
                            {loan.userRef.avatar && <img src={loan.userRef.avatar} alt="User Avatar" className="h-28 w-28 rounded-full mr-7" />}
                            <h1 className='font-bold text-2xl text-[#354259]'>Application Number: {loan.id}</h1>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1 bg-gray-200 p-3 rounded-lg flex flex-row shadow-xl shadow-slate-300">
                                <p className="text-gray-500 w-36 font-bold">Full Name</p>
                                <p className="text-[#354259] font-bold ">{loan.fullname}</p>
                            </div>

                            <div className="col-span-1 bg-gray-200 p-3 rounded-lg flex flex-row shadow-xl shadow-slate-300">
                                <p className="text-gray-500 w-36 font-bold">Mobile No</p>
                                <p className="text-[#354259] font-bold">{loan.mobileno}</p>
                            </div>

                            <div className="col-span-1 bg-gray-200 p-3 rounded-lg flex flex-row shadow-xl shadow-slate-300">
                                <p className="text-gray-500 w-36 font-bold">Email Id</p>
                                <p className="text-[#354259] font-bold">{loan.email}</p>
                            </div>

                            <div className="col-span-1 bg-gray-200 p-3 rounded-lg flex flex-row shadow-xl shadow-slate-300">
                                <p className="text-gray-500 w-36 font-bold">Birth Date</p>
                                <p className="text-[#354259] font-bold">{loan.birthDate}</p>
                            </div>

                            <div className="col-span-2 bg-gray-200 p-3 rounded-lg flex flex-row shadow-xl shadow-slate-300">
                                <p className="text-gray-500 w-36 font-bold">Address</p>
                                <p className="text-[#354259] font-bold">{loan.address}</p>
                            </div>

                            <div className="col-span-1 bg-gray-200 p-3 rounded-lg flex flex-row shadow-xl shadow-slate-300">
                                <p className="text-gray-500 w-36 font-bold">State</p>
                                <p className="text-[#354259] font-bold">{loan.state}</p>
                            </div>

                            <div className="col-span-1 bg-gray-200 p-3 rounded-lg flex flex-row shadow-xl shadow-slate-300">
                                <p className="text-gray-500 w-36 font-bold">City</p>
                                <p className="text-[#354259] font-bold">{loan.city}</p>
                            </div>

                            <div className="col-span-1 bg-gray-200 p-3 rounded-lg flex flex-row shadow-xl shadow-slate-300">
                                <p className="text-gray-500 w-36 font-bold">Zip Code</p>
                                <p className="text-[#354259] font-bold">{loan.zipCode}</p>
                            </div>
                        </div>

                        <h1 className='font-bold text-2xl text-[#354259] items-center text-center p-2'>Work/Job Information</h1>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1 bg-gray-200 p-3 rounded-lg flex flex-row shadow-xl shadow-slate-300">
                                <p className="text-gray-500 w-36 font-bold">Title</p>
                                <p className="text-[#354259] font-bold">{loan.jobTitle}</p>
                            </div>

                            <div className="col-span-2 bg-gray-200 p-3 rounded-lg flex flex-row shadow-xl shadow-slate-300">
                                <p className="text-gray-500 w-36 font-bold ">Address</p>
                                <p className="text-[#354259] font-bold">{loan.jobAddress}</p>
                            </div>

                            <div className="col-span-1 bg-gray-200 p-3 rounded-lg flex flex-row shadow-xl shadow-slate-300">
                                <p className="text-gray-500 w-36 font-bold">State</p>
                                <p className="text-[#354259] font-bold">{loan.jobState}</p>
                            </div>

                            <div className="col-span-1 bg-gray-200 p-3 rounded-lg flex flex-row shadow-xl shadow-slate-300">
                                <p className="text-gray-500 w-36 font-bold">City</p>
                                <p className="text-[#354259] font-bold">{loan.jobCity}</p>
                            </div>

                            <div className="col-span-1 bg-gray-200 p-3 rounded-lg flex flex-row shadow-xl shadow-slate-300">
                                <p className="text-gray-500 w-36 font-bold">Zip Code</p>
                                <p className="text-[#354259] font-bold">{loan.jobZipCode}</p>
                            </div>
                        </div>

                        <h1 className='font-bold text-2xl text-[#354259] items-center text-center p-2'>Loan Detail</h1>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1 bg-gray-200 p-3 rounded-lg flex flex-row shadow-xl shadow-slate-300">
                                <p className="text-gray-500 w-36 font-bold">Monthly Income</p>
                                <p className="text-[#354259] font-bold">{loan.monthlyNetIncome}</p>
                            </div>

                            <div className="col-span-1 bg-gray-200 p-3 rounded-lg flex flex-row shadow-xl shadow-slate-300">
                                <p className="text-gray-500 w-36 font-bold">Credit Score</p>
                                <p className="text-[#354259] font-bold">{loan.creditScore}</p>
                            </div>

                            <div className="col-span-1 bg-gray-200 p-3 rounded-lg flex flex-row shadow-xl shadow-slate-300">
                                <p className="text-gray-500 w-36 font-bold">Expected Tenure</p>
                                <p className="text-[#354259] font-bold">{loan.terms}</p>
                            </div>

                            <div className="col-span-1 bg-gray-200 p-3 rounded-lg flex flex-row shadow-xl shadow-slate-300">
                                <p className="text-gray-500 w-36 font-bold">Expected Loan Amount</p>
                                <p className="text-[#354259] font-bold">{loan.requestedLoanAmount}</p>
                            </div>

                            <div className="col-span-1 bg-gray-200 p-3 rounded-lg flex flex-row shadow-xl shadow-slate-300">
                                <p className="text-gray-500 w-36 font-bold">Zip Code</p>
                                <p className="text-[#354259] font-bold">{loan.zipCode}</p>
                            </div>

                            <div className="col-span-1 bg-gray-200 p-3 rounded-lg flex flex-row shadow-xl shadow-slate-300"> {/* Change flex-row to flex-col */}
    <p className="text-gray-500 w-36 font-bold">Application Date</p> {/* Remove width to allow text to wrap */}
    <div className=" grid grid-rows-2 gap-1"> {/* Add a div for flex layout */}
        <p className="text-[#354259] font-bold">{new Date(loan.createdAt).toLocaleDateString()}</p> {/* Render date */}
        <p className="text-[#354259] font-bold">{new Date(loan.createdAt).toLocaleTimeString()}</p> {/* Render time */}
    </div>
</div>

                        </div>

                        <h1 className='font-bold text-2xl text-[#354259] items-center text-center p-2'>Disburesed Amount Info</h1>

                        <div className="flex justify-center items-center mt-8">
  <div className="bg-gray-200 p-3 rounded-lg flex flex-row justify-center items-center shadow-xl shadow-slate-300 w-96">
    <p
                            className={`text-xl font-semibold rounded ${
                              loan.status === 'Approved'
                                ? 'bg-[#009378] text-[#114232 ] ': 'bg-[#CE5A67] text-[#5D0E41]'
                            }`} 
                          >
                            {loan.status}
                          </p>
  </div>
</div>


                     
                    </div>
                </div>
            )}
        </>
    );
}

export default LoanPage;
