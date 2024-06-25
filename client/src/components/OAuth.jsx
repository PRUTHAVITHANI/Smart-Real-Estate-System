import { GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async()=>{
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app)

            const result = await signInWithPopup(auth,provider);
            const res = await fetch('/api/auth/google' , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name:result.user.displayName, email: result.user.email, photo: result.user.photoURL}),
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            toast("Register successfully", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            navigate('/'); 
        }catch(error){
            toast("Something went wrong, please try again", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            console.log('could not sign in with google', error );
        }
    }
  return (
//    <bultton onClick = {handleGoogleClick}type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Continue With Google</bultton>
   <div className="relative text-center border-2 bg-white rounded-lg border-[#27496D] hover:border-[#27496D]">
      <button
        className=" flex items-center text-[#27496D] justify-center py-2 px-4 rounded w-[100%] "
        onClick={handleGoogleClick}
      >
        <FcGoogle className="mr-2 w-6 h-6" /> Sign in with Google
      </button>
    </div>
  )
}

export default OAuth