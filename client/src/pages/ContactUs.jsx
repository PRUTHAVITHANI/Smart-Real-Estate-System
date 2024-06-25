import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ContactUs = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form...');

    try {
      const res = await fetch('/api/contact/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        setContactSuccess(false);
        setErrorMessage(data.message); // Set the error message
        return;
      }

      setContactSuccess(true);
      setErrorMessage(''); // Clear the error message on success
    } catch (error) {
      console.error(error.message);
      setContactSuccess(false);
      setErrorMessage('Failed to submit the form. Please try again.'); // Set a generic error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-16 mb-10">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white shadow-md rounded">
        <h1 className="text-3xl font-bold mb-6 text-center text-slate-700">Contact <span className='text-3xl font-bold mb-6 text-center text-slate-800' >Us</span> </h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter your name here...'
            defaultValue={currentUser.username}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter your email here...'
            defaultValue={currentUser.email}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder='Write your message here...'
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          />
        </div>
        <button
          type="submit"
          className=" text-white  bg-[rgb(52,115,126)]  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Submit
        </button>
        <p className='text-red-700 mt-5'>{errorMessage}</p>
        <p className='text-green-700 mt-5'>{contactSuccess ? 'Successfully contacted!!' : ''}</p>      
      </form>
    </div>
  );
}

export default ContactUs;
