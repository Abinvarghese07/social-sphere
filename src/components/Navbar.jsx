import {Tb3DCubeSphere} from 'react-icons/tb';
import { IoCreateOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import {GiHamburgerMenu} from 'react-icons/gi';
import {IoCloseCircleOutline} from 'react-icons/io5';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const Navbar = () => {
    const{logOut, user} = useContext(AuthContext);
    const navigate = useNavigate();
    const[toggleicon,setToggleIcon] = useState(false);
    const getToggleIcon = () => {
        setToggleIcon(!toggleicon)
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
    
    return (
        <div className='lg:hidden font-inria text-neutral-300 bg-zinc-700 p-3 '>
            <div className='flex items-center justify-around w-full'>
                <Link to='/home'>
                    <div className='flex gap-2 items-center hover:text-black'>
                        <Tb3DCubeSphere size={30}/>
                        <h1 className='text-xl font-bold'>SocialSphere</h1>
                    </div>
                </Link>
                <nav className=''>
                    <ul className='group flex items-center gap-2'>
                        <li>
                            <img src={localStorage.getItem('profilePic')} width={40} className='rounded-full group-hover:scale-110'></img>
                        </li>
                        <Link to='/account'>
                            <li>
                                <h1 className='font-thin text-white text-lg group-hover:text-pink-700 '>{localStorage.getItem('name')}</h1>

                            </li>
                        </Link>
                    </ul>


                </nav>
                        <div onClick={getToggleIcon}>
                             {!toggleicon ? <GiHamburgerMenu size={20}/> : <IoCloseCircleOutline size={20}/>}
                        </div>

            </div>
                        {
                            <ul className={!toggleicon? "hidden" : "bg-slate-300 w-full h-full p-8 text-center mt-3"}>
                                <Link to='/createPost'>
                                    <div className='text-black flex items-center justify-center gap-1 border-b border-slate-600 p-4'>
                                    <IoCreateOutline size={30}/>
                                    <h1 className='text-xl'>Create Post</h1>
                                    </div>
                                </Link>
                                <div className='text-neutral-300 flex justify-center py-5'>
                                    <button className='bg-pink-700 text-white px-16 text-lg font-semibold py-2 rounded-md'  onClick={handleLogout}>Log Out</button>
                                </div>
                            </ul>
                        }
        </div>
    );
                                    
};




export default Navbar;
                 

