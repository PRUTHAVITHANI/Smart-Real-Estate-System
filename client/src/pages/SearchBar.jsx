import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem1 from '../components/ListingItem1';

function SearchBar() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    propertyFor: '',
    saleType: '',
    sort: 'created_at',
    order: 'desc',
    maxSuperArea: Number.MAX_SAFE_INTEGER,
  });

  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [showMore, setShowMore] = useState(false);

  

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const propertyForFromUrl = urlParams.get('propertyFor');
    const saleTypeFromUrl = urlParams.get('saleType');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      propertyForFromUrl ||
      saleTypeFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        propertyFor: propertyForFromUrl || '',
        saleType: saleTypeFromUrl || '',
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      console.log('Search Query:', searchQuery);

      try {
        const res = await fetch(`/api/property/get?${searchQuery}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log('Fetched Data:', data);

        if (data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }

        setProperties(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'rent' || e.target.id === 'sell') {
      // Use an array for propertyFor
      const selectedPropertyFor = e.target.id;
      setSidebardata((prevData) => ({
        ...prevData,
        propertyFor: selectedPropertyFor === 'rent' ? ['rent'] : ['sell'],
      }));
    }
  
    if (e.target.id === 'New Property' || e.target.id === 'Resale Property') {
      // Use an array for saleType
      const selectedSaleType = e.target.id;
      setSidebardata((prevData) => ({
        ...prevData,
        saleType:
          selectedSaleType === 'Resale Property'
            ? ['Resale Property']
            : ['New Property'],
      }));
    }
  
    if (e.target.id === 'searchTerm') {
      setSidebardata((prevData) => ({
        ...prevData,
        searchTerm: e.target.value,
      }));
    }
  
    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';


      setSidebardata((prevData) => ({
          ...prevData,
          sort,
          order,
        }));

      // const adjustedSort = sortMapping[e.target.value] || 'createdAt_desc';
      // const order = e.target.value.split('_')[1] || 'desc';
      // setSidebardata((prevData) => ({
      //   ...prevData,
      //   sort: adjustedSort,
      //   order,
      // }));
    }

    if (e.target.id === 'maxSuperArea') {
      const superAreaType = e.target.id;
      setSidebardata((prevData) => ({
        ...prevData,
        [superAreaType]: parseInt(e.target.value),
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const maxSuperAreaValue = sidebardata.maxSuperArea === undefined ? '10000' : sidebardata.maxSuperArea;
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('propertyFor', sidebardata.propertyFor);
    urlParams.set('saleType', sidebardata.saleType);
   urlParams.set('maxSuperArea', maxSuperAreaValue);
   urlParams.set('sort', sidebardata.sort);
   urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search-bar?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = properties.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/property/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setProperties([...properties, ...data]);
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-1 border-[#DBDFEA] boder md:border-r-2 md:min-h-screen bg-[#ABC2E8] shadow-lg shadow-slate-400 '>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2 mt-4'>
            <label className='whitespace-nowrap font-bold text-lg text-[#535C91] '>
              Search Term 
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border border-[#35374B] focus:outline-none shadow-lg shadow-slate-400 rounded-lg p-3 w-full ml-1' 
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className='flex gap-2 flex-wrap items-center mt-4'>
          <label className='whitespace-nowrap font-bold text-lg text-[#535C91] '>Property For </label>

          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='rent'
              className='w-5 ml-2'
              onChange={handleChange}
              checked={sidebardata.propertyFor.includes('rent')}
            />
            <span className='text-[#535C91] font-medium'>Rent</span>
          </div>
          <div className='flex gap-2'>
            <input
              type='checkbox'
              id='sell'
              className='w-5 ml-24'
              onChange={handleChange}
              checked={sidebardata.propertyFor.includes('sell')}
            />
            <span className='text-[#535C91] font-medium'>Sell</span>
          </div>
        </div>


        <div className='flex gap-2 flex-wrap items-center mt-4'>
            <label className='whitespace-nowrap font-bold text-lg text-[#535C91] '>Sale Type </label>

            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='Resale Property'
                className='w-5 ml-8'
                onChange={handleChange}
                checked={sidebardata.saleType.includes('Resale Property')}
              />
              <span className='text-[#535C91] font-medium'>Resale Property</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='New Property'
                className='w-5 ml-5'
                onChange={handleChange}
                checked={sidebardata.saleType.includes('New Property')}
              />
              <span className='text-[#535C91] font-medium'>New Property</span>
            </div>
          </div>


          <div className='flex items-center gap-2 mt-4'>
            <label className='whitespace-nowrap font-bold text-lg text-[#535C91] '>Sort</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='border rounded-lg p-3 ml-16 w-full border-[#35374B] shadow-lg shadow-slate-400 focus:outline-none'
            >
              <option value='expectedPrice_desc'>Price high to low</option>
              <option value='expectedPrice_asc'>Price low to hight</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>

            <div className='flex items-center gap-2 mt-4'>
              <label className='whitespace-nowrap font-bold text-lg text-[#535C91] '>Area</label>
              <select
                onChange={handleChange}
                value={sidebardata.maxSuperArea}
                id='maxSuperArea'
                className='border rounded-lg p-3 border-[#35374B] ml-14 shadow-lg shadow-slate-400 w-full focus:outline-none'
              >
                <option>All</option>
                <option value={3000}>Less than 3000 sq.ft</option>
                <option value={4500}>Less than 4500 sq.ft</option>
                <option value={6000}>Less than 6000 sq.ft</option>
                <option value={10000}>Less than 10000 sq.ft</option>
              </select>
            </div>


          <button className='border w-full bg-[#424769]  text-white font-bold p-3 uppercase mt-10 rounded hover:border-[#424769] hover:bg-[rgb(234,239,239)] hover:text-[#424769]'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1 shadow-md shadow-slate-400 bg-[#F1F9F9]'>
        <h1 className='text-3xl  italic font-mono font-semibold  text-[#435585] text-center p-1 mt-5 shadow-slate-400'>
          Searching Properties
        </h1> 

        <div className="my-6 shadow-2xl shadow-slate-900 m-3" style={{ height: '4px', backgroundColor: '#424769' }}></div>
        
        <div className='p-7 flex flex-wrap gap-14 ml-6'>
          {!loading && properties.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            properties &&
          properties.map((property) => (
              <ListingItem1 key={property._id} property={property} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-white font-semibold font-sans  hover:text-[#7882A4] border hover:border-[#7882A4] hover:bg-white bg-[#7882A4] rounded-xl self-center p-2 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;   
