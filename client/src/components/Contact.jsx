import { useEffect, useState , userRef} from 'react';
import { Link } from 'react-router-dom';

 function Contact({ property }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    console.log('property prop:', property);
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${property.userRef}`);
        const data = await res.json();
        console.log('Landlord data:', data);
        setLandlord(data);
      } catch (error) {
        console.log('Error fetching landlord:', error);
      }
    };
    fetchLandlord();
  }, [property.userRef]);
  

  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord.username}</span>{' '}
            for{' '}
            {/* <span className='font-semibold'>{property.name.toLowerCase()}</span> */}
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>

          <Link
          to={`mailto:${landlord.email}?subject=Regarding your property  at ${property.locality } &body=${message}`}
          className='bg-[#2D3250] text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message          
          </Link>
        </div>
      )}
    </>
  );
}

export default Contact;