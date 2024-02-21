import {Tb3DCubeSphere} from 'react-icons/tb';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {  useNavigate } from 'react-router-dom';
import {FiHome} from 'react-icons/fi';
import {PiGlobeHemisphereEast} from 'react-icons/pi';
import {MdOutlinePeopleAlt} from 'react-icons/md';
import {CiBookmarkCheck} from 'react-icons/ci';
import {IoCreateOutline} from 'react-icons/io5';
import { Link } from 'react-router-dom';



const Sidebar = () => {
    const { user ,username, logOut} = useContext(AuthContext);
    console.log({user})
    const navigate = useNavigate()
    const[isActive,setActive] = useState(false);

    const handleActive = () => {
        setActive(!isActive)
        navigate('/home')
    }


   

    const handleLogout =() => {
        if(localStorage.getItem("name")){
            localStorage.clear();
            navigate('/login')
        } else if(user)  {
              logOut();
              navigate('/')
        }
    }

    
    const linktoCreate = () => {
        navigate('/createPost')
    }
    
    



    return (
        <div className=" hidden lg:flex w-1/5 h-screen fixed left-0 top-0  bg-zinc-800">
            <div className=" font-inria">
               <div className='flex justify-center p-6 items-center gap-2 text-neutral-300 border-b-2 border-slate-900'>
                    <Tb3DCubeSphere size={30}/>
                    <h1 className='text-3xl'>SocialSphere</h1>
                </div>
                <Link to='/account'>
 
                    <div className='text-neutral-300 px-5 py-4 flex items-center gap-4 border-b-2 border-slate-900 group'>
                        
                        <img src={localStorage.getItem("profilePic")} height={90} width={90} className='rounded-full object-cover group-hover:scale-105'></img>
                        <div className='flex flex-col '>
                            <h1 className='text-2xl font-semibold group-hover:text-pink-700'>{localStorage.getItem("name")}</h1>
                            <h1 className='font-thin text-slate-400 px-3'>{localStorage.getItem("name")}</h1>
                            <p className='text-2xl font-semibold group-hover:text-pink-700'>{localStorage.getItem("name")? "" : `${username}`}</p>
                            

                        </div>
                    </div>
                </Link>
                <div className='flex flex-col  text-neutral-300 py-3 gap-3'>
                    <div className='flex gap-3 items-center text-2xl px-8  p-4 mr-5 hover:bg-pink-700 duration-200 ease-out' onClick={handleActive}>
                        <FiHome ></FiHome>
                        <h1>Home</h1>
                    </div>
                    <div className='flex gap-3 items-center text-2xl px-8 p-4 mr-5  hover:bg-pink-700 duration-200 ease-out' onClick={linktoCreate}>
                        <IoCreateOutline/>
                        <h1>Create Post</h1>
                    </div>
                    <Link to='/people'>
                        <div className='flex gap-3 items-center text-2xl  px-8 p-4 mr-5  hover:bg-pink-700 duration-200 ease-out'> 
                            <MdOutlinePeopleAlt/>
                            <h1>People</h1>
                        </div>
                    </Link>
                    <div className='flex gap-3 items-center text-2xl px-8  p-4 mr-5  hover:bg-pink-700 duration-200 ease-out'>
                        <PiGlobeHemisphereEast />
                        <h1>Explore</h1>
                    </div>
                    
                     <div className='flex gap-3 items-center text-2xl px-8 p-4 mr-5  hover:bg-pink-700 duration-200 ease-out'>
                        <CiBookmarkCheck/>
                        <h1>Saved</h1>
                    </div>
                </div>
                <div className='text-neutral-300 flex justify-center py-5'>
                    <button className='bg-pink-700 text-white px-16 text-lg font-semibold py-2 rounded-md' onClick={handleLogout}>log out</button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
