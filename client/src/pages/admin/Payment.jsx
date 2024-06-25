
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { FaEye } from "react-icons/fa";
import AdminNav from './AdminNav';
import AdminHeader from './AdminHeader';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './tableStyles.css';
import { PiExportDuotone } from "react-icons/pi";

function Payment() {
  const [userPayment, setuserPayment] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);

  const handleExportPDF = () => {
    const input = document.getElementById('paymentTable');

    // Add temporary styles for PDF export
    input.classList.add('pdf-export-table');

    html2canvas(input, { scrollY: -window.scrollY, scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait orientation, millimeters, A4 size
        const imgHeight = ((canvas.height) * 210 / canvas.width) + 20; // Adjust height to maintain aspect ratio and add extra space for the table

        // Add heading
        pdf.setFontSize(18);
        const heading = 'Property Payment History';
        const textWidth = pdf.getStringUnitWidth(heading) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
        const textX = (pdf.internal.pageSize.width - textWidth) / 2;
        pdf.text(heading, textX, 15);

        // Calculate the position to center the table horizontally with margin
        const margin = 20; // Adjust margin as needed
        const tableWidth = 190; // Table width in mm
        const availableWidth = pdf.internal.pageSize.width - (2 * margin); // Calculate available width with margin on both sides
        const tableX = (availableWidth - tableWidth) / 2 + margin; // Center table horizontally with margin

        // Add table with space on the right and left sides
        pdf.addImage(imgData, 'PNG', tableX, 20, 190, imgHeight - 20); // Start table after the heading
        pdf.save('payment_history.pdf');

        // Remove temporary styles after generating the PDF
        input.classList.remove('pdf-export-table');
    });
};

  
  

  useEffect(() => {
    fetchAllPayments();
  }, []);

  const fetchAllPayments = async () => {
    try {
      const res = await fetch("/api/payment/property-payments");
      const data = await res.json();
      if (data.success === true) {
        setuserPayment(data.payment); // Accessing the 'payment' array
        return;
      }
      setShowListingsError(true);
    } catch (error) {
      console.log(error);
      setShowListingsError(true);
    }
  };

  
  console.log("User Payment Data:", userPayment);

  return (
    
<div className='flex flex-col md:flex-row  text-white'>
      <AdminNav />
      <div className='w-full'>
        <AdminHeader />
        <div className='flex flex-col md:flex-row'>
          <div className='flex-1'>
            <div className="md:min-h-screen p-4 bg-gray-900">
              <h1 className="text-center text-5xl font-mono font-semibold text-[#e5e7eb] mt-4 mb-4">
               Payment History
              </h1>

              <div className="relative mr-8  mb-8">
              <button className='p-3 border absolute border-white right-0 top-0 h-12 text-white w-48 rounded-lg flex items-center' onClick={handleExportPDF}>Export as PDF
              <PiExportDuotone className="absolute w-9 h-9 top-1/2 right-4 transform -translate-y-1/2 text-[#ECF9FF] cursor-pointer" />
              </button>
                 </div>

              <div>
              </div>  
              <div className="flex flex-row">
                <p className="text-red-700 mt-9">
                  {showListingsError ? 'Error showing payments' : ''}
                </p>
              </div>
              {userPayment && userPayment.length > 0 && (
                <div className="flex col-span-3 mt-6 flex-auto w-full">
                  <table id="paymentTable" className="w-full table-auto border-separate border-spacing-1 border-gray-400 bg-[#374151] text-white">
                    <thead className="rounded">
                      <tr className="bg-[#4b5563]">
                        <th className="border border-gray-400 px-4 py-2 text-lg">
                          S.No
                        </th>
                        <th className="border border-gray-400 px-4 py-2 text-lg">
                          Payment Id
                        </th>
                        <th className="border border-gray-400 px-4 py-2 text-lg">
                          Recieved By
                        </th>
                        <th className="border border-gray-400 px-4 py-2 text-lg">
                          Property Id
                        </th>
                     
                        <th className="border border-gray-400 px-4 py-2 text-lg">
                          Amount
                        </th>
                        <th className="border border-gray-400 px-4 py-2 text-lg">
                          Payment Date
                        </th>
                        <th className="border border-gray-400 px-4 py-2 text-lg">
                          Payment Time
                        </th>
                      
                      </tr>
                    </thead>
                    <tbody>
                      {userPayment.map((payment, index) => (
                        <tr key={payment._id} className="">
                          <td className="border border-gray-400 px-4 py-2 text-center text-lg">
                            {index + 1}
                          </td>
                          <td className="border border-gray-400 px-4 py-2 text-center text-lg">
                            {payment.razorpay_payment_id}
                          </td>
                          <td className="border border-gray-400 px-4 py-2 text-center text-lg">
                            {payment.userRef.username}
                          </td>
                          <td className="border border-gray-400 px-4 py-2 text-center text-lg">
                            {payment.propertyRef.id}
                          </td>

                          <td className="border border-gray-400 px-4 py-2 text-center text-lg">
                            {payment.propertyRef.bookingAmount}
                          </td>

                          <td className="border border-gray-400 px-4 py-2 text-center text-lg">
                          <p className="text-white font-bold">{new Date(payment.createdAt).toLocaleDateString()}</p> {/* Render date */}
                          </td>


                          <td className="border border-gray-400 px-4 py-2 text-center text-lg">
                          <p className="text-white font-bold">{new Date(payment.createdAt).toLocaleTimeString()}</p> {/* Render time */}
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

export default Payment;