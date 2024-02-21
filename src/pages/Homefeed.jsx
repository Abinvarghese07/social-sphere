import { useEffect, useState  } from "react";
import { db } from "../components/Firebase";
import { getDocs, collection , deleteDoc, doc} from "firebase/firestore";
import {TiDeleteOutline} from 'react-icons/ti';
import Navbar from "../components/Navbar";



const Homefeed = () => {
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

    const deletePost = async (id) => {
        const feedDoc = doc(db,"homefeed",id)
        await deleteDoc(feedDoc)
        window.location.reload();
    }
    return (
        <div className="w-full">
            <Navbar/>
            <div className="flex items-center justify-center p-6 min-w-full scroll-smooth ">
                <div className="font-inria text-white ">
                    <h1 className=" text-3xl font-semibold text-neutral-300 text-center md:text-start ">Home Feed</h1>
                    <div className="p-6 flex  flex-col gap-[60px]">
                        {postData.map((item) => (
                            <div key={item.id} className=" text-neutral-300 p-6 w-[300px] md:w-[750px] bg-zinc-800 rounded-2xl shadow-md shadow-pink-800">
                                <div className="flex flex-col items-start gap-2 px-3">
                                    <div className="flex items-center gap-4">
                                        <img src={item.userProfilePic} width={60} className="rounded-full "></img>   
                                        <h1 className="text-xl font-semibold text-neutral-300 ">{"@" +item.username}</h1>
                                    </div>

                                    <div className="flex  justify-center items-center gap-3">
                                        <h1 className="text-xl font-semibold ml-3 text-white ">{item.caption}</h1>
                                        <div className="bg-zinc-200 h-[8px] w-[8px] rounded-full"></div>
                                        <p className="text-xl font-thin text-pink-700">{item.location}</p>

                                        <div className="flex lg:ml-[360px]" onClick={() => deletePost(item.id)}>
                                            <TiDeleteOutline size={20} className="text-neutral-400"/>
                                        </div>
                                    </div>
                                </div>
                                <p  className="text-xl font-normal px-6">{'#' +item.tags}</p>
                                <div className="w-full p-4">
                                    <img src={item.imageUrl} className="h-[200px] w-full lg:w-[700px] lg:h-[450px]  object-cover object-left rounded-md"></img>    

                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
    </div>


    );
};
                                

export default Homefeed;
            

