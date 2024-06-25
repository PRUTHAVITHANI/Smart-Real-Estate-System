import { FaHome } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { FaDollarSign } from "react-icons/fa";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";


ChartJS.register(ArcElement, Tooltip, Legend);

const theme = createTheme();

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: "#503C3C", // Set your custom color here
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: '0px 0px 0px 8px rgba(199, 200, 204, 0.16)',
    },
  },
  '& .MuiSlider-rail': {
    color: "#503C3C", // Set the same color for the rail
  },
  '& .MuiSlider-track': {
    color: "#503C3C", // Set the same color for the track
  },
}));

function Mortagage_Calc() {
  const [homeValue, setHomeValue] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanDuration, setLoanDuration] = useState("");
  const [propertyTaxRate, setPropertyTaxRate] = useState("");
  const [propertyTax , setPropertyTax] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [interestAmount, setInterestAmount] = useState(0);
  const [totalAmount , setTotalAmount] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessageClosed, setErrorMessageClosed] = useState(false);

  useEffect(() => {
    if (loanAmount < 0 || monthlyPayment < 0 ) {
    
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
      setErrorMessageClosed(false); // Reset the error message closed flag
    }
  }, [loanAmount, monthlyPayment]);

  const handleErrorMessageClose = () => {
    setShowErrorMessage(false);
    setErrorMessageClosed(true); // Set the flag to indicate that error message is closed
  };

  const isFormDisabled = showErrorMessage;

  useEffect(() => {
    calculateLoanAmount();
  }, [homeValue, downPayment]);

  useEffect(() => {
    calculateMonthlyPayment();
  }, [interestRate, loanAmount, loanDuration, propertyTaxRate]);

  function calculateLoanAmount() {
    setLoanAmount((prevLoanAmount) => {
      return homeValue - downPayment;
    });
  }

  function calculateMonthlyPayment() {
    // Percentage conversion
    function percentageToDecimal(percent) {
      return percent / 12 / 100;
    }

    // years to month conversion
    function yearsToMonths(year) {
      return year * 12;
    }

    if (loanDuration <= 0) {
      setMonthlyPayment(0);
      return;
    }

    var propertyTax = homeValue * (propertyTaxRate / 100);
    var totalLoanAmount = loanAmount + propertyTax;
    // var interestAmount = percentageToDecimal(interestRate) * totalLoanAmount;
     var interestAmount = monthlyPayment * yearsToMonths(loanDuration) - totalLoanAmount;
     var totalAmount = interestAmount + totalLoanAmount;
    setTotalAmount(totalAmount);
    setInterestAmount(interestAmount);
    setPropertyTax(propertyTax);
    

    var calculatedMonthlyPayment =
    (percentageToDecimal(interestRate) * totalLoanAmount) /
    (1 - Math.pow(1 + percentageToDecimal(interestRate), -yearsToMonths(loanDuration)));

    setMonthlyPayment(isNaN(calculatedMonthlyPayment) || !isFinite(calculatedMonthlyPayment) ? 0 : calculatedMonthlyPayment);
  }

  const pieChartData = {
    labels: ["Principle Amount", "Interest Amount", "Property Taxes"],
    datasets: [
      {
        data: [loanAmount, interestAmount, propertyTax],
        backgroundColor: ["#503C3C", "#B0A695", "#FEFBF6"],
        borderColor: ["#503C3C", "#B0A695", "#FEFBF6"],
        borderWidth: 2,
        radius: 100,
      },
    ],
    options: {
      plugins: {
        legend: {
          labels: {
            color: ["#503C3C", "#B0A695", "#FEFBF6"], // Set an array of colors for each label
          },
        },
      },
    },
  };
  
  

  const handlePropertyTaxRate = (event, value) => {
    setPropertyTaxRate(value);
  };

  const handleSliderHome = (event, value) => {
    setHomeValue(value);
  };

  const handleSliderDownPayment = (event, value) => {
    setDownPayment(value);
  };
  const handleInterestRate = (event, value) => {
    setInterestRate(value);
  };
  const handleTenure = (event, value) => {
    setLoanDuration(value);
  };

  const isNegativeValue = loanAmount < 0 || monthlyPayment < 0 ;
  
  return (
    <section className="p-20 bg-[#DBDFEA]">

{showErrorMessage && (
  
    <div className="fixed top-3 shadow-xl shadow-gray-400 left-1/3 right-1/3 bg-[#f8fafc] text-[#191919] rounded-xl p-6 text-center">
      <p className="mb-6 text-[#000000] text-lg font-normal">
        We are unable to show you any offers currently as your current EMIs
        amount is very high. You can go back and modify your inputs if you
        wish to recalculate your Mortgage.
      </p>
  
      <button className="bg-[#3F2E3E] text-white font-bold rounded-md p-2 hover:bg-white border hover:border-[#3F2E3E] hover:text-[#3F2E3E] w-28 text-xl " onClick={handleErrorMessageClose}>Close X</button>
    
    
    </div>  

)}


     <div className="text-center">
        <h1 className="mb-5 font-sans font-bold text-3xl text-[#3E3232]">
          Mortgage Calculator
        </h1>
      </div>

      <div className="my-6" style={{ height: '4px', backgroundColor: '#3E3232' }}></div>

      <div className={`ml-40 mr-10 p-5 flex gap-6 ${isFormDisabled ? 'pointer-events-none opacity-50' : ''}`}>
            <div className="w-1/2">


      <ThemeProvider theme={theme}>
        <form
          className="max-w-screen-md mx-auto mt-5 p-5 rounded-md"
          onSubmit={(e) => e.preventDefault()}
        >
           <div className="mb-2 flex items-center">
            <label className="block  text-[#0F0F0F] font-bold mb-3">
              Home Value ₹
            </label>
            <div className="absolute right-1/2">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                ₹
              </span>
              <input
                type="number"
                value={homeValue}
                className="appearance-none border border-[#594545] bg-[#C7C8CC] rounded-full w-full py-2 px-3 pl-10 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Home Value"
                onInput={(e) => {
                  setHomeValue(e.target.value);
                  calculateLoanAmount();
                }}
              />
            </div>
            </div>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <CustomSlider
                aria-label="Temperature"
                value={homeValue}
                min={100000}
                max={100000000}
                step={10}
                onChange={handleSliderHome}
              />
            </Box>
         
           <div className="mb-2 flex items-center">
            <label className="block  text-[#0F0F0F] font-bold mb-3">
              Down Payment ₹
            </label>
            <div className="absolute right-1/2">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                ₹
              </span>
              <input
                type="number"
                value={downPayment}
                className="appearance-none border border-[#594545] bg-[#C7C8CC] rounded-full w-full py-2 px-3 pl-10 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Down Payment"
                onInput={(e) => {
                  setDownPayment(e.target.value);
                  calculateLoanAmount();
                }}
              />
            </div>
            </div>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <CustomSlider
                aria-label="Temperature"
                value={downPayment}
                min={100000}
                max={100000000}
                step={10}
                onChange={handleSliderDownPayment}
              />
            </Box>
         

           <div className="mb-2 flex items-center">
            <label className="block  text-[#0F0F0F] font-bold mb-3">
              Interest Rate %
            </label>
            <div className="absolute right-1/2">
              <input
                type="text"
                value={interestRate === null ? " " : `${interestRate} %`}
                className="appearance-none border border-[#594545] bg-[#C7C8CC] rounded-full w-full py-2 px-3 pl-10 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={
                  interestRate === null ? "Enter your interest rate" : ""
                }
                onInput={(e) =>
                  setInterestRate(String(e.target.value).replace(" %", ""))
                }
              />
            </div>
            </div>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <CustomSlider
                aria-label="Temperature"
                value={parseFloat(String(interestRate).replace(" %", "")) || 0}
                min={1.0}
                max={20.0}
                step={0.1}
                onChange={handleInterestRate}
              />
            </Box>
        
           <div className="mb-2 flex items-center">
            <label className="block  text-[#0F0F0F] font-bold mb-3">
              Loan Duration (years)
            </label>
            <div className="absolute right-1/2">
              <input
                type="number"
                value={loanDuration}
                className="appearance-none border border-[#594545] bg-[#C7C8CC] rounded-full w-full py-2 px-3 pl-10 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Loan Duration"
                onInput={(e) => setLoanDuration(e.target.value)}
              />
            </div>
            </div>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <CustomSlider
                aria-label="Temperature"
                value={loanDuration}
                min={1} 
                max={30}
                step={1}
                onChange={handleTenure}
              />
            </Box>
         
          <div className="mb-2 flex items-center">
            <label className="block  text-[#0F0F0F] font-bold mb-3">
              Property Tax Rate %
            </label>
            <div className="absolute right-1/2">
              <input
                type="text"
                value={`${propertyTaxRate} %`}
                className="appearance-none border border-[#594545] bg-[#C7C8CC] rounded-full w-full py-2 px-3 pl-10 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter property tax rate"
                onInput={(e) =>
                  setPropertyTaxRate(Number(e.target.value.replace(" %", "")))
                }
              />
            </div>
            </div>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <CustomSlider
                aria-label="Property Tax Rate"
                value={propertyTaxRate}
                min={1.0}
                max={6.5}
                step={0.1}
                onChange={handlePropertyTaxRate}
              />
            </Box>
         
          <div className="mb-2 flex items-center">
            <label className="block  text-[#0F0F0F] font-bold mb-3">
              Loan Amount ₹
            </label>
            <div className="absolute right-1/2">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                ₹
              </span>
              <input
                type="number"
                value={loanAmount < 0 ? 0 : parseInt(loanAmount)}  
                readOnly={true}
                className="appearance-none border border-[#594545] bg-[#C7C8CC] rounded-full py-2 px-3 pl-10 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your funds"
              />
            </div>
          </div>
      

        </form>
        

        
      </ThemeProvider>
    </div>

    <div className="flex-1 p-4 mt-5">
    <div className="flex">
      <div className="w-1/2" style={{ width: "300px", height: "300px" }}>
        <Pie data={pieChartData} style={{ width: "100%", height: "100%" }} />
      </div>

      <div className="ml-4">
      
          <li className="text-black font-serif font-medium text-lg ml-5 mt-5">Principle Amount </li><span className="text-[#331D2C] font-bold text-lg mb-4 ml-10">₹{loanAmount < 0 ? 0 : parseInt(loanAmount)}</span>
          <li className="text-black font-serif font-medium text-lg ml-5 mt-5" >Interest Amount </li><span className="text-[#3E3232] font-bold text-lg mb-4 ml-10">₹{interestAmount < 0 || loanAmount < 0 ? 0 : parseInt(interestAmount)}</span>
          <li className="text-black font-serif font-medium text-lg ml-5 mt-5">Property Taxes</li><span className="text-[#3E3232] font-bold text-lg mb-4 ml-10">₹{parseInt(propertyTax)}</span>
            <li className="text-black font-serif font-medium text-lg ml-5 mt-5">Total Amount </li><span className="text-[#3E3232] font-bold text-lg mb-4 ml-10">₹{totalAmount < 0 ? 0 : parseInt(totalAmount)}</span>
              
      </div>  
    </div>
    <div className="ml-4 w-1/2 p-2 shadow-lg shadow-slate-400 border-2 border-[#3E3232] rounded-md">
      <h2 className="text-black font-bold text-lg mb-1">Monthly Payment</h2>
      <span className="text-[#3E3232] font-bold text-lg">₹{isNaN(monthlyPayment) || monthlyPayment < 0 ? 0 : parseInt(monthlyPayment)}</span>

    </div>

  </div>
</div>


  </section>
  );
}

export default Mortagage_Calc;
