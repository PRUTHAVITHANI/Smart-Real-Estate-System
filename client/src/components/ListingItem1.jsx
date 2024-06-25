import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import location from "../assets/image/location.png";
import {useSelector} from 'react-redux';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ListingItem1({ property }) {
  const {currentUser} = useSelector((state)=> state.user);
  // const [admin, setAdmin] = useState("user");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isYourProperty, setIsYourProperty] = useState(false);
  const [key, setKey] = useState("");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!currentUser._id) return;
    // console.log(product);
    if (currentUser._id=== property._id) {
      setIsYourProperty(true);
    }
  }, []);

  // console.log(product);

  const addToWishlist = async (property, e) => {
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
      return;
    }else{
      try {
        const formData = { userId: currentUser._id, propertyId: property._id };
        const res = await fetch('/api/wishlist/addtowishlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await res.json();
  
        if (data.success === false) {
          console.log(data.message);
          return;
        }

        toast("property added to wishlist", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setIsWishlisted(true);
        console.log(data)
      } catch (error) {
        console.error(error.message);
      }}

  };

  // Function to remove property from wishlist
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
      setIsWishlisted(false);
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
  }, []);
  

  useEffect(() => { 
    const fetchKey = async () => {
        try {
            const response = await fetch("http://www.localhost:5000/api/getkey");
            if (!response.ok) {
                // Check if the response is not okay (HTTP status code is not in the range 200-299)
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setKey(data.key);
        } catch (error) {
            console.error("Error fetching key:", error);
            // Handle the error here, such as displaying a message to the user
        }
    };
    fetchKey();
}, []);

const checkoutHandler = async ( bookingAmount) => {
    try {
      if (!property || !property.bookingAmount) {
        console.error('Property details or booking amount not available');
        return;
    }

        const response = await fetch("/api/payment/checkout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount:property.bookingAmount })
        });
        const data = await response.json();
        setOrder(data.order);

        const options = {
            key,
            amount: property.bookingAmount,
            currency: "INR",
            name: "Real Estate",
            description: "smart real estate system",
            image: "https://p7.hiclipart.com/preview/466/312/58/house-free-content-clip-art-white-house-vector.jpg",
            order_id: data.order.id,
            callback_url: "http://localhost:5000/api/payment/paymentverification",
            prefill: {
                name: "Prutha vithani",
                email: "pruthavithani5889@gmail.com",
                contact: "6353797920"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#1F2544"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    } catch (error) {
        console.error("Error during checkout:", error);
    }
}


  return (
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
               
               {!isYourProperty && (
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
               )}
               
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
                <div className='font-bold text-xs mt-3'>
                  {property.bedrooms > 1
                    ? `${property.bedrooms} beds `
                    : `${property.bedrooms} bed `}
                </div>
                <div className='font-bold text-xs mt-3'>
                  {property.bathrooms > 1
                    ? `${property.bathrooms} baths `
                    : `${property.bathrooms} bath `}
                </div>
                <div className='font-bold text-xs mt-3'>
                  {property.balconies > 1
                    ? `${property.balconies} balconies `
                    : `${property.balcony} balcony `}
                </div>

                  <div>
                    <Link onClick={(e) => {
    e.preventDefault(); 
    checkoutHandler(); 
  }}>
                    <button className='h-12 px-5 m-2 bg-black shadow-lg text-white hover:text-black font-bold shadow-gray-500  hover:bg-[#EFFFFB] border hover:border-black rounded'>
                    Book Now
                  </button>
                    </Link>
                 
                  </div>

              </div>
            </div>
         
        </div>
      </div>
    </div>
  );
}

export default ListingItem1;
