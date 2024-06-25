import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import location from '../../../assets/image/location.png'

const WishlistCard = ({ property, isLoading, setIsLoading, setIsRemoved }) => {
  const {currentUser} = useSelector((state)=> state.user);
  const [isWishlisted, setIsWishlisted] = useState(false);



  const removeFromWishlist = async (property , e) => {
    e.preventDefault();
    if (!currentUser._id) {
      toast("You need to login first", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigateTo("/");
      return;
    }

    try {
      const res = await fetch(`/api/wishlist/deletefromwishlist/${currentUser._id}/${property._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      toast("Property removed from wishlist", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsRemoved(true);
      setIsWishlisted(res.data.isWishlisted);
      console.log(res)
    } catch (error) {
      console.error(error.message);
    }
  };


useEffect(() => {
  if (!currentUser._id) {
    setIsWishlisted(false);
    return;
  }

  fetch(`/api/wishlist/isPropertyWishlisted/${currentUser._id}/${property._id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setIsWishlisted(data.isWishlisted);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
}, [isWishlisted]);




  return (
    <>
    <div className="flex flex-rows-2">
      <div
        key={property._id}
        className=' shadow-slate-400 shadow-lg rounded-lg p-1 flex justify-between items-center gap-4 relative'
      > 

        <div className='shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] bg-[#F9F5F6]'>
        <Link to={`/property/${property._id}`}>
            <img
              src={
                property.imageUrls[0] ||
                'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
              }
              alt='listing cover'
              className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
            />
             </Link>

            <div className='p-3 flex flex-col gap-2 w-full'>
              <div className='flex items-center gap-1'>
                <p className="font-bold">{property.expectedPrice}₹</p>

                   {/* Heart icon */}
                   <div className="absolute top-60  right-24">
            
                 <>
                   {isWishlisted ? (
                     <>
                       <FaHeart
                         className="hover:cursor-pointer h-6 w-6"
                         onClick={(e) => removeFromWishlist(property , e)}
                       />
              
                     </>
                   ) : (
                     <>
                     <FaRegHeart
                          className="hover:cursor-pointer h-6 w-6"
                          onClick={(e) => addToWishlist(property, e)}
                        />

                     </>
                   )}
                 </>
        
             </div>
                <p className='bg-[#96B6C5] shadow-md shadow-slate-400 ml-40 max-w-[200px] text-white font-serif font-bold items-center text-center w-16 h-7 rounded-md'>
                  {property.propertyFor === 'rent' ? 'Rent' : 'Sell'}
                </p>
              </div>

              <div className='flex items-center gap-1'>
                <img className='h-4 w-4' src={location} alt="" />
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
              </div>
            </div>
         
        </div>
      </div>
    </div>
    

    </>
  );
};

export default WishlistCard;
