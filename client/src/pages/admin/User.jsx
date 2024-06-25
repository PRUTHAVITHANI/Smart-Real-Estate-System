import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { deleteUserFailure,deleteUserStart,deleteUserSuccess} from '../../redux/user/userSlice';
import AdminNav from './AdminNav';
import AdminHeader from './AdminHeader';
import { CiCirclePlus } from "react-icons/ci";
import { FaSearch } from 'react-icons/fa';


function User() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await fetch(`/api/user/search?query=${searchQuery}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setSearchResults(data);
    } catch (error) {
      console.log(error);
      toast.error('Error searching for users');
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/search?query=${searchQuery}`);
        const data = await res.json();
        if (data.success === false) {
          return;
        }
        setSearchResults(data);
      } catch (error) {
        console.log(error);
        toast.error('Error searching for users');
      }
    };

    if (searchQuery.trim() !== '') {
      fetchUsers();
    } else {
      setSearchResults(users);
    }
  }, [searchQuery, users]);




  const handleShowUser = async () => {
    try {
      const res = await fetch('/api/user/get');
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleShowUser();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${userId}`, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(deleteUserSuccess(data));
      toast.success('User deleted successfully');
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      toast.error('Error deleting user');
    }
  };

  return (
    <>
      <div className='flex flex-auto'>
        <AdminNav />
        <div className='w-full'>
          <AdminHeader />
          <div className='md:min-h-screen p-5 bg-gray-900'>
            <h1 className='text-center mt-3 mb-7 text-5xl font-mono font-semibold text-white'>Users List</h1>
            <div className="flex justify-between items-center mt-4 ml-3 mb-4">
              <Link to={`/admin/post-listing/property-detail`}>
                <button className="flex items-center p-2 ml-5 text-3xl w-56 bg-[#113A5D] hover:bg-[#EEF1FF] hover:text-[#113A5D] border hover:border-[#113A5D] font-bold text-white rounded-md hover:opacity-95 disabled:opacity-80 sm:text-base">
                  <CiCirclePlus className='w-10 h-10 mr-2' />
                  Add User
                </button>
              </Link>
              <div className='flex items-center mt-4 w-96 mr-14 justify-end'>
                  <form
                    className="mb-4 flex border-1 border-gray-500  hover:border-[#535C91] hover:bg-white hover:text-[#535C91] rounded-lg hover:opacity-95 disabled:opacity-80 sm:text-base"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSearch();
                    }}
                  >
                    <div className="relative w-96">
                      <input
                        type='text'
                        className='p-6 h-12 text-xl w-full border border-black rounded-lg focus:outline-none pr-16'
                        placeholder='Search'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button type="submit" className="absolute right-0 top-0 h-full text-black w-16 rounded-r-lg flex items-center justify-center">
                        <FaSearch className='w-7 h-7 hover:text-slate-700 font-bold ' />
                      </button>
                    </div>
                  </form>
                </div>

            </div>
            {(searchResults.length > 0 ? searchResults : users).map((user) => (
              <div
                key={user._id}
                className=' shadow-slate-400 p-1  flex justify-between items-center gap-5 mb-5 '
              >
                <div className='flex flex-1 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] bg-gray-800'>
                  <img
                    src={user.avatar}
                    aria-label="placeholder profile"
                    alt="Profile"
                    className="rounded-full h-10 mr-6 ml-6 w-10 object-cover cursor-pointer self-center mt-2"
                  />
                  <div className='p-3 flex-auto gap-2 w-full'>
                    <label htmlFor="" className='text-white'>Username</label>
                    <p className='font-bold text-white'>{user.username}</p>
                  </div>
                  <div className='p-3 flex-auto gap-2 w-full mr-7'>
                    <label htmlFor="" className='text-white'>Email</label>
                    <p className='font-bold text-white'>{user.email}</p>
                  </div>
                  <div className='p-3 flex-auto gap-2 w-1/2'>
                    <label htmlFor="" className='text-white'>Location</label>
                    <p className='font-bold text-white'>{user.location}</p>
                  </div>
                  <div className='p-3 flex-auto gap-2 w-1/2'>
                    <label htmlFor="" className='text-white'>Mobile No</label>
                    <p className='font-bold text-white'>{user.mobileno}</p>
                  </div>
                  <div className='p-3 flex-auto gap-2 w-full'>
                    <label htmlFor="" className='text-white'>User Type</label>
                    <p className='font-bold text-white'>{user.userType}</p>
                  </div>
                  <Link to={`/admin/user-edit/${user._id}`} className="text-sm text-gray-600 font-bold font-serif">
                    <FaEdit className='inline-block mr-2 text-xl text-white mt-7' />
                  </Link>
                  <Link onClick={() => handleDeleteUser(user._id)} className="text-sm text-gray-600 font-bold font-serif">
                    <FaTrashAlt className='inline-block mr-5 text-xl text-white mt-7 ml-5' />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
