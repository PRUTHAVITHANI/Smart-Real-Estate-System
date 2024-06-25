import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { CiCirclePlus } from 'react-icons/ci';
import { format } from 'timeago.js';
import AdminNav from './AdminNav';
import AdminHeader from './AdminHeader';

function Property() {
  const [showListingsError, setShowListingsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredListings, setFilteredListings] = useState([]);

  const generateRandomID = () => {
    const randomID = Math.floor(100000 + Math.random() * 9000);
    return randomID;
  };
  
  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    fetchListings(searchQuery);
  }, [searchQuery]);

  const fetchListings = async (query = '') => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/property/search${query ? `?query=${query}` : ''}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setFilteredListings(data);
    } catch (error) {
      console.error('Fetch listings error:', error);
      setShowListingsError(true);
    }
  };

  const handleSearch = async () => {
    fetchListings(searchQuery);
  };

  const handleApprove = async (propertyId) => {
    try {
      const res = await fetch(`/api/property/approve/${propertyId}`, {
        method: 'PUT'
      });
      if (res.ok) {
        // Fetch all listings again after approving
        fetchListings(searchQuery);
  
        toast('Property approved successfully', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast('Failed to approve property', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Approve property error:', error);
      toast('Error approving property', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  
  const handleReject = async (propertyId) => {
    try {
      const res = await fetch(`/api/property/reject/${propertyId}`, {
        method: 'PUT'
      });
      if (res.ok) {
        // Fetch all listings again after rejecting
        fetchListings(searchQuery);
  
        toast('Property rejected successfully', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast('Failed to reject property', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('Reject property error:', error);
      toast('Error rejecting property', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div className="flex flex-auto">
        <AdminNav/>
        <div className="w-full">
          <AdminHeader/>
          <div className="md:min-h-screen p-4 bg-gray-900">
            <h1 className="text-center text-5xl font-mono font-semibold text-[#DBDFEA] mt-4 mb-4">
              Properties List
            </h1>
            <div>
              <div className="flex justify-between items-center mt-4">
                <Link to="/admin/post-listing/property-detail">
                  <button className="flex items-center p-2 ml-5 text-3xl w-56 bg-[#113A5D] hover:bg-[#EEF1FF] hover:text-[#113A5D] border hover:border-[#113A5D] font-bold text-white rounded-md hover:opacity-95 disabled:opacity-80 sm:text-base">
                    <CiCirclePlus className="w-10 h-10 mr-2" />
                    Add Property
                  </button>
                </Link>
                <div className="flex items-center mt-4 w-96 mr-14 justify-end">
                  <form
                    className="mb-4 flex border-1 border-gray-500  hover:border-[#535C91] hover:bg-white hover:text-[#535C91] rounded-lg hover:opacity-95 disabled:opacity-80 sm:text-base"
                    onSubmit={e => {
                      e.preventDefault();
                      handleSearch();
                    }}
                  >
                    <div className="relative w-96">
                      <input
                        type="text"
                        className="p-6 h-12 text-xl w-full border border-black rounded-lg focus:outline-none pr-16"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="absolute right-0 top-0 h-full text-black w-16 rounded-lg flex items-center justify-center"
                      >
                        <FaSearch className="w-7 h-7 hover:text-slate-700 font-bold " />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <p className="text-red-700 mt-5">
                {showListingsError ? 'Error showing listings' : ''}
              </p>
            </div>
            {filteredListings && filteredListings.length > 0 && (
              <div className="flex col-span-3 flex-auto w-full">
                <table className="w-full  table-auto border-separate border-spacing-1 border-gray-400 bg-[#374151] text-white">
                  <thead className="rounded">
                    <tr className="bg-[#4b5563]">
                      <th className="border border-gray-400 px-4 py-2 text-lg">
                        Id
                      </th>
                      <th className="border border-gray-400 px-4 py-2 text-lg">
                        Image
                      </th>
                      <th className="border border-gray-400 px-4 py-2 text-lg">
                        Listed By 
                      </th>
                      <th className="border border-gray-400 px-4 py-2 text-lg">
                        User Mobile
                      </th>
                      <th className="border border-gray-400 px-4 py-2 text-lg">
                        Locality
                      </th>
                      <th className="border border-gray-400 px-4 py-2 text-lg">
                        Created At
                      </th>
                      <th className="border border-gray-400 px-4 py-2 text-lg">
                        Approval
                      </th>
                      <th className="border border-gray-400 px-4 py-2 text-lg">
                        Status
                      </th>
                      <th className="border border-gray-400 px-4 py-2 text-lg">
                        In Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredListings.map((property, index) => (
                      <tr key={property._id} className="">
                        <td className="border border-gray-400 px-4 py-2 text-center text-base">
                          {property.id}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                          <img
                            src={
                              property.imageUrls[0] ||
                              'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
                            }
                            alt="listing cover"
                            className="h-[60px] sm:h-[60px] rounded-md w-full object-cover hover:scale-105 transition-scale duration-300"
                          />
                        </td>
                        <td className="border border-gray-400 px-4 py-2 text-center text-lg">
            {property.username}
                        </td>

                        <td className="border border-gray-400 px-4 py-2 text-center text-lg">
            {property.mobileno}
                        </td>
                        <td className="border border-gray-400 px-4 py-2 text-center text-lg">
                          {property.locality}
                        </td>
                        <td className="border border-gray-400 px-4 py-2 text-center text-lg">
                          {format(property?.createdAt)}
                        </td>
                        <td className="border border-gray-400 px-4 py-2 text-center text-lg">
                          <button
                            onClick={() => handleApprove(property._id)}
                            className="p-1 mb-4 text-xl w-20 bg-[#79BD8F] hover:bg-[#EEF1FF] hover:text-[#508D69] border hover:border-[#508D69] font-serif font-bold text-white rounded-md hover:opacity-95 disabled:opacity-80 sm:text-base"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(property._id)}
                            className="p-1 text-xl w-20 bg-[#FF6363] hover:bg-[#EEF1FF] hover:text-[#872341] border hover:border-[#872341] font-serif font-bold text-white rounded-md hover:opacity-95 disabled:opacity-80 sm:text-base"
                          >
                            Reject
                          </button>
                        </td>
                        <td className="border border-gray-400 px-4 py-2 text-center">
                          <p
                            className={`text-sm font-semibold rounded-lg w-24 ${
                              property.status === 'approved'
                                ? 'bg-[#B6FFCE] text-[#114232]'
                                : 'pending'
                                ? 'bg-[#FAD4D4] text-[#5D0E41]'
                                : ''
                            }`}
                          > 
                            {property.status}
                          </p>
                        </td>
                        <td className="border border-gray-400 px-4 py-2 text-center">
                          <Link to={`/admin/detail-property/${property._id}`}>
                            <button className="p-1 text-xl w-20 bg-[#9376E0] hover:bg-[#EEF1FF] hover:text-[#9376E0] border hover:border-[#9376E0] font-serif font-bold text-white rounded-md hover:opacity-95 disabled:opacity-80 sm:text-base">
                              More
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
      <ToastContainer />
    </>
  );
}

export default Property;
