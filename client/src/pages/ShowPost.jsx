import React, { useState , userRef , useRef,useEffect} from 'react'
import { useSelector } from 'react-redux';
import {useParams} from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import Contact from '../components/Contact';
import location from "../assets/image/location.png";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';

function ShowPost() {
    SwiperCore.use(Navigation);
    const {currentUser} = useSelector((state)=> state.user);

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isYourProperty, setIsYourProperty] = useState(false);
  const [key, setKey] = useState("");
  const [order, setOrder] = useState(null);

    const params = useParams();
    const propertyDetailsRef = useRef(null);

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
  
    useEffect(() => {
      if (!currentUser._id) return;
      // console.log(product);
      if (currentUser._id === params.propertyId) {
        setIsYourProperty(true);
      }
    }, []);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/property/get/${params.propertyId}`);
                const data = await res.json();
                if(data.success === false){
                    setError(true);
                    setLoading(false);
                    return;
                }
                setProperty(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
                
            }
        }
        fetchProperty();
    }, [params.propertyId]);

    const addToWishlist = async (e) => {
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
          const formData = { userId: currentUser._id, propertyId: params.propertyId };
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
    const removeFromWishlist = async ( e) => {
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
      }
  
      try {
        const res = await fetch(`/api/wishlist/deletefromwishlist/${currentUser._id}/${params.propertyId}`, {
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
    
      fetch(`/api/wishlist/isPropertyWishlisted/${currentUser._id}/${params.propertyId}`)
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

    
  const preloadImages = async (urls) => {
    try {
      const promises = urls.map(url => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Failed to load image from ${url}`));
          img.src = url;
        });
      });
      await Promise.all(promises);
    } catch (error) {
      console.error('Failed to preload images:', error);
    }
  };

  useEffect(() => {
    if (property && property.imageUrls) {
      preloadImages(property.imageUrls);
    }
  }, [property]);




  return  ( 
  <main>
     <div id="property-details" ref={propertyDetailsRef}>
    {loading && <p className='text-center my-7 text-2xl text-[#8EACCD]'>Loading...</p>}
    {error && <p className='text-center my-7 text-2xl'>Something went wrong</p>}
    {property && !loading && !error && (
    
    <div className='bg-[#E1E5EA] shadow-2xl p-1 shadow-slate-600'>
    <Swiper navigation>
        {property.imageUrls.map((url) => (
            <SwiperSlide key={url}>
      <div className='h-[550px] rounded ' style={{background: `url(${url}) center no-repeat` , backgroundSize: 'cover'}}></div>
            </SwiperSlide>
        ))}
    </Swiper>
  
          <div className='flex flex-col max-w-4xl mx-auto my-7 gap-4 p-3'>
         
            <p className='flex items-center mt-6 gap-2 text-[#435585] font-medium'>
            <img className='h-5 w-5' src={location} alt="" />
              {property.address}

            </p>

        <div className='flex'>
        
  <p className='bg-[#9CB4CC] h-10 font-serif font-bold px-14 text-white p-2 mr-4 rounded-md'>
    {property.propertyFor === 'rent' ? 'For Rent' : 'For Sell'}
  </p>

<Link onClick={(e) => { e.preventDefault(); checkoutHandler(); }}>
    <button className='flex-1 h-10 bg-black text-white hover:text-black font-bold p-2 hover:bg-[#EFFFFB] border border-black rounded px-14'>
      Book Now
    </button>
  </Link>

                <div className='mr-5 ml-52 flex justify-center items-center cursor-pointer'> 
                {!isYourProperty && (
                  <>
                    {isWishlisted ? (
                      <>
                        <FaHeart
                          className="hover:cursor-pointer h-7 w-7"
                          onClick={(e) => removeFromWishlist( e)}
                        />
                
                      </>
                    ) : (
                      <>
                      <FaRegHeart
                            className="hover:cursor-pointer h-7 w-7"
                            onClick={(e) => addToWishlist( e)}
                          />

                      </>
                    )}
                  </>
                )}
                
                </div>
                <div className='border-[#1B4242] border-2 rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 shadow-md shadow-slate-500 cursor-pointer'>       
          
                <img className=''
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }} src="https://static.realestateindia.com/rei/images/share-icon-blue.svg" alt="" height="25" width="25"/>

            </div>
            {copied && (
              <p className='rounded-md text-[#1B4242] p-2'>
                Link copied!
              </p>
            )}
            </div>
              
         
            <h1 className='font-bold text-xl text-[#535C91]'>Property Description</h1>
            <p className='text-[#818FB4] mb-2'> {property.description}
            </p>
          

            <h1 className='font-bold text-xl text-[#535C91] '>Property Overview</h1>
            
            <div className= "flex flex-wrap gap-2">

            <div className="flex-1 p-3 border border-gray-300 m-2 w-1/2 lg:w-1/4 flex items-center justify-center shadow-md shadow-slate-400">        
                <div>
              <img className="mx-auto" src="https://static.realestateindia.com/rei/mobile-images/pf-img1.jpg"alt="" width="25" height="25" />
              <h3 className="text-center text-[#898AA6]">Property Type</h3>
              <p className="font-bold text-center text-[#393053] ">{property.propertyType}</p>
            </div>
            </div>

            <div className="flex-1 p-3 border border-gray-300 m-2 w-1/2 lg:w-1/4 flex items-center justify-center shadow-md shadow-slate-400">   
            <div>
              <img className="mx-auto" src="https://static.realestateindia.com/rei/images/pdoi-img2.jpg"alt="" width="25" height="25" />
              <h3 className="text-center text-[#898AA6]">location</h3>
              <p className="font-bold text-center text-[#393053] ">{property.locality}</p>
            </div>
            </div>

            <div className="flex-1 p-3 border border-gray-300 m-2 w-1/2 lg:w-1/4 flex items-center justify-center shadow-md shadow-slate-400">   
            <div>
              <img className="mx-auto" src="https://static.realestateindia.com/rei/images/pdoi-img12.jpg" alt="" width="25" height="25" />
              <h3 className="text-center text-[#898AA6]">Society</h3>
              <p className="font-bold text-center text-[#393053] ">{property.society}</p>
            </div>
            </div>

            </div>

            <div className= "flex flex-wrap gap-2">

            <div className="flex-1 p-3 border border-gray-300 m-2 w-1/2 lg:w-1/4 flex items-center justify-center shadow-md shadow-slate-400">   
            <div>
              <img className="mx-auto" src="https://static.realestateindia.com/rei/mobile-images/pf-img2.jpg"alt="" width="25" height="25" />
              <h3 className="text-center text-[#898AA6]">Configuration</h3>
              <p className="font-bold text-center text-[#393053] ">{property.carpetArea} Sq.ft.</p>
            </div>
            </div>

            <div className="flex-1 p-3 border border-gray-300 m-2 w-1/2 lg:w-1/4 flex items-center justify-center shadow-md shadow-slate-400">   
            <div>
              <img className="mx-auto" src="https://static.realestateindia.com/rei/images/pdoi-img4.jpg"alt="" width="25" height="25" />
              <h3 className="text-center text-[#898AA6]">Built Up Area</h3>
              <p className="font-bold text-center text-[#393053] ">{property.builtUpArea} Sq.ft.</p>
            </div>
            </div>

            <div className="flex-1 p-3 border border-gray-300 m-2 w-1/2 lg:w-1/4 flex items-center justify-center shadow-md shadow-slate-400">   
            <div>
              <img className="mx-auto" src="https://static.realestateindia.com/rei/mobile-images/pf-img7.jpg"alt="" width="25" height="25" />
              <h3 className="text-center text-[#898AA6]">Super Area</h3>
              <p className="font-bold text-center text-[#393053] ">{property.superArea} Sq.ft.</p>
            </div>
            </div>

            </div>


            <div className= "flex flex-wrap gap-2">

            <div className="flex-1 p-3 border border-gray-300 m-2 w-1/2 lg:w-1/4 flex items-center justify-center shadow-md shadow-slate-400">   
            <div>
              <img className="mx-auto" src="https://static.realestateindia.com/rei/mobile-images/pf-img9.jpg"alt="" width="25" height="25" />
              <h3 className="text-center text-[#898AA6]">Possession Status</h3>
              <p className="font-bold text-center text-[#393053] ">{property.availability}</p>
            </div>
            </div>

            <div className="flex-1 p-3 border border-gray-300 m-2 w-1/2 lg:w-1/4 flex items-center justify-center shadow-md shadow-slate-400">   
            <div>
              <img className="mx-auto" src="https://static.realestateindia.com/rei/mobile-images/pf-img3.jpg"alt="" width="25" height="25" />
              <h3 className="text-center text-[#898AA6]">Total Price</h3>
              <p className="font-bold text-center text-[#393053] ">{property.expectedPrice}₹</p>
            </div>
            </div>

            <div className="flex-1 p-3 border border-gray-300 m-2 w-1/2 lg:w-1/4 flex items-center justify-center shadow-md shadow-slate-400">   
            <div>
              <img className="mx-auto" src="https://static.realestateindia.com/rei/mobile-images/pf-img10.jpg" alt="" width="25" height="25" />
              <h3 className="text-center text-[#898AA6]">Total Floors</h3>
              <p className="font-bold text-center text-[#393053] ">{property.floor}</p>
            </div>
            </div>   
    </div>

    <h1 className='ml-2 font-bold text-xl text-[#535C91]'>Amenities</h1>

          <div className="grid grid-cols-3 ml-2 gap-6">

              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-[#393053]'>
              <img src="https://static.realestateindia.com/rei/images/pdoi-img3.jpg" alt="" width="25" height="25 "/>
                {property.bedrooms > 1
                  ? `${property.bedrooms} beds `
                  : `${property.bedrooms} bed `}
              </li>

              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-[#393053]'>

              <img src="https://static.thenounproject.com/png/503907-200.png" alt="" width="25" height="25 "/>
                {property.bedrooms > 1
                  ? `${property.balconies} balconies `
                  : `${property.balconies} balcony`}
              </li>
                       <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-[#393053]'>

              <img src="https://static.realestateindia.com/rei/images/icon-bathroom.svg" alt="" width="25" height="25 "/>
                {property.bathrooms > 1
                  ? `${property.bathrooms} baths `
                  : `${property.bathrooms} bath `}
              </li>


              {property.carParking && (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-[#393053]text-[#898AA6] '>

                             <img src="https://static.realestateindia.com/rei/images/visitor-parking.jpg" alt="" width="25" height="25 "/>

                Parking spot
              </li>
            )}
              {property.furnished && (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-[#393053]'>

                             <img src="https://static.realestateindia.com/rei/images/luxury-retail.jpg" alt="" width="25" height="25 "/>

                Furnished
              </li>
            )}

               {property.powerBackup&& (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-[#393053]'>

                             <img src="https://static.realestateindia.com/rei/images/power-backup.jpg" alt="" width="25" height="25 "/>

               Power Backup
              </li>
            )}

            {property.security&& (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-[#393053]'>

                             <img src="https://static.realestateindia.com/rei/images/home-security.jpg" alt="" width="25" height="25 "/>

                             24 x 7 Security
              </li>
            )}

              {property.lift && (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-[#393053]'>

                             <img src="https://static.realestateindia.com/rei/images/lift.jpg" alt="" width="25" height="25 "/>

                Lift
              </li>
              )}

              {property.maintenanceStaff && (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-[#393053]'>

                             <img src="https://static.realestateindia.com/rei/images/maintenance-staff.jpg" alt="" width="25" height="25 "/>

                Maintenance Staff
              </li>
            )}

              {property.fireAlarm && (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-[#393053]'>

              <img src="https://static.realestateindia.com/rei/images/fire-alarm.jpg" alt="" width="25" height="25 "/>

              Security / Fire Alarm
              </li>
              )}


              {property.pipedGas && (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-[#393053]'>

                             <img src="https://static.realestateindia.com/rei/images/piped-gas.jpg" alt="" width="25" height="25 "/>

                Piped Gas
              </li>
            )}

              {property.park && (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-[#393053]'>

                             <img src="https://static.realestateindia.com/rei/images/play-area.jpg" alt="" width="25" height="25 "/>

                Park
              </li>
            )}
          {property.swimmingPool && (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-[#393053]'>

                             <img src="https://static.realestateindia.com/rei/images/swimming-pool.jpg" alt="" width="25" height="25 "/>

                Swimming Pool
              </li>
            )}

            {property.other && (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-[#393053]'>

            <img src="https://www.trulia.com/images/icons/features/outdoor.svg" alt="" width="25" height="25 "/>

            Swimming Pool
            </li>
            )}        

</div>
            {currentUser && property.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-[#2D3250] text-white rounded-lg uppercase hover:opacity-95 p-3 shadow-md shadow-slate-600'
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact property={property} />}
          </div>

    </div>
   )}
   {/* <button className='w-32' onClick={downloadBrochure}>Download Brochure</button> */}
   </div>
  </main>
  );
}


export default ShowPost