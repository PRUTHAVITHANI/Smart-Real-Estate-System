import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CiCalendarDate } from "react-icons/ci";
import { showLoading, hideLoading } from "../../redux/user/alertsSlice.js";



function LoanForm() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullname: "",
    birthDate: "",
    email: "",
    mobileno: "",
    address: "", // Personal address
    state: "", // Personal state
    city: "", // Personal city
    zipCode: "", // Personal zipCode
    placeOfWork: "",
    jobTitle: "",
    jobAddress: "", // Job/business address
    jobState: "", // Job/business state
    jobCity: "", // Job/business city
    jobZipCode: "", // Job/business zipCode
    monthlyNetIncome: "",
    creditScore: "R_760_",
    terms: "",
    requestedLoanAmount: "",
    interestAmount: "",
  });

  console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const res = await fetch("/api/loan/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      toast("Loan Form submitted successfully you will get repsonse soon", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      if (data.success == false) {
        console.log(data.message);
        toast(data.message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(hideLoading());
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="bg-[#ECF9FF] w-full">
   
        <form className="grid grid-cols-2 gap-5" onSubmit={handleSubmit}>
          <h1 className="col-span-2 mb-7 text-3xl text-center text-[#435585] mt-8 drop-shadow-2x italic font-mono font-semibold">
            Mortgage Loan Application Form
          </h1>

          <div className="mb-4 flex flex-cols-2 ml-16">
            <label
              htmlFor="fullname"
              className="text-[#535C91] font-semibold label block mb-2 mt-1 w-1/4 text-lg"
            >
              Full Name
            </label>
            <input
              type="text"
              placeholder="fullname"
              className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
              id="fullname"
              onChange={handleChange}
              value={formData.fullname}
              required
            />
          </div>



          <div className="mb-4 flex flex-cols-2 ml-16 relative">
            <label
              htmlFor="birthDate"
              className="text-[#535C91] font-semibold label block mb-2 mt-1 w-1/4 text-lg"
            >
              Birth Date
            </label>
            <div className="relative w-1/2">
              <input
                type="text"
                placeholder="EX: DD/MM/YYYY"
                className="border border-[#352F44] w-full p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
                id="birthDate"
                onChange={handleChange}
                value={formData.birthDate}
                required
              />
              <CiCalendarDate className="absolute w-9 h-9 top-1/2 right-4 transform -translate-y-1/2 text-[#435585] cursor-pointer" />
            </div>
          </div>


          <div className="mb-4 flex flex-cols-2 ml-16">
            <label
              htmlFor="email"
              className="text-[#535C91] font-semibold label block mb-2 mt-1 w-1/4 text-lg"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="email"
              className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
              id="email"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>

          <div className="mb-4 flex flex-cols-2 ml-16">
            <label
              htmlFor="mobileno"
              className="text-[#535C91] font-semibold label block mb-2 mt-1 w-1/4 text-lg"
            >
              Mobile No
            </label>
            <input
              type="number"
              placeholder="Mobile Number"
              className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
              id="mobileno"
              onChange={handleChange}
              value={formData.mobileno}
              required
            />
          </div>

          <div className="mb-4 flex flex-cols-2 ml-16">
            <label
              htmlFor="address"
              className="text-[#535C91] font-semibold label block mb-2 mt-1 w-1/4 text-lg"
            >
              Address
            </label>
            <input
              type="text"
              placeholder="Address"
              className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
              id="address"
              onChange={handleChange}
              value={formData.address}
              required
            />
          </div>

          <div className="mb-4 flex flex-cols-2 ml-16">
            <label
              htmlFor="state"
              className="text-[#535C91] font-semibold label block mb-2 mt-1 w-1/4 text-lg"
            >
              State
            </label>
            <input
              type="text"
              placeholder="State"
              className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
              id="state"
              onChange={handleChange}
              value={formData.state}
              required
            />
          </div>

          <div className="mb-4 flex flex-cols-2 ml-16">
            <label
              htmlFor="city"
              className="text-gray-800 label block  mb-2 mt-1 w-1/4 font-medium"
            >
              City
            </label>
            <input
              type="text"
              placeholder="City"
              className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
              id="city"
              onChange={handleChange}
              value={formData.city}
              required
            />
          </div>

          <div className="mb-4 flex flex-cols-2 ml-16">
            <label
              htmlFor="zipCode"
              className="text-[#535C91] font-semibold label block mb-2 mt-1 w-1/4 text-lg"
            >
              Zip Code
            </label>
            <input
              type="text"
              placeholder="Zip Code"
              className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
              id="zipCode"
              onChange={handleChange}
              value={formData.zipCode}
              required
            />
          </div>

          
          <div className="mt-3 flex col-span-2 border-2 ml-16 mr-16">
           
          </div>

          

          <h1 className="col-span-2 mb-7 text-3xl text-center text-[#435585] mt-6 drop-shadow-2x italic font-mono font-semibold">
            Job/business Information
          </h1>

          <div className="mb-4 flex flex-cols-2 ml-16">
            <label
              htmlFor="placeOfWork"
              className="text-[#535C91] font-semibold label block mb-2 mt-1 w-1/4 text-lg"
            >
              Place Of Work
            </label>
            <input
              type="text"
              placeholder="Place Of Work"
              className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
              id="placeOfWork"
              onChange={handleChange}
              value={formData.placeOfWork}
              required
            />
          </div>

          <div className="mb-4 flex flex-cols-2 ml-16">
            <label
              htmlFor="jobTitle"
              className="text-[#535C91] font-semibold label block mb-2 mt-1 w-1/4 text-lg"
            >
              Job Title
            </label>
            <input
              type="text"
              placeholder="Job Title"
              className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
              id="jobTitle"
              onChange={handleChange}
              value={formData.jobTitle}
              required
            />
          </div>

          <div className="mb-4 flex flex-cols-2 ml-16">
            <label
              htmlFor="jobAddress"
              className="text-[#535C91] font-semibold label block mb-2 mt-1 w-1/4 text-lg"
            >
              Job Address
            </label>
            <input
              type="text"
              placeholder="Job Address"
              className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
              id="jobAddress" // Update the id to "jobAddress"
              onChange={handleChange}
              value={formData.jobAddress} // Update the value to formData.jobAddress
              required
            />
          </div>

          <div className="mb-4 flex flex-cols-2 ml-16">
            <label
              htmlFor="jobState"
              className="text-[#535C91] font-semibold label block mb-2 mt-1 w-1/4 text-lg"
            >
              Job State
            </label>
            <input
              type="text"
              placeholder="Job State"
              className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
              id="jobState" // Update the id to "jobState"
              onChange={handleChange}
              value={formData.jobState} // Update the value to formData.jobState
              required
            />
          </div>

          <div className="mb-4 flex flex-cols-2 ml-16">
            <label
              htmlFor="jobCity"
              className="text-[#535C91] font-semibold label block mb-2 mt-1 w-1/4 text-lg"
            >
              Job City
            </label>
            <input
              type="text"
              placeholder="Job City"
              className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
              id="jobCity" // Update the id to "jobCity"
              onChange={handleChange}
              value={formData.jobCity} // Update the value to formData.jobCity
              required
            />
          </div>

          <div className="mb-4 flex flex-cols-2 ml-16">
            <label
              htmlFor="jobZipCode"
              className="text-[#535C91] font-semibold label block mb-2 mt-1 w-1/4 text-lg"
            >
              Job Zip Code
            </label>
            <input
              type="text"
              placeholder="Job Zip Code"
              className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
              id="jobZipCode" // Update the id to "jobZipCode"
              onChange={handleChange}
              value={formData.jobZipCode} // Update the value to formData.jobZipCode
              required
            />
          </div>

          <div className="mt-3 flex col-span-2 border-2 ml-16 mr-16">
           
           </div>


          <h1 className="col-span-2 mb-7 text-3xl text-center text-[#435585] mt-6 drop-shadow-2x italic font-mono font-semibold">
            Other Details
          </h1>

          <div className="mb-4 flex flex-cols-2 ml-16">
            <label
              htmlFor="monthlyNetIncome"
              className="text-[#535C91] font-semibold label block mb-2 mt-1 w-1/4 text-lg"
            >
              Monthly Net Income
            </label>
            <input
              type="text"
              placeholder="EX: ₹10000.00"
              className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
              id="monthlyNetIncome"
              onChange={handleChange}
              value={formData.monthlyNetIncome}
              required
            />
          </div>

          <div className="mb-4 flex flex-cols-2 ml-16">
            <label
              htmlFor="creditScore"
              className="text-[#535C91] font-semibold label block mb-2 mt-1 w-1/4 text-lg"
            >
              Credit Score
            </label>
            <select
              id="creditScore"
              name="creditScore"
              className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
              onChange={handleChange}
              defaultValue={currentUser.creditScore}
              required
            >
              <option value="R_760_" selected="">
                760 and above
              </option>
              <option value="R_740_759">740-759</option>
              <option value="R_720_739">720-739</option>
              <option value="R_700_719">700-719</option>
              <option value="R_680_699">680-699</option>
              <option value="R_660_679">660-679</option>
              <option value="R_640_659">640-659</option>
              <option value="R_620_639">620-639</option>
              <option value="R_600_619">600-619</option>
              <option value="R_560_599">560-599</option>
              <option value="R_300_559">300-559</option>
            </select>
          </div>

          <div className="mb-4 flex flex-cols-2 ml-16">
            <label
              htmlFor="terms"
              className="text-[#535C91] font-semibold label block mb-2 mt-1 w-1/4 text-lg"
            >
              Terms
            </label>
            <select
              id="terms"
              name="terms"
              className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
              onChange={handleChange}
              defaultValue={currentUser.terms}
              required
            >
              <option value="1 year">1 year</option>
              <option value="2 year">2 year</option>
              <option value="3 year">3 year</option>
              <option value="4 year">4 year</option>
              <option value="5 year">5 year</option>
              <option value="6 year">6 year</option>
              <option value="7 year">7 year</option>
              <option value="8 year">8 year</option>
              <option value="9 year">9 year</option>
              <option value="10 year">10 year</option>
            </select>
          </div>

          <div className="mb-4 flex flex-cols-2 ml-16">
            <label
              htmlFor="requestedLoanAmount"
              className="text-[#535C91] font-semibold label block mb-2 mt-1 w-1/4 text-lg"
            >
               Loan Amount
            </label>
            <input
              type="text"
              placeholder="EX: ₹10000.00"
              className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
              id="requestedLoanAmount"
              onChange={handleChange}
              value={formData.requestedLoanAmount}
              required
            />
          </div>

          <div className="mb-4 flex flex-cols-2 ml-16">
            <label
              htmlFor="interestAmount"
              className="text-[#535C91] font-semibold label block mb-2 mt-1 w-1/4 text-lg"
            >
              Interest Amount
            </label>
            <input
              type="text"
              placeholder="EX: ₹10000.00"
              className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
              id="interestAmount"
              onChange={handleChange}
              value={formData.interestAmount}
              required
            />
          </div>

          <div className="col-span-2 text-center ml-36 mb-10 mt-20 mr-40">
            <button
              type="submit"
              className={`border-2 font-serif text-lg bg-[#748DA6] w-1/4 text-[#0E2954] font-bold py-2 px-4 rounded hover:border-[#748DA6] hover:bg-[#ECF9FF] hover:text-[#748DA6] `}
            >
              Apply For Loan
            </button>
          </div>
        </form>
      
      </div>
   
    </>
  );
}

export default LoanForm;
