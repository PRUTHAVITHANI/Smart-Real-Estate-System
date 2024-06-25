import React, { useState , userRef } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
import AdminNav from '../AdminNav';
import AdminHeader from '../AdminHeader';

function APropertyDetail() {

  const [locationList, setLocationList] = useState([
    { label: 'Abhva, Surat', value: '18306' },
    { label: 'Adajan Honey Park, Surat', value: '12150' },
    { label: 'Adajan Patiya, Surat', value: '18315' },
    { label: 'Adajan, Surat', value: '9306' },
    { label: 'Althan, Surat', value: '9365' },
    { label: 'Ambika Nagar, Udhna, Surat', value: '33180' },
    { label: 'Amroli, Surat', value: '9439' },
    { label: 'Anand Mahal Road, Surat', value: '16081' },
    { label: 'Anaval, Surat', value: '15317' },
    { label: 'Asunder, Surat', value: '14302' },
    { label: 'Athwa Gate, Surat', value: '13695' },
    { label: 'Athwa Lines, Surat', value: '13699' },
    { label: 'Athwa, Surat', value: '13697' },
    { label: 'Badekha Chakla, Surat', value: '13701' },
    { label: 'Bajipura, Surat', value: '18325' },
    { label: 'Bamroli Road, Surat', value: '18329' },
    { label: 'Barbodhan, Surat', value: '19432' },
    { label: 'Bardoli, Surat', value: '715' },
    { label: 'Begampura, Surat', value: '13627' },
    { label: 'Bhagal, Surat', value: '13713' },
    { label: 'Bhanodra, Surat', value: '18323' },
    { label: 'Bhatar Road, Surat', value: '18309' },
    { label: 'Bhatar, Surat', value: '13637' },
    { label: 'Bhatena, Surat', value: '23451' },
    { label: 'Bhestan, Surat', value: '13543' },
    { label: 'Bhimrad, Surat', value: '13710' },
    { label: 'Canal Road, Surat', value: '13715' },
    { label: 'Causeway Road, Surat', value: '18330' },
    { label: 'Chalthan, Surat', value: '733' },
    { label: 'Chauta Bazar, Surat', value: '18304' },
    { label: 'Chauta Pul, Surat', value: '13709' },
    { label: 'Chhaprabhatha, Surat', value: '737' },
    { label: 'Choryasi, Surat', value: '27372' },
    { label: 'City Light, Surat', value: '15297' },
    { label: 'Dabholi, Surat', value: '13703' },
    { label: 'Dahin Nagar, Surat', value: '29166' },
    { label: 'Danda, Surat', value: '28020' },
    { label: 'Dandi Road, Surat', value: '18317' },
    { label: 'Deladva, Surat', value: '13626' },
    { label: 'Devadh, Surat', value: '18318' },
    { label: 'Dhamdod, Surat', value: '18320' },
    { label: 'Dharam Nagar, Surat', value: '13630' },
    { label: 'Dindoli, Surat', value: '13693' },
    { label: 'Dumas Road, Surat', value: '18305' },
    { label: 'Dumas, Surat', value: '13623' },
    { label: 'Dundi, Surat', value: '29311' },
    { label: 'Gabheni, Surat', value: '33475' },
    { label: 'Gaurav Path, Surat', value: '13712' },
    { label: 'Ghod Dod Road, Surat', value: '9466' },
    { label: 'Godadara, Surat', value: '13636' },
    { label: 'Gopipura, Surat', value: '24376' },
    { label: 'Haripura, Surat', value: '28231' },
    { label: 'Hazira Road, Surat', value: '13714' },
    { label: 'Hazira, Surat', value: '19187' },
    { label: 'Hojiwala Industrial Estate, Surat', value: '21789' },
    { label: 'Ichchhapor, Surat', value: '776' },
    { label: 'Jahangirabad, Surat', value: '16090' },
    { label: 'Jahangirpura, Surat', value: '9472' },
    { label: 'Kadodara, Surat', value: '791' },
    { label: 'Kailash Nagar, Dindoli, Surat', value: '32553' },
    { label: 'Kalidas Nagar, Surat', value: '27025' },
    { label: 'Kamrej, Surat', value: '13532' },
    { label: 'Karadva Gam, Surat', value: '19433' },
    { label: 'Karamla, Surat', value: '18335' },
    { label: 'Katargam, Surat', value: '9443' },
    { label: 'Kathor, Surat', value: '33694' },
    { label: 'Kawas Gam, Surat', value: '18336' },
    { label: 'Khajod, Surat', value: '18324' },
    { label: 'Kharvasa, Surat', value: '21788' },
    { label: 'Khatodra Wadi, Surat', value: '28771' },
    { label: 'Khodiyar Nagar, Surat', value: '18331' },
    { label: 'Kim, Surat', value: '13625' },
    { label: 'Kosad, Surat', value: '9449' },
    { label: 'Kosamba, Surat', value: '811' },
    { label: 'Kumbharia, Surat', value: '13634' },
    { label: 'L&t Bachelor Colony, Vesu, Surat', value: '12158' },
    { label: 'L&t Housing Colony, Vesu, Surat', value: '12159' },
  ]);

  const { currentUser} = useSelector((state) => state.user);
  
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email:currentUser.email,
    password: '',
    userType: currentUser.userType,
    location: currentUser.location,
    mobileNo: currentUser.mobileNo,
    propertyFor: '',
    propertyType: '',
    state: '',
    city: '',
    locality: '',
    society: '',
    address: '',
    saleType: '',
    ownership: '',
    floor: '',
    availability: '',
    propertyFloor: '',
    builtUpArea: 1000,
    carpetArea: 1000,
    superArea: 10000,
    expectedPrice: 3000000,
    bookingAmount: 500000,
    maintenanceCharges: 1500,
    bedrooms: 1,
    bathrooms: 1,
    balconies: 1,
    description: '',
  
  });
  console.log(formData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { type, id, name, value, checked } = e.target;
  
    if (type === 'radio') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

    } else if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [id]: checked,
      }));
      
    } else if (type === 'number' || type === 'text' || type === 'textarea') {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
      
    } else{
          setFormData({ 
            ...formData,
             [e.target.id]: e.target.value });
        }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const res = await fetch('/api/property/create', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            userRef : currentUser._id
        }),
        });
        const data = await res.json();
        toast('Property added successfully', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        if(data.success == false){
         console.log(data.message);
         toast(data.message, {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    }

       navigate(`/admin/post-listing/update-property/${data._id}`);
        
    } catch (error) {
        console.log(error.message);
    }
  }


  return (
    <>
        
        <div className="flex flex-auto">
    <AdminNav/>
    <div className="w-full">
      <AdminHeader/>
      <div className='w-full bg-[#1A202C] text-white"'>
          <form className="grid grid-cols-2 gap-5" onSubmit={handleSubmit} >

          <h1 className="col-span-2  text-5xl ml-36 mr-28 text-white mt-20 drop-shadow-2x  font-mono font-semibold  ">Add Property</h1>

      <h1 className="col-span-2 mb-10 text-4xl ml-24  text-center mr-28 mt-5 text-white  drop-shadow-2x italic font-mono font-semibold  ">Property Info & address</h1>

      <div className="mb-4 flex flex-cols-2 ml-40">
  <label
    htmlFor="Property for"
    className="text-white font-semibold label block  text-lg mr-8 mb-2 mt-1 w-48"
  >
    Property for
  </label>
  <div className="flex items-center">
    <input
      type="radio"
      className="mr-2"
      id="sell"
      name="propertyFor"  // Add name attribute
      onChange={handleChange}
      value="sell"
      checked={formData.propertyFor === 'sell'}
    />
    <label htmlFor="sell" className="mr-4 text-white">
      Sell
    </label>
    <input
      type="radio"
      className="mr-2"
      id="rent" 
      name="propertyFor"  // Add name attribute
      onChange={handleChange}
      value="rent"
      checked={formData.propertyFor === 'rent'}
    />
    <label htmlFor="rent"  className="mr-4 text-white">Rent</label>
  </div>
</div>


      <div className="mb-4 flex flex-cols-2 ml-20">
        <label
          htmlFor="Property Type"
          className="text-white font-semibold label block  text-lg mr-8 mb-2 mt-1 w-48"
        >
          Property Type
        </label>
        <select
          id="propertyType"
          name="propertyType"
          onChange={handleChange} 
          value={formData.propertyType}
          className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
        >
          <option value="">Select Property type</option>
          <option value="Flat/Apartment">Flat/Apartment</option>
          <option value="Independence Home">Independence Home</option>
          <option value="Residential Plot">Residential Plot</option>
          <option value="Office Space">Office Space</option>
          <option value="Farm House">Farm House</option>
          <option value="Penthouse">Penthouse</option>
          <option value="Business center">Business center</option>
          <option value="Hotel/Restaurant">Hotel/Restaurant</option>
        </select>
      </div>

      <div className="mb-4 flex flex-cols-2 ml-40">
        <label
          htmlFor="state"
          className="text-white font-semibold label block  text-lg mr-8 mb-2 mt-1 w-48"
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
        />
      </div>

      <div className="mb-4 flex flex-cols-2 ml-20">
        <label
          htmlFor="city"
          className="text-white font-semibold label block  text-lg mr-8 mb-2 mt-1 w-48"
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
        />
      </div>

      <div className="mb-4 flex flex-cols-2 ml-40">
        <label
          htmlFor="locality"
          className="text-white font-semibold label block  text-lg mr-8 mb-2 mt-1 w-48"
        >
           Locality
        </label>
        <select
          id="locality"
          name="locality"
          onChange={handleChange} 
          value={formData.locality}
          className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
        >
          
          <option value="">Select Location</option>
        {locationList.map((location) => (
          <option key={location.value} value={location.label}>
            {location.label}
          </option>
        ))}
        </select>
      </div>

      <div className="mb-4 flex flex-cols-2 ml-20">
        <label
          htmlFor="society"
          className="text-white font-semibold label block  text-lg mr-8 mb-2 mt-1 w-48"
        >
          Apartment / Society
        </label>
        <input
          type="text"
          placeholder="Apartment / Society"
          className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
          id="society"
          onChange={handleChange} 
          value={formData.society}
        />
      </div>

      <div className="mb-4 flex flex-cols-2 ml-40">
        <label
          htmlFor="address"
          className="text-white font-semibold label block  text-lg mr-8 mb-2 mt-1 w-48"
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
        />
      </div>

      <div className="mb-4 flex flex-cols-2 ml-40">
       
      </div>

      <div className="mb-4 flex col-span-2 border-2 ml-36 mr-36">
       
       </div>

    

      <h1 className="col-span-2 mb-10 text-4xl ml-24  text-center mr-28 text-white drop-shadow-2x italic font-mono font-semibold  ">
        Transaction Type, Property Avaliablity
      </h1>

      <div className="mb-4 flex flex-cols-2 ml-40">
        <label
          htmlFor="Property Type"
          className="text-white font-semibold label block  text-lg mr-8 mb-2 mt-1 w-48"
        >
          Sale Type
        </label>
        <select
          id="saleType"
          name="saleType"
          onChange={handleChange} 
          value={formData.saleType}
          className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
        >
          <option value="">Select</option>
          <option value="Resale Property">Resale Property</option>
          <option value="New Property">New Property</option>
        </select>
      </div>

      <div className="mb-4 flex flex-cols-2 ml-40">
        <label
          htmlFor="Property Type"
          className="text-white font-semibold label block  text-lg mr-8 mb-2 mt-1 w-48"
        >
          Ownership
        </label>
        <select
          id="ownership"
          name="ownership"
          onChange={handleChange} 
          value={formData.ownership}
          className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
        >
          <option value="">Select</option>
          <option value="Individual">Individual</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="mb-4 flex flex-cols-2 ml-40">
        <label
          htmlFor="Property Type"
          className="text-white font-semibold label block  text-lg mr-8 mb-2 mt-1 w-48"
        >
          Number of Floors
        </label>
        <select
          id="floor"
          name="floor"
          onChange={handleChange} 
          value={formData.floor}
          className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
        >
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div className="mb-4 flex flex-cols-2 ml-40">
        <label
          htmlFor="Property Type"
          className="text-white font-semibold label block  text-lg mr-8 mb-2 mt-1 w-48"
        >
          Availability
        </label>
        <select
          id="availability"
          name="availability"
          onChange={handleChange} 
          value={formData.availability}
          className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
        >
          <option value="">Select</option>
          <option value="Under Construction">Under Construction</option>
          <option value="Ready to Move">Ready to Move</option>
          <option value="Upcoming">Upcoming</option>
        </select>
      </div>

      <div className="mb-4 flex flex-cols-2 ml-40">
        <label
          htmlFor="Property Type"
          className="text-white font-semibold label block  text-lg mr-8 mb-2 mt-1 w-48"
        >
          Property on the Floor
        </label>
        <select
          id="propertyFloor"
          name="propertyFloor"
          onChange={handleChange}
          value={formData.propertyFloor}
          className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
        >
          <option value="">Select</option>
          <option value="Basement">Basement</option>
          <option value="Ground">Ground</option>
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
          <option value="3rd">3rd</option>
          <option value="4th">4th</option>
        </select>
      </div>

      <div className="mb-4 flex flex-cols-2 ml-40"></div>

     
      <div className="mb-4 flex col-span-2 border-2 ml-36 mr-36">
       
       </div>


      <h1 className="col-span-2 mb-10 text-4xl ml-24  text-center mr-28 text-white drop-shadow-2x italic font-mono font-semibold  ">Property Features & Price</h1>

      <div className="mb-4 flex flex-cols-2 ml-40">
        <label
          htmlFor="society"
          className="text-white font-semibold label block  text-lg mr-8 mb-2 mt-1 w-48"
        >
          Built Up Area
        </label>
        <input
          type="number"
          placeholder="Built Up Area in Sq.ft"
          onChange={handleChange}
          value={formData.builtUpArea}
          min="1000"
          max="15000"
          className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
          id="builtUpArea"
        />
      </div>

      <div className="mb-4 flex flex-cols-2 ml-40">
        <label
          htmlFor="society"
          className="text-white font-semibold label block  text-lg mr-8 mb-2 mt-1 w-48"
        >
          Carpet Area
        </label>
        <input
          type="number"
          placeholder="Carpet Area  in Sq.ft"
          onChange={handleChange}
          value={formData.carpetArea}
          min="1000"
          max="15000"
          className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
          id="carpetArea"
        />
      </div>

      <div className="mb-4 flex flex-cols-2 ml-40">
        <label
          htmlFor="society"
          className="text-white font-semibold label block  text-lg mr-8 mb-2 mt-1 w-48"
        >
          Super Area
        </label>
        <input
          type="number"
          placeholder="Super Area in Sq.ft"
          onChange={handleChange}
          value={formData.superArea}
          min="1000"
          max="15000"
          className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
          id="superArea"
        />
      </div>

      <div className="mb-4 flex flex-cols-2 ml-40">

     
      </div>

      <div className="mb-4 flex flex-cols-2 ml-40">
        <label
          htmlFor="ExpectedPrice"
          className="text-white font-semibold label block  text-lg mr-8 mb-2 mt-1 w-48"
        >
          Expected Price
        </label>
        <input
          type="number"
          placeholder="Expected Price in ₹"
          min="3000000"
          max="100000000"
          className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
          id="expectedPrice"
          onChange={handleChange} 
          value={formData.expectedPrice}
        />
      </div>

      <div className="mb-4 flex flex-cols-2 ml-40">
        <label
          htmlFor="BookingAmount"
          className="text-white font-semibold label block  text-lg mr-8 mb-2 mt-1 w-48"
        >
          Booking Amount
        </label>
        <input
          type="number"
          placeholder="Booking Amount in ₹"
          min="500000"
          max="1000000"
          className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
          id="bookingAmount"
          onChange={handleChange} 
          value={formData.bookingAmount}
        />
      </div>

      <div className="mb-4 flex flex-cols-2 ml-40">
        <label
          htmlFor="MaintenanceCharges"
          className="text-white font-semibold label block  text-lg mr-8 mb-2 mt-1 w-48"
        >
          Maintenance Charges
        </label>
        <input
          type="number"
          placeholder="Maintenance Charges in ₹"
          min="1500"
          max="10000"
          className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
          id="maintenanceCharges"
          onChange={handleChange}
          value={formData.maintenanceCharges}
        />
      </div>

      <div className="mb-4 flex flex-cols-2 ml-40"></div>

      <div className="mb-4 flex flex-cols-2 ml-40 flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <input
            className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
            type="number"
            id="bedrooms"
            min="1"
            max="10"
            onChange={handleChange} 
            checked={formData.type === 'bedrooms'}
            required
          />
          <p className='text-white font-semibold'>Beds</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
            type="number"
            id="bathrooms"
            min="1"
            max="10"
            onChange={handleChange} 
            checked={formData.type === 'bathrooms'}
            required
          />
          <p className='text-white font-semibold'>Baths</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            className="border border-[#352F44] w-1/2 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
            type="number"
            id="balconies"
            min="1"
            max="10"
            onChange={handleChange} 
            checked={formData.type === 'balconies'}
            required
          />
          <p className='text-white font-semibold'>Balconies</p>
        </div>

      </div>

      <div className="mb-4 flex flex-cols-2 ml-40">

     
      </div>

      <div className="mb-4 flex col-span-2 border-2 ml-36 mr-36">
       
       </div>


      <h1 className="col-span-2 mb-10 text-4xl ml-24  text-center mr-28 text-white drop-shadow-2x italic font-mono font-semibold  ">Property Descriptions</h1>

      <div className="mb-4 ml-40 flex col-span-2">
        <textarea
          rows="3"
          cols="180"
          type="text"
          placeholder="Maximum 200 characters"
          className="border border-[#352F44] w-full mr-24 p-2 rounded-lg shadow-md focus:outline-none focus:border-[#435585]"
          id="description"
          onChange={handleChange} 
          value={formData.description}
          required
        />
      </div>
      <div className="col-span-2 text-center mt-20 mb-24 mr-36">
          <button
            type="submit"
            className={`border-2 font-serif text-lg ml-24 bg-gray-400 w-1/4 text-black font-bold py-2 px-4 rounded hover:border-[#748DA6] hover:bg-[#ECF9FF] hover:text-[#748DA6] `}  
          >
            Continue 
          </button>
          </div>
          </form>
          </div>
       
            </div>
          </div>
    </>
  );
}

export default APropertyDetail;
