import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WishlistCard from "./WishlistCard";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux';
import ProfileNav from "../../../components/ProfileNav";
import { Link } from "react-router-dom";


const Wishlist = () => {
  const {currentUser} = useSelector((state)=> state.user);
  const [wishlist, setWishlist] = useState([]);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!currentUser._id) {
        return;
    }

    setIsLoading(true);
    fetch(`/api/wishlist/getallwishlist/${currentUser._id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((res) => {
            console.log(res);
            setIsLoading(false);
            if (res.success) {
                setWishlist(res.properties);
            } else {
                toast(res.message, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });
}, [isRemoved]);


  return (
  
   <>
     <div className='flex flex-col md:flex-row'>
      <ProfileNav />

   <div className='md:w-3/4 p-5 bg-[#F3F8FF]'>
      <h1 className='text-center mt-7 mb-7 text-4xl  italic font-mono font-semibold  text-[#435585]'>
            Your Saved Property
          </h1>
          
      <div className="my-6" style={{ height: '2px', backgroundColor: '#435585' }}></div>

      <div className="max-w-7xl mx-auto  flex flex-col gap-8 ">
        {wishlist && wishlist.length > 0 && (
          <div className="">
            <div className="my-3">
            <div className=" text-center mb-7 mt-7">
</div>

       
            </div>
            <div className="grid grid-cols-3 gap-14 items-center justify-center h-full">
  {wishlist.map((property) => (
    <WishlistCard property={property} key={property._id} 
    setIsRemoved={setIsRemoved}
    isLoading={isLoading}
    setIsLoading={setIsLoading} />
  ))}

</div>

             
            </div>
            
        )}
      </div>

      {isLoading && (
        <>
          <div className="flex justify-center items-center">
            <ReactLoading type="balls" color="#164e63" width="200px" />
          </div>
        </>
      )}
      {!isLoading && wishlist.length == 0 && (
        <>
          <h1 className="flex mb-64 justify-center items-center text-4xl text-gray-400">
            Wishlist is empty
          </h1>
        </>
      )}


      </div>

   

    </div>
    
   </>

  )};

  export default Wishlist;