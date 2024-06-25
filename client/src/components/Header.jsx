  import { FaSearch } from 'react-icons/fa';
  import { Link, useNavigate, useLocation } from 'react-router-dom';
  import { useSelector } from 'react-redux';
  import { useEffect, useState } from 'react';
  import img from "../assets/image/logo1.png";
  import homeIcon from "../assets/image/HomeIcon.png";

  function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
      setDropdownVisible(!isDropdownVisible);
    };

    const navigate = useNavigate();
    const location = useLocation(); // Use useLocation to get the location object

    const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('searchTerm', searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search-bar?${searchQuery}`);
    };

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if (searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl);
      }
    }, [location.search]);

    
    return (
      <div>
      <header className='flex-no-wrap flex p-3 w-full h-20 bg-[#ECF2FF] shadow-md shadow-slate-300'  >
        <div className='flex justify-between items-center max-w-7xl mx-auto'>
           
        <img src={img} alt="" />

          <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap ml-4 mr-2'>
              <span className='text-slate-500 font-bold'>Vithani</span>
              <span className='text-slate-700 font-bold'>Estate</span>
            </h1> 
          </Link>


          <ul className='flex'>

  <li className=" relative group">
    <button className='h-10 px-5 m-2 hover:bg-[#7C93C3] rounded relative group'>
      <span className="mr-2 hidden sm:inline text-slate-700 font-bold">Buy</span>
    </button>

    <ul className="absolute hidden shadow-lg shadow-[#B5C0D0] bg-[#B7C9F2] border-1 rounded-md text-gray-700 pt-1 group-hover:block w-48">

      <li><a className="block px-2 py-2 hover:bg-[#7C93C3] text-slate-700" href='/search-bar'>Property By Type</a></li>
      <li><hr className="my-2 border-t border-[#51829B]"/></li>
      <li><a className="block px-2 py-2 hover:bg-[#7C93C3] text-slate-700" href='/search-bar'>Property By Locality</a></li>
      <li><hr className="my-2 border-t border-[#51829B]"/></li>
      <li><a className="block px-2 py-2 hover:bg-[#7C93C3] text-slate-700" href='/search-bar'>Property By Area</a></li>
    </ul> 
  </li>

  <li className=" relative group">
    <button className='h-10 px-5 m-2 hover:bg-[#7C93C3] rounded relative group'>
      <span className="mr-2 hidden sm:inline text-slate-700 font-bold">Rent</span>
    </button>

    <ul className="absolute hidden shadow-lg shadow-[#B5C0D0] bg-[#B7C9F2] border-1 rounded-md text-gray-700 pt-1 group-hover:block w-48">
      <li className=''><a className="block px-2 py-2 hover:bg-[#7C93C3] text-slate-700" href='/search-bar'>Property By Type</a></li>
      <li><hr className="my-2 border-t border-[#51829B]"/></li>
      <li><a className="block px-2 py-2 hover:bg-[#7C93C3] text-slate-700" href='/search-bar'>Property By Locality</a></li>
      <li><hr className="my-2 border-t border-[#51829B]"/></li>
      <li><a className="block px-2 py-2 hover:bg-[#7C93C3] text-slate-700" href='/search-bar'>Property By Area</a></li>
    </ul> 
  </li>

  <li className="relative group">
      <div className="dropdown">
      <button className='h-10 px-5 m-2 hover:bg-[#7C93C3] rounded relative group'>
          <span className="mr-2 hidden sm:inline text-slate-700 font-bold">Home Loans</span>
        </button>
        <ol
          className=" border-1 text-gray-700 pt-1 group-hover:block w-auto absolute rounded-md border-gray-200 py-2  px-4 bg-[#B7C9F2] hidden shadow-lg shadow-[#B5C0D0]"
        >
          <div className="flex grid-cols-3 gap-3 mt-2 mb-2">

          <div className="flex-auto w-72 p-2">
      <ul>
        <li>
          <p className="font-bold text-md mb-2 text-[#070F2B]">Started a home loan application</p>
        </li>
        <li className="flex items-center">
          <a href="/loan-form" className="text-blue-900 hover:underline">Apply for Home Loan</a>
          <img src={homeIcon} alt="Home Icon" className="ml-5 w-18 h-18" />
        </li>
      </ul>
    </div>
            
            <div className="border-l h-28 border-[#51829B]"></div>

            <div className="flex-auto w-72 p-2">
              <p className="font-bold text-md mb-2 text-[#070F2B]">Touring homes and & making offers</p>
             <li><a href="/loan-predictor" className="text-blue-900 hover:underline">Discover home loans</a></li> 
             <li><a href="/mortgage-loan-calculator" className="text-blue-900 hover:underline">Estimate your monthly payment</a></li> 
            </div>
            <div className="border-l border-[#51829B] h-28"></div>
            <div className="flex-auto w-72 p-2 text-[#070F2B]">
              <p className="font-bold text-md mb-2">Just getting started</p>
              <li><a href="/affordability-loan-calculator" className="text-blue-900 hover:underline">Calculate your budget</a></li>
              <li><a href='/search-bar' className="text-blue-900 hover:underline">Learn about the mortgage process</a></li>
            </div>

          </div>
        </ol>
      </div>
    </li>

  </ul>

          <form onSubmit={handleSubmit} className='bg-[#D2E0FB] hover:bg-slate-50 p-3 rounded-lg flex items-center border border-[#C3ACD0] ml-12 mr-8'>
            <input
              type='text'
              placeholder='Search...'
              className='bg-transparent focus:outline-none w-24 sm:w-64'
              value={searchTerm} // Set value to sync with state
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className='text-slate-900hover:text-slate-700 font-bold ' />
            </button>
          </form>

          <ul className='flex items-center'>
          <button className='h-10 px-5 m-2 hover:bg-[#7C93C3] rounded'>
            <Link to='/'>
              <li className='hidden sm:inline text-slate-700 font-bold'>Home</li>
            </Link>
            </button>
            <button className='h-10 px-5 m-2 hover:bg-[#7C93C3] rounded'>
            <Link to='/about'>
              <li className='hidden sm:inline text-slate-700 font-bold'>About</li>
            </Link>
            </button>

            <Link to='/profile'>
              {currentUser ? (
                <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' />
              ) : (<button className='h-10 px-5 m-2 hover:bg-[#7C93C3] rounded'>
                <li className='text-slate-700 font-bold'>Sign in</li>
                </button> 
              )}
            </Link>
          
          </ul>
        </div>
     
      </header>
      <div className='border-2 border-[#D2E0FB] '>

</div>
        </div>
    );
  }

  export default Header;
