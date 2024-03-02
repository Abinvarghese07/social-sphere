import {GoSidebarExpand} from 'react-icons/go';
import {useEffect, useState} from 'react';
import {db} from '../components/Firebase';
import {getDocs, collection,} from 'firebase/firestore';


const Rightbar = () => {

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
        <div className=" group w-1/5 h-screen fixed right-0 top-0  bg-zinc-800 mr-[-250px] hover:mr-[5px] duration-300 ease-out overflow-hidden">
            <div className='p-4 font-inria'>
                <GoSidebarExpand  size={40} className='text-neutral-300 group-hover:text-pink-700 relative left-[-7px] group-hover:rotate-180 duration-500 ease-out'/>  
                <div className='p-10'>
                    <h1 className='text-3xl font-thin text-neutral-300 underline-offset-8 underline decoration-slate-500'>Top Creaters</h1>
                    <div className='grid grid-cols-1 py-5 gap-6'>
                        {postData.map((items) => (
                            <div key={items.id} className='flex items-center gap-2'>
                                <img src={items.userProfilePic} width={40} alt={items.id} className='rounded-full'></img>
                                <h1 className='text-neutral-300 font-thin text-[14px]'>{'#'+items.tags}</h1>
                                <h1></h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rightbar;