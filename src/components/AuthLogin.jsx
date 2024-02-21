import {Tb3DCubeSphere} from 'react-icons/tb';
import bgImg from '../assets/pexels-steve-johnson-13312401.jpg';
import {FcGoogle} from 'react-icons/fc';
import {signInWithPopup} from 'firebase/auth';
import {auth, provider} from './Firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';



const AuthLogin = () => {
  const {logIn , usernameData} = useContext(AuthContext);
  const navigate = useNavigate ();

  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[usernames,setUsernames] = useState("")
  const[error,setError] = useState("")
   const handleSubmit = async (event) => {
        event.preventDefault();
        usernameData(usernames);
        setError("");
        try{
            await logIn(email,password)
            navigate('/home')
        }
        catch (err){
            setError(err.message)
        }
    }
  
    


  const handleGoogleSignIn = (event) => {
    event.preventDefault()
    return signInWithPopup(auth, provider)
    .then((result) => {
            navigate('/home')
            const name = result.user.displayName;
            const profilePic = result.user.photoURL;
            const email = result.user.email
            const phoneNo = result.user.phoneNumber;
            localStorage.setItem("name",name);
            localStorage.setItem("profilePic",profilePic);
            localStorage.setItem("email",email)
            localStorage.setItem("phoneNo",phoneNo)

            
        })
  }



  return (
    <div className="flex font-inria ">
      <div className="flex flex-col items-center w-full text-white md:w-1/2 mt-[5%] h-full">
        <div className="flex items-center gap-2 mb-10">
          <Tb3DCubeSphere size={30} />
          <h1 className="text-3xl">SocialSphere</h1>
        </div>
        <div className="flex flex-col items-center py-3 gap-4">
          <h1 className="text-3xl md:text-4xl font-semibold">Sign In to your account</h1>
          <p className="font-thin">
            To use SocialSphere, Please enter your details
          </p>
        </div>
        <form className="flex flex-col w-[300px] md:w-[400px] gap-2">
          {error && <h1 className='bg-red-800 px-8 py-1 rounded-md text-center'>{error}</h1>}
        
          <label>Username</label>
          <input
            className="bg-slate-200 px-4 py-2 rounded-md text-black"
            type="text"
            onChange={(e) => setUsernames(e.target.value)}
          />
          <label>Email</label>
          <input
            className="bg-slate-200 px-4 py-2 rounded-md text-black"
            type="email"
            name='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            className="bg-slate-200 px-4 py-2 rounded-md text-black"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='py-3 flex flex-col gap-4'>

            <button className="bg-pink-700 text-white w-full px-4 py-2 rounded-md" onClick={handleSubmit}>
              Sign In
            </button>
            <div onClick={handleGoogleSignIn}>
              <button className='bg-pink-700 text-white w-full px-4 py-2 rounded-md flex items-center gap-1 justify-center'>Sign in with <span><FcGoogle/></span></button>

            </div>

          </div>

          <div className="flex justify-center py-2">
            <Link to='/'>
              <button className="font-thin">
                Do not have an account?
                <span className="text-pink-700"> Sign Up</span>
              </button>

            </Link>
          </div>
        </form>

      </div>
      <div className="hidden md:flex w-1/2 h-screen">
        <img src={bgImg} alt="logo" className="w-full h-full object-cover" />

      </div>
    </div>
  );
};

export default AuthLogin;
