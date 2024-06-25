import React, { useEffect, useState , userRef} from 'react'
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate , useParams } from 'react-router-dom';
import AdminNav from '../AdminNav';
import AdminHeader from '../AdminHeader';

function AAmenities() {
  const { currentUser} = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [otherText, setOtherText] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    carParking:false,
    furnished:false,
    powerBackup:false,
    security:false,
    lift:false,
    maintenanceStaff:false,
    fireAlarm:false,
    pipedGas:false,
    park:false,
    swimmingPool:false,
    imageUrls: [],
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  console.log(formData);

  useEffect (() => {
    const fetchProperty = async () => {
         const propertyId = params.propertyId;
         const res = await fetch(`/api/property/get/${propertyId}`);
         const data = await res.json();
         console.log('Property ID:', propertyId);
         if(data.success === false){
         console.log(data.message);
           return;
         }
         setFormData(data);
    }

    fetchProperty();
}, [params.propertyId])

  // const handleChange = (e) => {
  //   if (e.target.id === 'carParking' || e.target.id === 'furnished' || e.target.id === 'powerBackup' || e.target.id === 'security' || e.target.id === ' lift' || e.target.id === 'maintenanceStaff' ||
  //   e.target.id === 'fireAlarm' || e.target.id === 'pipedGas' || e.target.id === 'park' || e.target.id === 'swimmingPool') {
  //     setFormData({
  //       ...formData,
  //       [e.target.id]: e.target.checked,
  //     });
  //   }
  // };

  const handleChange = (e) => {
    if (e.target.id === 'other') {
      setShowOtherInput(e.target.checked); // Show the text input when the "Other" checkbox is checked
      setFormData({
        ...formData,
        other: e.target.checked ? '' : otherText, // Clear the text when unchecking "Other"
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
      setShowOtherInput(false); // Hide the text input when other checkboxes are checked
    }
  };


  const handleChangeOther = (e) => {
    const { type, id, value} = e.target;
  
   
    if (type === 'text') {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    } 
  };


  const handleImageSubmit = (e)=>{
    if(files.length > 0 && files.length + formData.imageUrls.length < 7){
        setUploading(true);
        setImageUploadError(false);
        const promises = [];

        for (let i=0; i<files.length; i++){
            promises.push(storeImage(files[i]));
        }
        Promise.all(promises).then((urls) => {
            setFormData({...formData, imageUrls: formData.imageUrls.concat(urls)
            });
            setImageUploadError(false);
            setUploading(false);
        }).catch((err) => {
            setImageUploadError('Image upload failed (2 mb max per image)');
            setUploading(false);
        });
    }else{
        setImageUploadError('You can only upload 6 images per lsiting');
        setUploading(false);
    }
};

const storeImage = async (file) => {
    return new Promise((resolve, reject) =>{
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef , file);

        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
        (error) => {
            reject(error);
          },
          ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
            });
          }
        )
    });
}

const handleRemoveImage = (index) => {
  setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((url, i) => i!== index),
  })
}

