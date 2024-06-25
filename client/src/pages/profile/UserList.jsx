import React, { useState, useEffect } from 'react';
import ProfileNav from '../../components/ProfileNav';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

function UserList() {
  const [userListings, setuserListings] = useState([]);
  const [showLisitngsError, setShowLisitngsError] = useState(false);
  const [formData, setFormData] = useState({});

  // Get currentUser from Redux store
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch user listings when the component mounts
    handleShowListings();
  }, [currentUser]); // Include currentUser in the dependency array

  const handleShowListings = async () => {
    try {
      setShowLisitngsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowLisitngsError(true);
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
      console.log(data)
      setuserListings(data);
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
      setShowLisitngsError(true);
    }
  };

  const handleListingDelete = async (propertyId) => {
    try {
      const res = await fetch(`/api/property/delete/${propertyId}`, {
        method: 'DELETE',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
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

      setuserListings((prev) => prev.filter((property) => property._id !== propertyId));
      toast('Delete Property', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
 <>
   
     
  <div className='flex flex-col md:flex-row'>
      <ProfileNav />

   <div className='md:w-3/4 p-5 bg-[#F3F8FF]'>
      <h1 className='text-center mt-7 mb-7 text-4xl  italic font-mono font-semibold  text-[#435585]'>
            Your Listings
          </h1>
          
      <div className="my-6" style={{ height: '2px', backgroundColor: '#3E3232' }}></div>

      <div className='flex flex-row'>
        <p className='text-red-700 mt-5'>
          {showLisitngsError ? 'Error showing listings' : ''}
        </p>
      </div>

      {userListings && userListings.length > 0 && (
        <div className='flex col-span-3'> 

          <div className='flex flex-wrap  flex-row gap-14 justify-between mr-10 ml-10'>
          {userListings.map((property) => (
            <div
              key={property._id}
              className='shadow-slate-400 shadow-lg  rounded-lg p-1 flex justify-between items-center gap-5'
            >
              <div className='shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] bg-[#EEF1FF]'>
                <Link to={`/property/${property._id}`}>
                  <img
                    src={
                      property.imageUrls[0] ||
                      'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
                    }
                    alt='listing cover'
                    className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
                  />

                  <div className='p-3 flex flex-col gap-2 w-full'>
                  <div className='flex items-center gap-1'>
        <p className="font-bold">{property.expectedPrice}₹</p>

        <p className='bg-[#96B6C5] shadow-md shadow-slate-400 ml-40 max-w-[200px] text-white font-serif font-bold items-center text-center w-16 h-7 rounded-md'>
                {property.propertyFor === 'rent' ? 'Rent' : 'Sell'}
        </p>

  
        </div>
                    <div className='flex items-center gap-1'>
                      <MdLocationOn className='h-4 w-4 text-green-700' />
                      <p className='text-sm text-gray-600 truncate w-full'>
                        {property.locality}
                      </p>
                    </div>

                    <p className='text-sm text-gray-600 line-clamp-2'>
                      {property.description}
                    </p>

                    <div className='text-slate-700 flex gap-4'>
                      <div className='font-bold text-xs'>
                        {property.bedrooms > 1
                          ? `${property.bedrooms} beds `
                          : `${property.bedrooms} bed `}
                      </div>
                      <div className='font-bold text-xs'>
                        {property.bathrooms > 1
                          ? `${property.bathrooms} baths `
                          : `${property.bathrooms} bath `}
                      </div>
                      <div className='font-bold text-xs'>
                        {property.balconies > 1
                          ? `${property.balconies} balconies `
                          : `${property.balcony} balcony `}
                      </div>
                      <button
                onClick={() => handleListingDelete(property._id)}
                className='p-1 text-2xl ml-auto w-20 shadow-sm bg-[#781D42] hover:bg-[#EEF1FF] hover:text-[#781D42] border hover:border-[#781D42] font-serif font-bold text-white rounded-md hover:opacity-95 disabled:opacity-80 sm:text-base'
              >
                Delete  
              </button>

                    </div>


                  </div>

                </Link>
              </div>
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
    </div>
    </>
  );
}

export default UserList;
