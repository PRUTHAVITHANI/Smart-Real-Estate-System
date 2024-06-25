import React from 'react';
import { FaHome, FaBuilding, FaKey, FaCog } from 'react-icons/fa';

const Service = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-8">
        <section className="max-w-3xl mx-auto">
          <h1 className='font-bold text-xl sm:text-2xl mb-8 text-slate-800'>
            
            <span className='text-3xl font-bold text-slate-800'>Real Estate Services</span>
          </h1>
          <p className="text-gray-700 mb-8">
            Welcome to our real estate services page. We are dedicated to providing comprehensive real estate solutions to meet your needs.
          </p>

          <h2 className="text-2xl font-bold mb-2"><FaHome className='inline-block mr-2 text-xl'  /> Residential Property Services</h2>
          <p className="text-gray-700 mb-6">
            Whether you are buying or selling a home, our experienced real estate agents are here to guide you through the process. We offer personalized services to help you find the perfect home or sell your property at the best possible price.
          </p>

          <h2 className="text-2xl font-bold mb-2"><FaBuilding className='inline-block mr-2 text-xl' /> Commercial Real Estate</h2>
          <p className="text-gray-700 mb-6">
            For businesses looking for commercial spaces, we specialize in finding the right commercial properties. Our services include leasing, buying, and selling commercial real estate to meet your business goals.
          </p>

          <h2 className="text-2xl font-bold mb-2"><FaKey className='inline-block mr-2 text-xl' /> Property Management</h2>
          <p className="text-gray-700 mb-6">
            Our property management services ensure that your investment is well taken care of. From tenant screening to property maintenance, we handle the details, allowing you to enjoy the benefits of property ownership without the stress.
          </p>

          <h2 className="text-2xl font-bold mb-2"><FaCog className='inline-block mr-2 text-xl' /> Real Estate Consulting</h2>
          <p className="text-gray-700 mb-8">
            Our team of experts provides real estate consulting services to help you make informed decisions. Whether you are an investor or a homeowner, we offer insights and advice to maximize the value of your real estate investment.
          </p>

          {/* Add more sections for other services */}
        </section>
      </main>
    </div>
  );
};

export default Service;
