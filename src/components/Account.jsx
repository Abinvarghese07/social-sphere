import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./Firebase";
import {IoMdArrowBack} from 'react-icons/io';
import { Link } from "react-router-dom";

const Account = () => {
    const postCollectionRef = collection (db, 'homefeed');

    const[userData, setuserData] = useState([]);

    const getUserData = async () => {
        const result = await getDocs(postCollectionRef)
        const filteredResult = result.docs.map((doc) => ({...doc.data(),
        id:doc.id,
    }))
        console.log(filteredResult);
        setuserData(filteredResult);
    }

    useEffect(() => {
        getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const{username , user ,logOut} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogout =() => {
        if(localStorage.getItem("name")){
            localStorage.clear();
            navigate('/login')
        }
         else if(user)  {
              logOut();
              navigate('/login')
        }
    }
    

    return (
        <div className="flex justify-center py-[100px] ">
            
            <div className="text-slate-400 flex justify-center flex-col items-center font-inria shadow-lg shadow-pink-700 p-11 group">
                <Link to='/home'>
                    <div className="flex justify-start items-start mr-[380px] relative top-[-20px]">
                        <IoMdArrowBack size={20} className="text-white"/>
                    </div>
                </Link>
                <div className="flex items-center gap-6 border-2 border-slate-600 px-10  py-4 rounded-md ">
                    <img src={localStorage.getItem("profilePic")} className="rounded-full group-hover:rotate-180 duration-500"></img>       
                    <h1 className="text-3xl font-semibold">{localStorage.getItem("name")? localStorage.getItem("name") : `${username}`}</h1>
                </div>
                <div className="flex flex-col p-6 gap-2  ">
                    
                    <h1 className="text-2xl font-thin ">Name - <span className="underline">{localStorage.getItem("name")? localStorage.getItem("name"): `${username}`}</span></h1>
                    <h1 className="text-2xl font-thin ">Email - <span className="underline">{localStorage.getItem("name")? localStorage.getItem("email"): `${user.email}`}</span></h1>
                </div>
                <div className="p-6" onClick={handleLogout}>
                    <button className="bg-pink-700 text-white px-16 text-lg font-semibold py-2 rounded-md">Log Out</button>
                </div>
                {
                    userData.map((value) => (
                        <div key={value.id}>
                        </div>
                    ))
                }

            </div>
        </div>
    );
};

export default Account;

