import React from 'react';
import { useEffect, useState } from "react";
import AdminNav from './AdminNav';
import AdminHeader from './AdminHeader';
import { Link } from 'react-router-dom';
import { FaGreaterThan, FaUserAlt } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { RiUserShared2Fill } from 'react-icons/ri';
import { LuUsers2 } from "react-icons/lu";

ChartJS.register(ArcElement, Tooltip, Legend);

function AdminDashboard() {
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [allListings , setAllListings] = useState([]);
  const [allUsers , setAllUsers] = useState([]);

  const pieChartData = {
    labels: ["Sale", "Rent"],
    datasets: [
      {
        data: [saleListings.length, rentListings.length],
        backgroundColor: ["#24A19C", "#99DDCC"],
        borderColor: ["#24A19C", "#99DDCC"],
        borderWidth: 0,
        radius: 100,
      },
    ],
    options: {
      plugins: {
        legend: {
          labels: {
            color: ["#24A19C", "#99DDCC"], // Set an array of colors for each label
          },
        },
      },
    },
  };

  const pieChartData1 = {
    labels: ["Seller", "Buyer", "seller/renter"],
    datasets: [
      {
        data: [2, 4 ,1],
        backgroundColor: ["#3F1263", "#643579" ,"#C490E4"],
        borderColor: ["#3F1263", "#643579" ,"#C490E4"],
        borderWidth:0 ,
        radius: 100,
      },
    ],
    options: {
      plugins: {
        legend: {
          labels: {
            color: ["#3F1263", "#643579" , "#C490E4"], // Set an array of colors for each label
          },
        },
      },
    },
  };

  useEffect(() => {
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/property/get?propertyFor=rent");
        const data = await res.json();
        if (data.success === true) {
          console.log(data);
          return;
        }
        setRentListings(data);
        console.log(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/property/get?propertyFor=sell");
        const data = await res.json();
        if (data.success === true) {
          console.log(data);
          return;
        }
        setSaleListings(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRentListings();
  }, []);

  useEffect(() => {
    fetchAllListings();
  }, []);

  const fetchAllListings = async () => {
    try {
      const res = await fetch("/api/property/get");
      const data = await res.json();
      if (data.success === true) {
        console.log(data);
        return;
      }
      setAllListings(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const res = await fetch("/api/user/get");
      const data = await res.json();
      if (data.success === true) {
        console.log(data);
        return;
      }
      setAllUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const SaleCount = saleListings.length;
  const RentCount = rentListings.length;
  const AllPropertyCount = allListings.length;
  const AllUserCount = allUsers.length;

  return (
    <>
      <div className='flex md:flex-row bg-[#DBDFEA] dark:bg-gray-900'>
        <AdminNav />
        <div className='w-full'>
          <AdminHeader />
          <div className='font-medium text-3xl mt-4  dark:text-white ml-9 p-3'>
            Welcome to Admin Dashboard
          </div>
          <div className='flex flex-col-2'>
            <div className='mt-10 p-3 ml-10 h-60 shadow-2xl hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-2/5 bg-[#E8F9FD] '>
              <div className="flex items-center h-10 mb-4 mt-4">
                <RiUserShared2Fill className='inline-block mr-2 ml-10 text-xl h-10 w-10 text-black' />
                <div className='flex flex-col'>
                  <p className="text-xl font-bold ml-6 text-black">{AllUserCount}</p>
                </div>
                <Link className="text-md ml-44  flex items-center  text-black font-bold" to="/admin/user">
                  Show All Users
                  <FaGreaterThan className="ml-1 h-4 w-4 font-medium text-sm text-black"/>
                </Link>
              </div>
              <div className='flex flex-col-2 gap-14 p-10 w-full'>
                <div className='flex flex-col-2'> 
                  <img  className ="h-14 w-14" src="https://cdn-icons-png.flaticon.com/512/4378/4378968.png" alt="" />
                  <div className='flex flex-col ml-5'>
                    <p className="text-xl font-bold">2</p>
                    <p className='text-black font-bold'>Seller</p>
                  </div>
                </div>
                <div className='flex flex-col-2'> 
                  <img  className ="h-14 w-14" src="https://www.freeiconspng.com/thumbs/buy-icon-png/buy-icon-32.png" alt="" />
                  <div className='flex flex-col ml-5'>
                    <p className="text-xl font-bold">4</p>
                    <p className='text-black font-bold'>Buyer</p>
                  </div>
                </div>
                <div className='flex flex-col-2'> 
                  <LuUsers2  className='inline-block mr-2 text-xl h-14 w-14 text-black' />
                  <div className='flex flex-col ml-5'>
                    <p className="text-xl font-bold">1</p>
                    <p className='text-black font-bold'>seller/renter</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-1/2 mt-4 ml-32" style={{ width: "300px", height: "300px" }}>
              <Pie data={pieChartData1} style={{ width: "100%", height: "100%" }} />
            </div>
          </div>

          <div className='flex flex-col-2'>
            <div className="w-1/2 mt-7 ml-36" style={{ width: "300px", height: "300px" }}>
              <Pie data={pieChartData} style={{ width: "100%", height: "100%" }} />
            </div>
            <div className='mt-8 p-3 ml-56 h-60 shadow-2xl hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-2/5 bg-[#E8F9FD]'>
              <div className="flex items-center h-10 mb-4 mt-4">
                <img  className ="h-14 w-14 ml-6" src="https://themes.pixelstrap.com/sheltos/assets/images/svg/icon/1.svg" alt="" />
                <div className='flex flex-col'>
                  <p className="text-xl font-bold ml-6 text-black ">12</p>
                  <p className="text-xl font-bold ml-6 text-black ">Properties</p>
                </div>
                <Link className="text-md ml-28 font-bold flex items-center text-black " to="/admin/property">
                  Show All Properties
                  <FaGreaterThan className="ml-1 h-4 w-4 font-medium text-sm text-black "/>
                </Link>
              </div>
              <div className='flex flex-col-2 gap-14 p-10 w-full'>
                <div className='flex flex-col-2'> 
                  <img  className ="h-10 w-10" src="https://themes.pixelstrap.com/sheltos/assets/images/svg/icon/rent.png" alt="" />
                  <div className='flex flex-col ml-5'>
                    <p className="text-xl font-bold">{RentCount}</p>
                    <p className='text-black font-bold'>Rent</p>
                  </div>
                </div>
                <div className='flex flex-col-2'> 
                  <img  className ="h-10 w-10" src="https://themes.pixelstrap.com/sheltos/assets/images/svg/icon/sold.png" alt="" />
                  <div className='flex flex-col ml-5'>
                    <p className="text-xl font-bold">{SaleCount}</p>
                    <p className='text-black font-bold'>Sale</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
