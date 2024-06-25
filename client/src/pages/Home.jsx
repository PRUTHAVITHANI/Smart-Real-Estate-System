import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import img from "../assets/image/home.png";
import ListingItem1 from "../components/ListingItem1";

export default function Home() {
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [allListings , setAllListings] = useState([]);

  SwiperCore.use([Navigation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search-bar?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/property/get?propertyFor=rent&limit=4");
        const data = await res.json();
        if (data.success === true) {
          console.log(data);
          return;
        }
        setRentListings(data);
        console.log(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/property/get?propertyFor=sell&limit=4");
        const data = await res.json();
        if (data.success === true) {
          console.log(data);
          return;
        }
        setSaleListings(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRentListings();
  }, []);

  
  useEffect(() => {
    fetchAllListings();
  }, []);

  const fetchAllListings = async () => {
    try {
      const res = await fetch("/api/property/get");
      const data = await res.json();
      if (data.success === true) {
        console.log(data);
        return;
      }
      setAllListings(data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="bg-[#ECF2FF] shadow-sm ">  
      {/* top */}
      <div className="flex flex-col gap-6 w-full px-3 ml-40 mx-auto">
        <div className="flex items-center mt-48">
          {" "}
          {/* Added flex container for text and image */}
          <div className="flex-1 mb-24">
            <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl mb-7">
              Find your next <span className="text-slate-500">perfect</span>
              <br />
              place with ease
            </h1>
            <div className="text-gray-500 text-xs sm:text-sm mb-4">
              Vithani Estate is the best place to find your next perfect place
              to live.
              <br />
              We have a wide range of properties for you to choose from.
            </div>
          

        <form onSubmit={handleSubmit} className="w-3/5 h-16 flex bg-[#7882A4] border-1 border-gray-500 shadow-md shadow-[#818FB4] hover:border-[#535C91] hover:bg-white hover:text-[#535C91] rounded-lg hover:opacity-95 disabled:opacity-80 sm:text-base">
            <input
              type='text'
              placeholder='Enter an adddress, neighborhood or city'
              className='bg-transparent ml-5 focus:outline-none w-full text-[#222831] text-xl font-sans'
              value={searchTerm} // Set value to sync with state
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className='text-[#352F44] mr-5 w-9 h-9 hover:text-slate-700 font-bold ' />
            </button>
          </form>

          </div>
          <div className="ml-6" style={styles.imageContainer}>
            <img src={img} alt="" style={styles.image} />
          </div>
        </div>
      </div>

  <div className=" text-center mb-7 mt-7">
  <h1 className="items-center font-sans font-bold text-4xl text-[#2D3250]">Properties For Sale or Rent</h1>
</div>

  
  {/* swiper */}
<Swiper navigation>
  {(allListings && allListings.length > 0) &&
    allListings.map((property) => (
      <SwiperSlide key={property._id}>
        <div
          style={{
            background: `url(${property.imageUrls[0]}) center no-repeat`,
            backgroundSize: 'cover',
          }}
          className='h-[600px]'
        ></div>
      </SwiperSlide>
    ))}
</Swiper>

      {/* listing results for offer, sale and rent */}


      <div className="max-w-7xl mx-auto  flex flex-col gap-8 ">
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
            <div className=" text-center mb-7 mt-7">
  <h1 className="items-center font-sans font-bold text-4xl text-[#2D3250]">Properties For Rent </h1>
</div>

       
            </div>
            <div className="grid grid-cols-3 gap-14 items-center justify-center h-full">
  {rentListings.map((property) => (
    <ListingItem1 property={property} key={property._id} />
  ))}

  <Link className='text-lg text-center items-center w-34 ml-10 mr-16 p-3 text-white font-semibold font-sans  hover:text-[#7882A4] border hover:border-[#7882A4] hover:bg-white bg-[#7882A4] rounded-xl self-center' to={'/search-bar?propertyFor=rent'}>Show More</Link>
</div>

             
            </div>
            
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="mb-10">
            <div className="my-3">
            <div className=" text-center mb-7 mt-7">
  <h1 className="items-center font-sans font-bold text-4xl text-[#2D3250]">Properties For Sale</h1>
</div>

<div className="grid grid-cols-3 gap-14 items-center justify-center h-full">
                {saleListings.map((property) => (
                  <ListingItem1 property={property} key={property._id} />
                ))}
                  <Link className='text-lg text-center items-center w-34 ml-10 mr-16 p-3 text-white font-semibold font-sans  hover:text-[#7882A4] border hover:border-[#7882A4] hover:bg-white bg-[#7882A4] rounded-xl self-center' to={'/search-bar?propertyFor=sell'}>Show More</Link>

              </div>
            </div>
          </div>
        )}
      </div>
     

    </div>
  );
}

//style

const styles = {
  imageContainer: {
    animation: "fadeIn 2s ease-in-out",
    position: "relative",
    width: "40%",
    height: "auto",
  },
  image: {
    position: "relative",
    top: "-56%",
    left: "-26%",
    transform: "translate(-100%, -50%)",
    animation: "moveUpDown 3s ease-in-out infinite alternate",
    // Add any additional styles for the image here
  },
};

const keyframes = `
  @keyframes moveUpDown {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-40px); // Adjust the value to control the vertical movement
    }
  }
`;

const styleTag = document.createElement("style");
styleTag.innerHTML = keyframes;
document.head.appendChild(styleTag);