const handleSubmit = async(e) => {
  e.preventDefault();
  try {
      if(formData.imageUrls.length < 1)  return setError('You must upload at least one image');
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/property/update/${params.propertyId}`, 
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
      toast('Added successfully', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,})

      setLoading(false);
      if(data.success == false){
       setError(data.message);
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
      navigate(`/admin/detail-property/${data._id}`);
      
  } catch (error) {
      setError(error.message);
      setLoading(false);
  }
}

  return (
    <>
      <div className="flex flex-auto">
    <AdminNav/>
    <div className="w-full">
      <AdminHeader/>
   <div className='w-full bg-[#1A202C] '>
    
      <form className="grid grid-cols-6 gap-5" onSubmit={handleSubmit} >
      <h1 className='col-span-6 mb-10 text-4xl ml-24 text-center mr-28 text-white mt-16 drop-shadow-2x italic font-mono font-semibold  '>Property Amenities</h1>
      <div className='mb-4 flex flex-cols-6 gap-4 ml-10'>
                <input type="checkbox" id="carParking" className='w-5' onChange={handleChange} checked={formData.carParking} />
                <span className='font-medium text-white justify-between'>Car Parking</span>
                </div>
                <div className='mb-4 flex flex-cols-6 gap-4 ml-10'>
                <input type="checkbox" id="furnished" className='w-5' onChange={handleChange} checked={formData.furnished} />
                <span className='font-medium text-white'>Furnished</span>
                </div>
               <div className='mb-4 flex flex-cols-6 gap-4 ml-10'>
                <input type="checkbox" id="PowerBackup" className='w-5' onChange={handleChange} checked={formData.PowerBackup} />
                <span className='font-medium text-white'>Power Backup</span>
                </div>
               <div className='mb-4 flex flex-cols-6 gap-4 ml-10'>
                <input type="checkbox" id="security" className='w-5' onChange={handleChange}  checked={formData.security}/>
                <span className='font-medium text-white'>24x7 Security</span>
                </div>
               <div className='mb-4 flex flex-cols-6 gap-4 ml-10'>
                <input type="checkbox" id="lift" className='w-5' onChange={handleChange} checked={formData.lift} />
                <span className='font-medium text-white'>Lift</span>
                </div>
               <div className='mb-4 flex flex-cols-6 gap-4'>
                <input type="checkbox" id="maintenanceStaff" className='w-5' onChange={handleChange} checked={formData.maintenanceStaff} />
                <span className='font-medium text-white'>Maintenance Staff</span>
                </div>
               <div className='mb-4 flex flex-cols-6 gap-4 ml-10'>
                <input type="checkbox" id="fireAlarm" className='w-5' onChange={handleChange} checked={formData.fireAlarm}  />
                <span className='font-medium text-white'>Security/ Fire Alarm</span>
                </div>
               <div className='mb-4 flex flex-cols-6 gap-4 ml-10'>
                <input type="checkbox" id="pipedGas" className='w-5' onChange={handleChange} checked={formData.pipedGas} />
                <span className='font-medium text-white'>Piped Gas</span>
                </div>
               <div className='mb-4 flex flex-cols-6 gap-4 ml-10'>
                <input type="checkbox" id="park" className='w-5' onChange={handleChange} checked={formData.park}  />
                <span className='font-medium text-white'>Park</span>
                </div>
               <div className='mb-4 flex flex-cols-6 gap-4 ml-10'>
                <input type="checkbox" id="swimmingPool" className='w-5' onChange={handleChange} checked={formData.swimmingPool}  />
                <span className='font-medium text-white'>Swimming Pool</span>
                </div>

                <div className='mb-4 flex flex-cols-6 gap-4 ml-10'>
                    {showOtherInput ? (
                      <input
                        type="text"
                        id="other"
                        className='p-3 border border-[rgb(52,115,126)] focus:outline-none rounded w-1/2'
                        placeholder='Other'
                        value={otherText}
                        onChange={(e) => setOtherText(e.target.value)}
                      />
                    ) : (
                      <>
                        <input
                          type="checkbox"
                          id="other"
                          className='w-5'
                          onChange={handleChangeOther}
                          checked={formData.other}
                        />
                        <span className='font-medium text-white'>Other</span>
                      </>
                    )}
                  </div>


                <div className='mb-4 flex flex-cols-6 gap-4 ml-10'>
               
                </div>
          
          
                <div className="mb-4 flex col-span-6 border-2 mr-24  ">
       
       </div>



 <h1 className='col-span-6 mb-10 text-4xl ml-24  text-center mr-28 text-white drop-shadow-2x italic font-mono font-semibold '>Add Photos</h1>

           

        <p className='col-span-6 font-medium text-white ml-10'>
            Get 5 times more response by adding property pictures. More than 80% of the home seekers click on properties with photos. What are you waiting for? To Upload Your Property Picture Click on "Upload"
            </p>
        <div className='flex flex-cols-6 col-span-6 flex-1 gap-4 ml-10'>
          
            <p className='font-medium text-white'>Images: 
            <span className='font-semibold text-white ml-2'>The image will be the cover (max 6)</span>
            </p>
            </div>

            <div className='flex flex-cols-6 col-span-6 flex-1 gap-4 ml-10'>
                <input onChange={(e)=>setFiles(e.target.files)} className='p-3 border border-[rgb(52,115,126)] rounded w-1/2' type="file" id='images' accept='image/*' multiple />
                <button type='button' onClick={handleImageSubmit}  className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>{uploading ? 'Uploading...' : 'Upload'}</button>
            </div>

            <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url , index) => (
                        <div key={url} className="flex justify-between p-3 border items-center">
                        <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg' />
                        <button type='button' disabled={uploading} onClick={() => handleRemoveImage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
                        </div>
                    ))
                }

            <div className="col-span-6 text-center">
          <button
          disabled={loading || uploading}
            type="submit"
            className={`border-2 font-serif text-lg ml-24 mb-28 bg-gray-400 w-1/4 text-black font-bold py-2 px-4 rounded hover:border-[#748DA6] hover:bg-[#ECF9FF] hover:text-[#748DA6] `}  

          >
            {loading ? 'Creating...' : 'Post Listing'}
            
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
          </div>
          </form>
          </div>
          </div>
          </div>
      </>
  
  );
}

export default AAmenities;
