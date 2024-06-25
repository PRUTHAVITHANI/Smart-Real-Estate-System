import React from 'react';
import { FaHome, FaKey, FaBuilding, FaUserFriends } from 'react-icons/fa';

export default function About() {
  return (
    <div className='py-16 px-4 max-w-6xl mx-auto'>
      <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <span className=' text-3xl font-bold mb-10 text-slate-800 mr-4'> About </span>
        <span className=' text-3xl font-bold mb-10 text-slate-500'>Vithani</span>
        <span className=' text-3xl font-bold mb-10 text-slate-800'>Estate</span>
      </h1>

      <p className='mb-6 text-slate-1000'>
        <FaHome className='inline-block mr-2 text-xl text-slate-500' />
        Welcome to Vithani Estate, where your real estate journey transcends mere transactions to become an exciting and personalized experience. As a prominent real estate agency, we specialize in guiding clients through the intricacies of buying, selling, and renting properties in the most sought-after neighborhoods. Our seasoned team of agents is not just committed to facilitating seamless transactions; we are dedicated to ensuring your entire real estate experience is exceptional.
      </p>

      <p className='mb-6 text-slate-1000'>
        <FaKey className='inline-block mr-2 text-xl text-slate-500' />
        At Vithani Estate, our mission extends beyond the traditional scope of real estate services. We strive to be your trusted partners, working tirelessly to help you achieve your unique real estate goals. Our approach is grounded in providing expert advice, delivering personalized service, and cultivating a profound understanding of the local market dynamics. Whether you are embarking on a home-buying journey, selling a property close to your heart, or exploring rental opportunities, we stand by you at every step of the way.
      </p>

      <p className='mb-6 text-slate-1000'>
        <FaBuilding className='inline-block mr-2 text-xl text-slate-500' />
        Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.
      </p>

      <p className='mb-6 text-slate-1000'>
        <FaUserFriends className='inline-block mr-2 text-xl text-slate-500' />
        Join us at Vithani Estate, where real estate is more than just a business—it's a journey, an adventure, and a celebration of your unique story in the world of property ownership. Experience the difference with us, as we redefine what it means to embark on a real estate endeavor.
      </p>
    </div>
  );
}
