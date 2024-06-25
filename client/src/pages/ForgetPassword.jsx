import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/forget-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Wrap email in an object
      });

      const data = await res.json();

      if (data.success === false) {
        toast.error('Something went wrong, please try again', {
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

      toast.success('Reset link sent to the email', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate('/sign-in');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 w-[500px] sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white shadow-lg rounded-xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <h1 className="text-2xl font-semibold max-w-xs w-64 text-center">
                  Reset Password
                </h1>
              </div>

              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className='relative'>
                    <input
                      type='email'
                      placeholder='Email'
                      className="p-3 rounded-lg border w-full text-slate-700 "
                      id='email'
                      onChange={(e) => setEmail(e.target.value)} // Update the email state
                    />
                  </div>

                  <div className="relative text-center">
                    <button
                      onClick={handleSubmit}
                      className="bg-slate-700 text-white p-3 mb-4 rounded-lg uppercase hover:opacity-95 disabled:opacity-90 font-bold py-2 px-4 w-[100%]"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword;
