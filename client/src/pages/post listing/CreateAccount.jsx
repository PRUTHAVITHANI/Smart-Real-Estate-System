import React, { useState , userRef } from 'react';
import { useSelector } from 'react-redux';
import { updateUserStart, updateUserFailure, updateUserSuccess } from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';


function CreateAccount() {
  const { currentUser} = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email:currentUser.email,
    password: '',
    userType: currentUser.userType,
    location: currentUser.location,
    mobileNo: currentUser.mobileNo,
  });

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formChanges, setFormChanges] = useState(false);  
  const navigate = useNavigate();
  console.log(formData);
  const dispatch = useDispatch();

  const handleChange = (e)=>{
    setFormData({ ...formData, [e.target.id] : e.target.value});
    setFormChanges(true);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();  

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
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
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      toast('Update successfully', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/post-listing/property-detail")
      console.log('Form data submitted:', formData);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

 
  return (
  <>
   <div className='w-full bg-[#ECF9FF] '>
    
          <form className="grid grid-cols-2 gap-5" onSubmit={handleSubmit}>

          <h1 className="col-span-2 mb-10 text-4xl ml-24  text-center mr-28 text-[#435585] mt-20 drop-shadow-2x italic font-mono font-semibold  ">Create Account</h1>
          
        <div className="mb-4 flex flex-cols-2 ml-40">
          <label htmlFor="username" className="text-[#535C91] font-semibold label block  text-lg mr-8 mb-2 mt-1 w-28">
            Username
          </label>
          <input
            type="text"
            placeholder="username"
            className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
            id="username"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4 flex flex-cols-2 ml-40">
          <label htmlFor="email" className="text-[#535C91] font-semibold label block  text-lg mr-8 mb-2 mt-1 w-28">
            Email
          </label>
          <input
            type="email"
            placeholder="email"
            className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
            id="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
        </div>
        

        <div className="mb-4 flex flex-cols-2 ml-40">
          <label htmlFor="password" className="text-[#535C91] font-semibold label block  text-lg mr-8 mb-2 mt-1 w-28">
            Password
          </label>
          <input
            type="password"
            placeholder="password"
            className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
            id="password"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4 flex flex-cols-2 ml-40">
          <label htmlFor="userType" className="text-[#535C91] font-semibold label block  ext-lg mr-8 mb-2 mt-1 w-28">
            User Type
          </label>
          <select
            id="userType"
            name="userType"
            className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
            onChange={handleChange}
            defaultValue={currentUser.userType}
          >
            <option value="Home Buyer">Home Buyer</option>
            <option value="Home Seller">Home Seller</option>
            <option value="Both Buyer and Seller">Both Buyer and Seller</option>
            <option value="Renter">Renter</option>
            <option value="Other/Just Looking">Other/Just Looking</option>
            <option value="Home Owner">Home Owner</option>
            <option value="Renter/Rentee">Renter/Rentee</option>
          </select>
        </div>

        <div className="mb-4 flex flex-cols-2 ml-40">
          <label htmlFor="location" className="text-[#535C91] font-semibold label block  text-lg mr-8 mb-2 mt-1 w-28">
            Location
          </label>
          <input
            type="text"
            placeholder="Location"
            className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
            id="location"
            defaultValue={currentUser.location}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4 flex flex-cols-2 ml-40">
          <label htmlFor="location" className="text-[#535C91] font-semibold label block  text-lg mr-8 mb-2 mt-1 w-28">
            Mobile No
          </label>
          <input
            type="number"
            placeholder="Mobile Number"
            className="border border-[#352F44] focus:border-[#435585] w-1/2 p-2 rounded-lg shadow-md focus:outline-none "
            id="mobileno"
            defaultValue={currentUser.mobileno}
            onChange={handleChange}
          />
        </div>
        
        <div className="col-span-2 text-center mt-20 mb-28 mr-40">
          <button
            to="/post-listing/property-detail"
            type="submit"
            className={`border-2 font-serif text-lg ml-24 bg-[#748DA6] w-1/4 text-[#0E2954] font-bold py-2 px-4 rounded hover:border-[#748DA6] hover:bg-[#ECF9FF] hover:text-[#748DA6] `}  
          >
            Continue 
          </button>

          
          </div>
          </form>
        </div>

       
      </>
  
  );
}

export default CreateAccount;
