import { FaHome } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { FaDollarSign } from "react-icons/fa";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import img from "../../assets/image/homeCal.png"
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./homeCal.css"

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

function Affordability_Calc() {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [monthlyDebts, setMonthlyDebts] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanDuration, setLoanDuration] = useState("");
  const [affordableMoney, setAffordableMoney] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessageClosed, setErrorMessageClosed] = useState(false);

  useEffect(() => {
    if (monthlyIncome < monthlyDebts || affordableMoney < 0 ) {
    
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
      setErrorMessageClosed(false); // Reset the error message closed flag
    }
  }, [monthlyDebts , monthlyIncome , affordableMoney]);

  const handleErrorMessageClose = () => {
    setShowErrorMessage(false);
    setErrorMessageClosed(true); // Set the flag to indicate that error message is closed
  };

  const isFormDisabled = showErrorMessage;



  useEffect(() => {
    calculateAffordability();
  }, [monthlyIncome, downPayment, interestRate, loanDuration, monthlyDebts , affordableMoney]);

const calculateLoanAmount = () => {
  // Convert interest rate to decimal
  const monthlyInterestRate = parseFloat(interestRate) / 12 / 100;

  // Convert loan duration to months
  const numberOfPayments = parseInt(loanDuration) * 12;

  // Calculate monthly loan payment using the formula for an amortizing loan
  const monthlyLoanPayment =
    (monthlyIncome * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

  // Calculate loan amount by subtracting the down payment from the property value
  const loanAmount = monthlyLoanPayment * numberOfPayments;

  // Adjust loan amount by subtracting monthly debts
  const adjustedLoanAmount = loanAmount - parseFloat(monthlyDebts);

  return adjustedLoanAmount;
};

// if(downPayment > monthlyIncome){
//   toast("Down Payment should be less than your Monthly Income", {
//     position: "top-center",
//     autoClose: 1500,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//   });
// }
    
    // Implement your affordability calculation logic here based on the provided formulas
    const calculateAffordability = () => {
      // Implement your affordability calculation logic here based on the provided formulas
      const affordableLoanAmount = calculateLoanAmount();
    
      setAffordableMoney(isNaN(affordableLoanAmount) ? 0 : affordableLoanAmount);
    };

  const handleSliderIncome = (event, value) => {
    setMonthlyIncome(value);
  };

  const handleSliderDownPayment = (event, value) => {
    setDownPayment(value);
  };

  const handleMonthlyDebts = (event, value) => {
    setMonthlyDebts(value);
  };
  
  const handleInterestRate = (event, value) => {
    setInterestRate(value);
  };

  const handleTenure = (event, value) => {
    setLoanDuration(value);
  };

  return (
    <section className="p-20 bg-[#DBDFEA]">

{showErrorMessage && (
  
  <div className="fixed top-3 shadow-xl shadow-gray-400 left-1/3 right-1/3 bg-[#f8fafc] text-[#191919] rounded-xl p-6 text-center">
    <p className="mb-6 text-[#000000] text-lg font-normal">
      We are unable to show you any offers currently as your current EMIs
      amount is very high. You can go back and modify your inputs if you
      wish to recalculate your eligibility.
    </p>

    <button className="bg-[#3F2E3E] text-white font-bold rounded-md p-2 hover:bg-white border hover:border-[#3F2E3E] hover:text-[#3F2E3E] w-28 text-xl " onClick={handleErrorMessageClose}>Close X</button>
  
  
  </div>  

)}


     <div className="text-center">
        <h1 className="mb-5 font-sans font-bold text-3xl text-[#3E3232]">
          Affordability Calculator
        </h1>
      </div>

      <div className="my-6" style={{ height: '4px', backgroundColor: '#3E3232' }}></div>

    <div className={`ml-40 mr-10 p-5 flex gap-6 ${isFormDisabled ? 'pointer-events-none opacity-50' : ''}`}>
    <div className="w-1/2">


      <ThemeProvider theme={theme}>
        <form
          className="max-w-screen-md mx-auto mt-2 p-5 rounded-md"
          onSubmit={(e) => e.preventDefault()}
        >
           <div className="mb-2 flex items-center">
                <label className="block text-[#0F0F0F] font-bold mb-3">
                  Monthly Income
                </label>
                <div className="absolute right-1/2">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={monthlyIncome}
                    className="appearance-none border border-[#594545] bg-[#C7C8CC] rounded-full w-full py-2 px-3 pl-10 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Monthly Income"
                    onInput={(e) => {
                      setMonthlyIncome(e.target.value);
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
                  value={monthlyIncome}
                  min={10000}
                  max={1000000}
                  step={10}
                  onChange={handleSliderIncome}
                />
              </Box>
         
           <div className="mb-2 flex items-center">
            <label className="block  text-[#0F0F0F] font-bold mb-3">
              Down Payment 
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
                max={10000000}
                step={10}
                onChange={handleSliderDownPayment}
              />
            </Box>

            <div className="mb-2 flex items-center">
            <label className="block  text-[#0F0F0F] font-bold mb-3">
              Other Monthly Debts 
            </label>
            <div className="absolute right-1/2">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                ₹
              </span>
              <input
                type="number"
                value={monthlyDebts}
                className="appearance-none border border-[#594545] bg-[#C7C8CC] rounded-full w-full py-2 px-3 pl-10 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Other EMIs"
                onInput={(e) => {
                  setMonthlyDebts(e.target.value);
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
                value={monthlyDebts}
                min={10000}
                max={1000000}
                step={10}
                onChange={handleMonthlyDebts}
              />
            </Box>
         

           <div className="mb-2 flex items-center">
            <label className="block  text-[#0F0F0F] font-bold mb-3">
              Interest Rate 
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

        </form>   
      </ThemeProvider>

    </div>

    <div className="w-1/2" >
              
    <div className="ml-4 w-full p-1 shadow-lg shadow-zinc-500 border-2 border-[#3E3232] rounded-md">
      <h2 className="text-black font-bold text-lg mb-1 ml-5">You can afford a home upto</h2>
      <span className="text-[#3E3232] font-bold text-lg ml-5 ">₹{affordableMoney < 0 ? 0 : parseInt(affordableMoney)}</span>
    </div>

    <div className='ml-32 mt-8'>
  <img src={img} alt=""  />
 
</div>
</div>  

</div>

  </section>
  
  );
}

export default Affordability_Calc;
