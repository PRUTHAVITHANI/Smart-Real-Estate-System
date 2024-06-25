import React, { useState , userRef , useEffect} from 'react'
import { useSelector } from 'react-redux';
import {useParams} from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import Contact from '../../components/Contact';
import location from "../../assets/image/location.png";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHeader from './AdminHeader';
import AdminNav from './AdminNav';
 

function DetailProperty() {
    SwiperCore.use(Navigation);
    const {currentUser} = useSelector((state)=> state.user);

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isYourProperty, setIsYourProperty] = useState(false);

    const params = useParams();

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
                console.log(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
                
            }
        }
        fetchProperty();
    }, [params.propertyId]);

  



  return  ( 
    <>
    <div className='flex flex-auto'>
    <AdminNav/>

    <div className='w-4/5'>
    <AdminHeader/>

    {loading && <p className='text-center my-7 text-2xl text-[#8EACCD]'>Loading...</p>}
    {error && <p className='text-center my-7 text-2xl'>Something went wrong</p>}
    {property && !loading && !error && (
    
    <div className='shadow-2xl shadow-slate-600 md:min-h-screen p-1 bg-gray-900'>
    <Swiper navigation>
        {property.imageUrls.map((url) => (
            <SwiperSlide key={url}>
      <div className='h-[550px] rounded ' style={{background: `url(${url}) center no-repeat` , backgroundSize: 'cover'}}></div>
            </SwiperSlide>
        ))}
    </Swiper>
  
          <div className='flex flex-col max-w-4xl mx-auto my-7 gap-4 p-3'>
           
            <p className='flex items-center mt-6 gap-2 text-white font-medium'>
            <img className='h-5 w-5 text-white' src={location} alt="" />
              {property.address}

            </p>

        <div className='flex'>
            <div className='gap-4 flex-auto'>
              <p className='bg-gray-700 font-serif font-bold w-full max-w-[200px] text-white items-center text-center p-1 rounded-md'>
                {property.propertyFor === 'rent' ? 'For Rent' : 'For Sell'}
              </p>
              </div>

              <div className='border-[#1B4242] border-2 rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 shadow-sm shadow-slate-500 cursor-pointer'>       
         
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
            <p className='rounded-md text-white p-2'>
              Link copied!
            </p>
          )}
          </div>
             
         
            <h1 className='font-bold text-xl text-white'>Property Description</h1>
            <p className='text-white mb-2'> {property.description}
            </p>
          

            <h1 className='font-bold text-xl text-white '>Property Overview</h1>
            
            <div className= "flex flex-wrap gap-2">

            <div className="flex-1 p-3 border border-gray-300 m-2 w-1/2 lg:w-1/4 flex items-center justify-center shadow-md shadow-slate-400">        
                <div>
              <img className="mx-auto" src="https://static.realestateindia.com/rei/mobile-images/pf-img1.jpg"alt="" width="25" height="25" />
              <h3 className="text-center text-white">Property Type</h3>
              <p className="font-bold text-center text-white ">{property.propertyType}</p>
            </div>
            </div>

            <div className="flex-1 p-3 border border-gray-300 m-2 w-1/2 lg:w-1/4 flex items-center justify-center shadow-md shadow-slate-400">   
            <div>
              <img className="mx-auto" src="https://static.realestateindia.com/rei/images/pdoi-img2.jpg"alt="" width="25" height="25" />
              <h3 className="text-center text-white">location</h3>
              <p className="font-bold text-center text-white ">{property.locality}</p>
            </div>
            </div>

            <div className="flex-1 p-3 border border-gray-300 m-2 w-1/2 lg:w-1/4 flex items-center justify-center shadow-md shadow-slate-400">   
            <div>
              <img className="mx-auto" src="https://static.realestateindia.com/rei/images/pdoi-img12.jpg" alt="" width="25" height="25" />
              <h3 className="text-center text-white">Society</h3>
              <p className="font-bold text-center text-white ">{property.society}</p>
            </div>
            </div>

            </div>

            <div className= "flex flex-wrap gap-2">

            <div className="flex-1 p-3 border border-gray-300 m-2 w-1/2 lg:w-1/4 flex items-center justify-center shadow-md shadow-slate-400">   
            <div>
              <img className="mx-auto" src="https://static.realestateindia.com/rei/mobile-images/pf-img2.jpg"alt="" width="25" height="25" />
              <h3 className="text-center text-white">Configuration</h3>
              <p className="font-bold text-center text-white ">{property.carpetArea} Sq.ft.</p>
            </div>
            </div>

            <div className="flex-1 p-3 border border-gray-300 m-2 w-1/2 lg:w-1/4 flex items-center justify-center shadow-md shadow-slate-400">   
            <div>
              <img className="mx-auto" src="https://static.realestateindia.com/rei/images/pdoi-img4.jpg"alt="" width="25" height="25" />
              <h3 className="text-center text-white">Built Up Area</h3>
              <p className="font-bold text-center text-white ">{property.builtUpArea} Sq.ft.</p>
            </div>
            </div>

            <div className="flex-1 p-3 border border-gray-300 m-2 w-1/2 lg:w-1/4 flex items-center justify-center shadow-md shadow-slate-400">   
            <div>
              <img className="mx-auto" src="https://static.realestateindia.com/rei/mobile-images/pf-img7.jpg"alt="" width="25" height="25" />
              <h3 className="text-center text-white">Super Area</h3>
              <p className="font-bold text-center text-white ">{property.superArea} Sq.ft.</p>
            </div>
            </div>

            </div>


            <div className= "flex flex-wrap gap-2">

            <div className="flex-1 p-3 border border-gray-300 m-2 w-1/2 lg:w-1/4 flex items-center justify-center shadow-md shadow-slate-400">   
            <div>
              <img className="mx-auto" src="https://static.realestateindia.com/rei/mobile-images/pf-img9.jpg"alt="" width="25" height="25" />
              <h3 className="text-center text-white">Possession Status</h3>
              <p className="font-bold text-center text-white ">{property.availability}</p>
            </div>
            </div>

            <div className="flex-1 p-3 border border-gray-300 m-2 w-1/2 lg:w-1/4 flex items-center justify-center shadow-md shadow-slate-400">   
            <div>
              <img className="mx-auto" src="https://static.realestateindia.com/rei/mobile-images/pf-img3.jpg"alt="" width="25" height="25" />
              <h3 className="text-center text-white">Total Price</h3>
              <p className="font-bold text-center text-white ">{property.expectedPrice}₹</p>
            </div>
            </div>

            <div className="flex-1 p-3 border border-gray-300 m-2 w-1/2 lg:w-1/4 flex items-center justify-center shadow-md shadow-slate-400">   
            <div>
              <img className="mx-auto" src="https://static.realestateindia.com/rei/mobile-images/pf-img10.jpg" alt="" width="25" height="25" />
              <h3 className="text-center text-white">Total Floors</h3>
              <p className="font-bold text-center text-white ">{property.floor}</p>
            </div>
            </div>   
    </div>

    <h1 className='ml-2 font-bold text-xl text-white'>Amenities</h1>

          <div className="grid grid-cols-3 ml-2 gap-6">

              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-white'>
              <img src="https://static.realestateindia.com/rei/images/pdoi-img3.jpg" alt="" width="25" height="25 "/>
                {property.bedrooms > 1
                  ? `${property.bedrooms} beds `
                  : `${property.bedrooms} bed `}
              </li>

              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-white'>

              <img src="https://static.thenounproject.com/png/503907-200.png" alt="" width="25" height="25 "/>
                {property.bedrooms > 1
                  ? `${property.balconies} balconies `
                  : `${property.balconies} balcony`}
              </li>
                       <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-white'>

              <img src="https://static.realestateindia.com/rei/images/icon-bathroom.svg" alt="" width="25" height="25 "/>
                {property.bathrooms > 1
                  ? `${property.bathrooms} baths `
                  : `${property.bathrooms} bath `}
              </li>


              {property.carParking && (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-whitetext-white '>

                             <img src="https://static.realestateindia.com/rei/images/visitor-parking.jpg" alt="" width="25" height="25 "/>

                Parking spot
              </li>
            )}
              {property.furnished && (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-white'>

                             <img src="https://static.realestateindia.com/rei/images/luxury-retail.jpg" alt="" width="25" height="25 "/>

                Furnished
              </li>
            )}

               {property.powerBackup&& (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-white'>

                             <img src="https://static.realestateindia.com/rei/images/power-backup.jpg" alt="" width="25" height="25 "/>

               Power Backup
              </li>
            )}

            {property.security&& (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-white'>

                             <img src="https://static.realestateindia.com/rei/images/home-security.jpg" alt="" width="25" height="25 "/>

                             24 x 7 Security
              </li>
            )}

              {property.lift && (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-white'>

                             <img src="https://static.realestateindia.com/rei/images/lift.jpg" alt="" width="25" height="25 "/>

                Lift
              </li>
              )}

              {property.maintenanceStaff && (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-white'>

                             <img src="https://static.realestateindia.com/rei/images/maintenance-staff.jpg" alt="" width="25" height="25 "/>

                Maintenance Staff
              </li>
            )}

              {property.fireAlarm && (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-white'>

              <img src="https://static.realestateindia.com/rei/images/fire-alarm.jpg" alt="" width="25" height="25 "/>

              Security / Fire Alarm
              </li>
              )}


              {property.pipedGas && (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-white'>

                             <img src="https://static.realestateindia.com/rei/images/piped-gas.jpg" alt="" width="25" height="25 "/>

                Piped Gas
              </li>
            )}

              {property.park && (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-white'>

                             <img src="https://static.realestateindia.com/rei/images/play-area.jpg" alt="" width="25" height="25 "/>

                Park
              </li>
            )}
          {property.swimmingPool && (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-white'>

                             <img src="https://static.realestateindia.com/rei/images/swimming-pool.jpg" alt="" width="25" height="25 "/>

                Swimming Pool
              </li>
            )}

            {property.other && (              <li className='flex items-center gap-1 whitespace-nowrap flex-cols-3 text-white'>

            <img src="https://www.trulia.com/images/icons/features/outdoor.svg" alt="" width="25" height="25 "/>

            Swimming Pool
            </li>
            )}        

</div>
           

            <h1 className='font-bold text-xl text-white'>Owner Details</h1>
            <div className='flex items-center gap-2'>
                                    {/* Display user avatar here */}
          {property.userRef.avatar && <img src={property.userRef.avatar} alt="User Avatar" className="h-14 w-14 rounded-full mr-7" />}
          <div>
            <p className='text-white mb-1 font-bold text-lg'> Name : {property.userRef.username} </p>
            <p className='text-white mb-1 font-bold text-lg'>Email :  {property.userRef.email} </p>
            <p className='text-white mb-1 font-bold text-lg'>MobileNo : {property.userRef.mobileno} </p>

          </div>
    </div>
    {currentUser && property.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-[#2D3250] text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact property={property} />}
    </div>
    </div>
   )}

</div>
  </div>
  </>
  );
}


export default DetailProperty