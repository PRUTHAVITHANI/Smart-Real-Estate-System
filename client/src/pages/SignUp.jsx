import { useState } from 'react';
import {Link , useNavigate} from 'react-router-dom';
import OAuth from '../components/OAuth';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from 'validator';
import img from "../assets/image/signup.jpeg";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { AiTwotoneMail } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";

function SignUp() {
  const [formData , setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password, setPassword] = useState('');
  const [OTP, setOTP] = useState('');
  const [isOTPGenerated, setIsOTPGenerated] = useState(false);

  const navigate = useNavigate();

  const handleChange =(e) =>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
    
  };

  const validatePassword = (e) => {
    setPassword(e.target.value);
    if (validator.isStrongPassword(e.target.value)) {
      setPasswordError('Strong Password');
    } else {
      setPasswordError(
        'Passwords must have at least 8 characters and contain the following: uppercase letters, lowercase letters, numbers, and symbols*'
      );
    }
  };

  const validateEmail = (e) => {
    setEmail(e.target.value);
    if (validator.isEmail(e.target.value)) {
      setEmailError('Valid Email');
    } else {
      setEmailError('Invalid Email*');
    }
  };

  const validateUsername = (e) => {
    setUsername(e.target.value);
    if (e.target.value.length < 6) {
      setUsernameError('Username must have at least 6 characters');
    } else {
      setUsernameError('Valid username');
    }
  };

  const handleGenerateOTP = () => {
    if (!username) {
      toast("Please enter your name properly", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (username.length <= 6) {
      toast("Length of username should be at least 6 chatacters", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!password) {
      toast("Please enter proper password", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (password.length <= 6) {
      toast("Length of password should be at least 6 chatacters", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const data = { username, email, password };
    
    axios.post("/api/auth/generateOTP", data).then((res) => {
      console.log(res);
      if (res.data.success) {
        setIsOTPGenerated(true);
        toast("OTP sent successfully", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast(res.data.message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

const handleSignup = async(e) => {
  e.preventDefault();
  try {
    setLoading(true);
    const res = await fetch('/api/auth/signup', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data)
    if(data.success == false){
      setLoading(false);
      setError(data.message);
      toast('Something went wrong, please try again', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    setLoading(false);
    setError(null);
    toast('Register successfully', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate('/sign-in')
  } catch (error) {
      setLoading(false);
      setError(data.message);
  }
};   
  return (
    <>
    <div className="bg-[#ECF2FF] py-2 flex flex-col justify-center sm:py-8">
      <div className="relative py-2 w-[450px] sm:max-w-md sm:mx-auto ">
        <div className="relative mt-6 mb-6 px-2 py-5 bg-white shadow-lg rounded-xl sm:p-12" style={{backgroundImage: `url(${img})`}}>
          <div className="max-w-md mx-auto">
            <div className='mb-2'>
              <h1 className='text-[#435585] text-2xl font-bold max-w-xs w-64 text-center'>
                {!isOTPGenerated
                  ? 'Create an account'
                  : 'OTP has been sent to your email !'}
              </h1>
            </div>
            <div className='divide-y divide-gray-200'>
              <div className='py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
                {isOTPGenerated ? (
                  <div className='relative'>
                    <input
                      id='password'
                      name='password'
                      type='password'
                      className='p-3 rounded-lg border w-full text-slate-700 border-[#27496D] focus:border-[#27496D] focus:outline-none'
                      placeholder='OTP'
                      value={OTP}
                      onChange={(e) => setOTP(e.target.value)}
                    />
                   
                  </div>
                ) : (
                  <>
                    <div className='relative'>
                      <span
                        className={
                          usernameError === 'Valid username'
                            ? 'text-success text-red-500 text-sm'
                            : 'text-danger text-red-500 text-sm'
                        }
                      >
                        
                        {usernameError}
                      </span>
                      <div className='relative'>

                      <input
                        type='text'
                        className="p-3 rounded-lg border w-full text-slate-700 border-[#27496D] focus:border-[#27496D] focus:outline-none"
                        placeholder='Username'
                        // className='border p-3 rounded-lg'  
                        id='username'
                        value={username}
                        onChange={(e) => {
                          validateUsername(e);
                          handleChange(e);
                        }}
                      />
                        <FaUserAlt className="absolute w-9 h-9 top-1/2 right-4 transform -translate-y-1/2 text-[#435585] cursor-pointer" />
                 </div>
                    </div>
                    <div className='relative'>  
                      <span
                        className={
                          emailError === 'Valid Email'
                            ? 'text-success text-red-500 text-sm'
                            : 'text-danger text-red-500 text-sm'
                        }
                      >
                        {emailError}
                      </span>

                      <div className='relative'>
                      <input
                        type='text'
                        placeholder='Email'
                        className="p-3 rounded-lg border w-full text-slate-700 border-[#27496D] focus:border-[#27496D] focus:outline-none"
                        id='email'
                        value={email}
                        onChange={(e) => {
                          validateEmail(e);
                          handleChange(e);
                        }}
                      />
                        <AiTwotoneMail className="absolute w-9 h-9 top-1/2 right-4 transform -translate-y-1/2 text-[#435585] cursor-pointer" />
                 </div>
                    </div>
                    <div className='relative'>
                      <span
                        className={
                          passwordError === 'Strong Password'
                            ? 'text-success text-red-500 text-sm'
                            : 'text-danger text-red-500 text-sm'
                        }
                      >
                        {passwordError}
                      </span>
                      <div className='relative'>
                      <input
                        type='password'
                        placeholder='Password'
                        className="p-3 rounded-lg border w-full text-slate-700 border-[#27496D] focus:border-[#27496D] focus:outline-none"
                        id='password'
                        value={password}
                        onChange={(e) => {
                          validatePassword(e);
                          handleChange(e);
                        }}
                      />
                        <FaUnlockKeyhole className="absolute w-9 h-9 top-1/2 right-4 transform -translate-y-1/2 text-[#435585] cursor-pointer" />
                 </div>
                    </div>
                  </>
                )}
                <div className='relative text-center'>
                  <button
                    type='submit'
                    onClick={
                      !isOTPGenerated ? handleGenerateOTP : handleSignup
                    }
                    disabled={
                      loading ||
                      (isOTPGenerated
                        ? !OTP
                        : !username ||
                          !email ||
                          !password ||
                          usernameError !== 'Valid username' ||
                          emailError !== 'Valid Email' ||
                          passwordError !== 'Strong Password')
                    }
                    className="border-2 bg-[#27496D] text-[#F5EDED] hover:bg-white hover:text-[#27496D] hover:border-[#27496D] p-3 mb-4 rounded-lg uppercase hover:opacity-95 disabled:opacity-90 font-bold py-2 px-4 w-[100%]"
                  >
                    {loading ? 'Loading...' : 'Sign Up'}
                  </button>
                  <div className="relative text-center flex items-center mt-3 mb-4">
                    <div className="border  w-[200px] h-0 mr-2 my-2 border-[#27496D]"></div>
                    <div className='text-[#27496D] text-xl'>or</div>
                    <div className="border  w-[200px] h-0 mr-2 my-2 border-[#27496D]"></div>
                  </div>
                  <OAuth/>
                  {!isOTPGenerated && (
                    <div className='flex gap-2 mt-5 text-[#27496D]'>
                      <p>Have an account?</p>
                      <Link to={'/sign-in'}>
                        <span className='text-[#0E2954]'>Sign in</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default SignUp

