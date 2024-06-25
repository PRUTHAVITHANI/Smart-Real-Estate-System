import { useState } from 'react';
import {Link , useNavigate} from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { signInStart , signInSuccess , signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from 'validator';
import img from "../assets/image/signup.jpeg";
import { AiTwotoneMail } from "react-icons/ai";
import { FaUserLock } from "react-icons/fa";

function SignIn() {
  const [formData , setFormData] = useState({});
  const { loading , error } = useSelector((state) => state.user);
  const [admin, setAdmin] = useState("user");
  const [isAdminSelected, setisAdminSelected] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange =(e) =>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  };

  const validatePassword = (e) => {
    setPassword(e.target.value);
    if (admin === "admin") return;
    if (validator.isStrongPassword(e.target.value)) {
      setPasswordError("Strong Password");
    } else {
      setPasswordError(
        "Passwords must have at least 8 characters and contain the following: uppercase letters, lowercase letters, numbers, and symbols*"
      );
    }
  };

  const validateEmail = (e) => {
    setEmail(e.target.value);
    if (admin === "admin") return;
    if (validator.isEmail(e.target.value)) {
      setEmailError("Valid Email");
    } else {
      setEmailError("Invalid Email*");
    }
  };


const handleLogin = async(e) => {

  if (isAdminSelected) {
    e.preventDefault();
    try {
      dispatch(signInStart());
     const res = await fetch('/api/auth/adminLogin', 
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
       dispatch(signInFailure(data.message));
       toast(data.message, {
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
      toast("Login successfully", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(signInSuccess(data));
      navigate('/admin/adminDashboard')
    } catch (error) {
        dispatch(signInFailure(error.message));
    }
  } else {
    e.preventDefault();
    try {
      dispatch(signInStart());
     const res = await fetch('/api/auth/signin', 
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
       dispatch(signInFailure(data.message));
       toast(data.message, {
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
      toast("Login successfully", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(signInSuccess(data));
      navigate('/')
    } catch (error) {
        dispatch(signInFailure(error.message));
    }
    
  }
 
};   
  return (
    <>
    <div className="bg-[#ECF2FF] py-2 flex flex-col justify-center sm:py-8">
      <div className="relative py-2 w-[450px] sm:max-w-md sm:mx-auto ">
        <div className="relative mt-6 mb-6 px-2 py-5 bg-white shadow-lg rounded-xl sm:p-12" style={{backgroundImage: `url(${img})`}}>
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <h1 className="text-[#435585] text-2xl font-bold max-w-xs w-64 text-center">
                Login to your account
              </h1>
            </div>
            <div className=" flex justify-around p-4 "> 
              <div className=''>
                <input
                  type="radio"
                  id="admin"
                  name="admin"
                  value="admin"
                  onChange={(e) => {
                    setAdmin(e.target.value);
                    setisAdminSelected(true);
                  }}
                  checked={admin === "admin"}
                  className="mx-1.5"
                />

                <label className='text-[#435585] font-semibold font-sans text-lg' htmlFor="admin">Admin</label>
              </div> 
              <div>
                <input
                  type="radio"
                  id="user"
                  name="user"
                  value="user"
                  onChange={(e) => {
                    setAdmin(e.target.value);
                    setisAdminSelected(false);
                  }}
                  checked={admin === "user"}
                  className="mx-1.5"
                />
                <label className='text-[#435585] font-semibold font-sans text-lg' htmlFor="user">User</label>
              </div> 
           </div> 
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
     
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
                    <div className="relative">
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
                    <div className="relative">
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
                        <FaUserLock className="absolute w-9 h-9 top-1/2 right-4 transform -translate-y-1/2 text-[#435585] cursor-pointer" />
                 </div>

                  </div>
                <div className="relative text-center">

                  {isAdminSelected ? (
                    <>
                      <button
                        className="border-2 bg-[#27496D] text-[#F5EDED] hover:bg-white hover:text-[#27496D] hover:border-[#27496D] p-3 mb-4 rounded-lg uppercase hover:opacity-95 disabled:opacity-90 font-bold py-2 px-4 w-[100%]"
                        onClick={handleLogin}
                      >
                        Login
                      </button>
                    </>
                  ) : (
                    <>
                     
                    <button  onClick={handleLogin}
                       disabled={loading || emailError !== 'Valid Email' || passwordError !== 'Strong Password'}
                            className="border-2 bg-[#27496D] text-[#F5EDED] hover:bg-white hover:text-[#27496D] hover:border-[#27496D] p-3 mb-4 rounded-lg uppercase hover:opacity-95 disabled:opacity-90 font-bold py-2 px-4 w-[100%]">
                    {loading ? 'Loading...' : 'Login'}</button>
                    </>
                  )}
                </div>

                {!isAdminSelected && (
                <div className="relative text-center flex items-center">
                  <div className="border  w-[200px] h-0 mr-2 my-2 border-[#27496D]"></div>
                  <div className='text-[#27496D] text-xl'>or</div>
                  <div className="border  w-[200px] h-0 mr-2 my-2 border-[#27496D]"></div>
                </div>

)}

                {!isAdminSelected && (
            
            <OAuth/>
                )}

{!isAdminSelected && (
            
                <div className='flex gap-2 mt-5 text-[#27496D]'>
              <p>Don't Have an account?</p> 
              <Link to={"/sign-up"}>
                <span className='text-[#0E2954]'>Sign up</span>
            </Link>
       </div>

)}

              {/* <div>
<Link to='/forget-password'>Forget Password</Link>
</div>  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </>
  )
}

export default SignIn