import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RiCloseCircleLine } from "react-icons/ri";

const ActionDialog = ({ onClose, onUpdate, open }) => {
  const [remark, setRemark] = useState('');
  const [status, setStatus] = useState('Not Update Yet');

  const params = useParams();

  const handleUpdate = async () => {
    try {
      // Make a PUT request to the backend API endpoint
      const response = await fetch(`/api/loan/update-status/${params.loanId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary authentication headers if required
        },
        body: JSON.stringify({ remark, status }),
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to update loan status');
      }

      // Close the dialog
      onClose();
      // Trigger parent component's update function if necessary
      onUpdate();

    } catch (error) {
      console.error('Error updating loan status:', error);
      // Handle errors or display error messages if necessary
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  
  return (
    <>
      {open && ( // Only render the dialog if open is true
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-[#E3F4F4] shadow-2xl shadow-slate-900 rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
             
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-2xl text-[#579BB1] font-bold mb-8 leading-6 " id="modal-headline">
                      Take Action
                    </h3>
                    <RiCloseCircleLine className="h-8 w-8 text-[#579BB1] absolute top-5 right-6 cursor-pointer" onClick={onClose} />
                    <div className="mt-2 grid grid-cols-2">
  <label className=' justify-center ml-4 text-[#579BB1] text-lg font-bold mt-3'>Remark</label>
  <div className="flex items-center"> {/* Wrap the textarea and label in a flex container */}
    <textarea
      value={remark}
      onChange={(e) => setRemark(e.target.value)}
      placeholder="Enter Remark"
      className="resize-none border rounded-md flex-1 p-2 text-black w-full" 
    ></textarea>
  </div>
</div>


<div className="mt-2 grid grid-cols-2">
  <label htmlFor="" className=' ml-4 text-[#579BB1] font-bold text-lg mt-1 '>Status</label>
  <select
    value={status}
    onChange={handleStatusChange}
    className="border rounded-md w-full p-2 text-black"
  >
    <option value="Not Updated Yet">Not Updated Yet</option>
    <option value="Approved">Approve</option>
    <option value="Reject">Reject</option>
  </select>
</div>

                  </div>
            
              </div>
              <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleUpdate}
                  className="w-full font-bold inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-2 bg-[#579BB1] text-[#456268] hover:bg-white hover:border-[#456268] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update
                </button>
                <button
                  onClick={onClose} // Call onClose when the close button is clicked
                  className="mt-3 w-full inline-flex justify-center rounded-md border p-3 border-[#456268] shadow-sm px-5 py-2 bg-[#D0E8F2] text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionDialog;
