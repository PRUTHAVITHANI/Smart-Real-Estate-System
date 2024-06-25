import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PredictionForm = () => {
  const location = useLocation(); // Initialize useLocation
  const [prediction, setPrediction] = useState(null);
  const [formData, setFormData] = useState({
    Gender: '',
    Married: '',
    Education: '',
    Self_Employed: '',
    ApplicantIncome: '',
    CoapplicantIncome: '',
    LoanAmount: '',
    Loan_Amount_Term: '',
    Credit_History: '',
    Property_Area: ''
  });

  useEffect(() => {
    if (location.state && location.state.prediction !== undefined) {
      setPrediction(location.state.prediction);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok - ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (!data.prediction) {
        throw new Error('Prediction data not available');
      }
      console.log('Prediction data:', data); 
      setPrediction(data.prediction); // Set prediction result
    } catch (error) {
      console.error('Error:', error);
      // You can handle errors here, such as displaying a toast notification to the user
    }
  };

  
  return (
    <div className='w-full bg-[#ECF9FF] '>

<form className="grid grid-cols-2 gap-5" onSubmit={handleSubmit}>

<h1 className="col-span-2 mb-10 text-4xl ml-24 text-center mr-28 text-[#435585] mt-12 drop-shadow-2x italic font-mono font-semibold">Predict Home Loan Approval</h1>

        <div className="mb-4 flex flex-cols-2 ml-20">
          <label htmlFor="Gender" className="text-[#535C91] font-semibold label block  text-lg mr-8 mb-2 mt-1 w-44">Gender</label>
          <select id="Gender" name="Gender" value={formData.Gender} onChange={handleChange} className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]">
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-4 flex flex-cols-2 ml-20">
          <label htmlFor="Married" className="text-[#535C91] font-semibold label block  text-lg mr-8 mb-2 mt-1 w-44">Married</label>
          <select id="Married" name="Married" value={formData.Married} onChange={handleChange} className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]">
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="mb-4 flex flex-cols-2 ml-20">
          <label htmlFor="Education" className="text-[#535C91] font-semibold label block  text-lg mr-8 mb-2 mt-1 w-44">Education</label>
          <select id="Education" name="Education" value={formData.Education} onChange={handleChange} className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]">
            <option value="">Select</option>
            <option value="Graduate">Graduate</option>
            <option value="Not Graduate">Not Graduate</option>
          </select>
        </div>
        <div className="mb-4 flex flex-cols-2 ml-20">
          <label htmlFor="Self_Employed" className="text-[#535C91] font-semibold label block  text-lg mr-8 mb-2 mt-1 w-44">Self Employed</label>
          <select id="Self_Employed" name="Self_Employed" value={formData.Self_Employed} onChange={handleChange} className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]">
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="mb-4 flex flex-cols-2 ml-20">
          <label htmlFor="ApplicantIncome" className="text-[#535C91] font-semibold label block  text-lg mr-8 mb-2 mt-1 w-44">Applicant Income</label>
          <input type="text" id="ApplicantIncome" placeholder="Applicant Income(per month)" name="ApplicantIncome" value={formData.ApplicantIncome} onChange={handleChange} className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]" />
        </div>
        <div className="mb-4 flex flex-cols-2 ml-20">
          <label htmlFor="CoapplicantIncome" className="text-[#535C91] font-semibold label block  text-lg mr-8 mb-2 mt-1 w-44">Coapplicant Income</label>
          <input type="text" id="CoapplicantIncome" placeholder='Coapplicant Income(per month)' name="CoapplicantIncome" value={formData.CoapplicantIncome} onChange={handleChange} className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]" />
        </div>
        <div className="mb-4 flex flex-cols-2 ml-20">
          <label htmlFor="LoanAmount" className="text-[#535C91] font-semibold label block  text-lg mr-8 mb-2 mt-1 w-44">Loan Amount</label>
            <input type="text" id="LoanAmount" placeholder='Loan Amount in ₹' name="LoanAmount" value={formData.LoanAmount} onChange={handleChange} className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]" />
          </div>
          <div className="mb-4 flex flex-cols-2 ml-20">
            <label htmlFor="Loan_Amount_Term" className="text-[#535C91] font-semibold label block  text-lg mr-8 mb-2 mt-1 w-44">Loan Term</label>
            <input type="text" id="Loan_Amount_Term" placeholder='Loan Term(in month)' name="Loan_Amount_Term" value={formData.Loan_Amount_Term} onChange={handleChange} className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]" />
          </div>
          <div className="mb-4 flex flex-cols-2 ml-20">
            <label htmlFor="Credit_History" className="text-[#535C91] font-semibold label block  text-lg mr-8 mb-2 mt-1 w-44">Credit History</label>
            <select id="Credit_History" name="Credit_History" value={formData.Credit_History} onChange={handleChange} className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]">
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
          <div className="mb-4 flex flex-cols-2 ml-20">
            <label htmlFor="Property_Area" className="text-[#535C91] font-semibold label block  text-lg mr-8 mb-2 mt-1 w-44">Property Area</label>
            <select id="Property_Area" name="Property_Area" value={formData.Property_Area} onChange={handleChange} className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]">
              <option value="">Select</option>
              <option value="Urban">Urban</option>
              <option value="Semiurban">Semiurban</option>
              <option value="Rural">Rural</option>
            </select>
          </div>

          {prediction !== null ? (
  <div className="container mx-auto col-span-2">
    <div className="flex justify-center mb-20 mt-10">
      <div className="">
        {prediction[0] === 0 && <h1 className='text-[#435585]'>No, You are not eligible for Home loan</h1>}
        {prediction[0] === 1 && (
          <>
            <h1 className='text-[#435585] text-2xl font-sans mb-5'>Yes, You are eligible for Home loan</h1>
            <Link to="/loan-form" className="font-serif text-lg ml-24 w-96 p-2 mr-40 text-[#0E2954] font-bold rounded hover:border-[#748DA6] hover:bg-[#ECF9FF] hover:text-[#748DA6]">
              Apply For Loan
            </Link>
          </>
        )}
      </div>
    </div>
  </div>
) : (
  <div className='col-span-2 text-center mt-10 mb-20 mr-40'>
    <button type="submit" className="border-2 font-serif text-lg ml-24 bg-[#748DA6] w-1/4 text-[#0E2954] font-bold py-2 px-4 rounded hover:border-[#748DA6] hover:bg-[#ECF9FF] hover:text-[#748DA6]">
      Predict
    </button>
  </div>
)}


        </form>
   


      </div>
   
  );
};

export default PredictionForm;
