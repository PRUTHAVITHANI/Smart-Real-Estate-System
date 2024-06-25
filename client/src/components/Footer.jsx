import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  const email = 'pruthavithani5889@gmail.com';

  return (
      <>
      <div className='border-2 border-[#D2E0FB] '>

</div>
    <footer className="bg-[#ECF2FF] text-black flex flex-col md:flex-row">
      <div className="mb-8 md:mr-8 ml-20 mt-5">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="text-gray-500 mb-4">
          If you have any questions or would like to learn more about our real estate services, feel free to contact us. We're here to help!
        </p>

        <div className="flex items-center mb-4">
          <FaPhoneAlt className="h-5 w-5 mr-2 text-black" />
          <span className="text-black">123-456-7890</span>
        </div>
        <div className="flex items-center mb-4">
          <FaEnvelope className="h-5 w-5 mr-2 text-black" />
          <a href={`mailto:${email}`} className="text-black">{email}</a>
        </div>

        <div className="flex items-center mb-4">
          <FaMapMarkerAlt className="h-5 w-5 mr-2 text-black" />
          <span className="text-black">123 Main St, Cityville, State, 12345</span>
        </div>
      </div>

      <div className='flex flex-col mt-5'>
        <h3 className="text-lg font-bold mb-2">Quick Links</h3>

        <ul className="flex flex-col md:flex-row  ">

        <button className='h-10 px-5 m-2 hover:bg-[#7C93C3] rounded'>
          <li><Link to="/about" className="hidden sm:inline text-slate-700 font-bold">About Us</Link></li>
          </button>

          <button className='h-15 px-5 m-2 hover:bg-[#7C93C3] rounded'>
          <li><Link to="/services" className="hidden sm:inline text-slate-700 font-bold">Our Services</Link></li>
          </button>

          <button className='h-15 px-5 m-2 hover:bg-[#7C93C3] rounded'>
          <li><Link to="/search-bar" className="hidden sm:inline text-slate-700 font-bold">All Properties</Link></li>
          </button>

          <button className='h-15 px-5 m-2 hover:bg-[#7C93C3] rounded'>
          <li><Link to="/contact" className="hidden sm:inline text-slate-700 font-bold">Contact Us</Link></li>
          </button>
        </ul>
      </div>
    </footer>
    </>
  );
}

export default Footer;
