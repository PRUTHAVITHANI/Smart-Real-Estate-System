import {useSelector} from 'react-redux';
import { useRef, useState , useEffect } from 'react';
import {getStorage, uploadBytesResumable , ref, getDownloadURL} from 'firebase/storage'
import {app} from '../../firebase';
import {updateUserStart, updateUserFailure, updateUserSuccess} from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt } from 'react-icons/fa';
import ProfileNav from '../../components/ProfileNav';

function Profile() {
  const fileRef = useRef(null);
  const {currentUser, loading, error} = useSelector((state)=> state.user);
  const [file,setFile] = useState(undefined);
  const [fileperc, setFileperc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formChanges, setFormChanges] = useState(false);  

  const dispatch = useDispatch();

  //firebase storage+

      // allow read; 
      // allow write: if 
      // request.resource.size < 2 * 1024 * 1024 &&
      // request.resource.contentType.matches('image/.*');

useEffect(()=> {
  if(file){
    handleFileUpload(file);
  }
}, [file]);

const handleFileUpload = (file)=>{
  const storage = getStorage(app);
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef , file);

  uploadTask.on('state_changed', (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setFileperc(Math.round(progress));
  },
    (error) => {
      setFileUploadError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL) => 
      setFormData({...formData, avatar: downloadURL})
      );
    }
  );};

  const handleChange = (e)=>{
    setFormData({ ...formData, [e.target.id] : e.target.value});
    setFormChanges(true);
  };

  const handleCancel = () => {
    setFormData({});
    setFormChanges(false);
  };


  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
     const res = await fetch(`/api/user/update/${currentUser._id}`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success == false){
       dispatch(updateUserFailure(data.message));
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
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      toast("Update successfully", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
    

  return (

<div className='flex flex-col md:flex-row '>

<ProfileNav/>

<div className='flex-1 bg-[#F3F8FF]'>

    <div className='p-3 max-w-lg mx-auto'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
       
      <img onClick={()=>{fileRef.current.click()}} 
       className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
       src={formData.avatar || currentUser.avatar} 
       alt="profile" /> 
    <div className="flex items-center justify-center">
    <FaPencilAlt
      className="text-[#535C91] cursor-pointer"
      onClick={() => { fileRef.current.click() }}
    />
  </div>

        <p className='text-sm self-center'>
          {fileUploadError ? 
        (<span className='text-red-700'>Error Image Uplaod (image must be less than 2mb)
        </span>
         )  :  fileperc > 0 && fileperc < 100 ? (
          <span className='text-green-700'>
            {`Uploading ${fileperc}%`}
          </span>
          ) : fileperc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
            ) : (
            ''
          )}
        </p>
      
              <label htmlFor="username" className='text-gray-800 font-bold label'>
                Username
              </label>
              <input
                type="text"
                placeholder="username"
                className='border p-3 rounded-lg shadow-md focus:outline-none  border-[#352F44] focus:border-[#435585]'
                id="username"
                defaultValue={currentUser.username}
                onChange={handleChange}
              />


            
              <label htmlFor="email" className='text-gray-800 font-bold label'>
                Email
              </label>
              <input
                type="email"
                placeholder="email"
                className='border p-3 rounded-lg shadow-md focus:outline-none  border-[#352F44] focus:border-[#435585]'
                id="email"
                defaultValue={currentUser.email}
                onChange={handleChange}
              />
      

              <label htmlFor="password" className='text-gray-800 font-bold label'>
                Password
              </label>
              <input
                type="password"
                placeholder="password"
                className='border p-3 rounded-lg shadow-md focus:outline-none  border-[#352F44] focus:border-[#435585]'
                id="password"
                onChange={handleChange}
              />
       
              <label htmlFor="userType" className='text-gray-800 font-bold label'>
                User Type
              </label>
              <select
                id="userType"
                name="userType"
                className="border p-3 rounded-lg shadow-md focus:outline-none border-[#352F44] focus:border-[#435585]"
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
    
              <label htmlFor="location" className='text-gray-800 font-bold label'>
                Location  
              </label>
              <input
                type="text"
                placeholder="Location"
                className='border p-3 rounded-lg shadow-md focus:outline-none  border-[#352F44] focus:border-[#435585]'
                id="location"
                defaultValue={currentUser.location}
                onChange={handleChange}
              />
      

        {/* <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Save changes'}</button> */}
        <div className="flex gap-4">
          <button
            type="submit"
            data-testid="user-profile-submit-button"
            className={`border bg-[#1D2D50] w-2/4 text-white font-bold  hover:border-[#1D2D50] hover:bg-[#ECF9FF] hover:text-[#1D2D50]  py-2 px-10 rounded ${formChanges ? '' : 'disabled:opacity-80'}`}
            disabled={!formChanges}
          >
            Save Profile
          </button>

          <button
            type="button"
            data-testid="user-profile-cancel-button"
            className={`border border-[#1D2D50] font-bold text-[#1D2D50] w-1/3 py-2 px-4 rounded hover:bg-slate-200 ${formChanges ? '' : 'disabled:opacity-60'}`}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>


      </form>
         </div>
       </div>
</div>

  );
            }

export default Profile;