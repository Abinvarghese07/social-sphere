import {useEffect, useState} from 'react';
import {db} from '../components/Firebase';
import {getDocs, collection} from 'firebase/firestore';
import {IoMdArrowBack} from 'react-icons/io';
import { Link } from 'react-router-dom';


const People = () => {
    
     const postCollectionRef = collection (db, 'homefeed');  
    const [postData, setPostData] = useState ([]);
    const getPostData = async () => {
       const data = await getDocs(postCollectionRef);
       console.log(data);
       const filteredData = data.docs.map((doc) => ({...doc.data(),
        id:doc.id,
    }))
        setPostData(filteredData)

    }

    useEffect(() => {
        getPostData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <div className="flex justify-start p-16">
            <div className="font-inria text-neutral-300 p-10">
                <Link to='/home'>
                    <div className="flex justify-start items-start mr-[380px] relative top-[-35px]">
                        <IoMdArrowBack size={20} className="text-white"/>
                    </div>
                </Link>
                <h1 className="text-3xl underline underline-offset-8">All Users</h1>
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-[100px] lg:px-20 lg:py-10  mt-10 '>
                    {postData.map((items) => (
                            <div key={items.id} className='flex items-center gap-2'>
                                <img src={items.userProfilePic} width={80} alt={items.id} className='rounded-full'></img>
                                <h1 className='text-neutral-300 font-thin text-lg'>{items.username}</h1>
                                <h1></h1>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default People;