import { FaSearch} from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { CiMail } from "react-icons/ci";
import { Badge, message } from "antd";

function AdminHeader({}) {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm); // Pass the searchTerm to the onSearch function
  };
  

  return (
    <header className='flex-no-wrap flex p-3 w-full h-20 bg-gray-800 border border-[#EEEEEE]  shadow-sm shadow-[#354259]'>
      <div className='flex justify-between items-center max-w-7xl mx-auto'>

        <div className='flex items-center'> 
          <form onSubmit={handleSubmit} className='bg-white hover:bg-slate-50 p-3 rounded-lg flex items-center border-2 border-white'>
            <input
              type='text'
              placeholder='Search...'
              className='bg-transparent focus:outline-none w-24 sm:w-64'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type='submit'>
              <FaSearch className='h-6 w-6 text-slate-900 hover:text-slate-700 font-bold' />
            </button>
          </form>
        </div>
        </div>
        
        <Badge   
        className='mr-4 mt-3'
        count={currentUser && currentUser.notification ? currentUser.notification.length : 1} // Check if currentUser.notification exists before accessing its length
        onClick={() => {
          navigate("/admin/notification");
        }} >
        <FaBell   
  className=' h-8 w-8 text-xl justify-between items-center text-white'
/>
</Badge>

        <CiMail className='mt-3 h-8 w-8 mr-5 ml-2  text-xl justify-between items-center text-white' />

        <div className='flex mr-24 justify-between items-center'>
          {currentUser ? (
            <img className='rounded-full h-9 w-9 object-cover mr-4' src={currentUser.avatar} alt='profile' />
          ) : (
            <Link to="/sign-in">
             <button className='h-10 px-5 m-2 bg-white hover:bg-[#7C93C3] rounded'>
              <span className= 'text-lg text-[#354259] font-bold'>Sign in</span>
            </button>
            </Link>
           
          )}
        </div>  
    
    </header>
  );
}

export default AdminHeader;
