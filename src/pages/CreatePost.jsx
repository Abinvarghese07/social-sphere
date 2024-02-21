import {  useState } from 'react';
import {IoCreateOutline} from 'react-icons/io5';
import { storage } from '../components/Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { collection , addDoc} from 'firebase/firestore';
import { db } from '../components/Firebase';
import Navbar from '../components/Navbar';

const CreatePost = () => {
    const postCollectionRef = collection(db, "homefeed");

    const[caption,setCaption] = useState("");
    const[location,setLocation] = useState("");
    const[tags,setTags] = useState("");
    const[imageUpload, setImageUpload] = useState("")
    const userProfilePic = localStorage.getItem("profilePic")
    const username = localStorage.getItem("name")
 
    const handlecreatePost = async () => {
        alert("Post created succesfully !")
        await addDoc(postCollectionRef,{
            caption:caption,
            location:location,
            tags:tags,
            imageUrl:imageUpload,
            userProfilePic:userProfilePic,
            username : username
        });
    }

   
   
 
    const handleImageUpload =async (e)=> {
        console.log(e.target.files[0]);
        const imageRef = await ref(storage, `files/${v4()}`);
        uploadBytes(imageRef, e.target.files[0]).then(data => {
            getDownloadURL(data.ref).then(val => {
                setImageUpload(val)
            })
        })
        

    }
    return (
        <div className='w-full'>
            <Navbar/>
            <div className='flex flex-grow justify-center min-w-full p-5 lg:mr-[500px] '>
                <div className=' font-inria text-white'>
                    <div className=' flex gap-3 items-center text-3xl justify-center lg:justify-start'>
                        <IoCreateOutline/>
                        <h1>Create Post</h1>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex flex-col gap-3  ml-[50px] py-4 w-full'>
                            <h1 className='text-2xl text-pink-700 font-semibold '>Caption</h1>
                            <textarea cols={4} rows={3} className='h-[100px] w-[300px] rounded-md text-black p-3 ' onChange={(e) => setCaption(e.target.value)}></textarea>
                        </div>
                        <div className='flex flex-col gap-3 ml-[50px] py-4'>
                            <h1 className='text-2xl text-pink-700 font-semibold'>Upload Image</h1>
                            <div className='flex flex-col gap-2'>
                                <input className='bg-zinc-800 rounded-md ' type='file' onChange={(e) => handleImageUpload(e)} ></input>

                            </div>
                        </div>
                        <div className='flex flex-col gap-3 ml-[50px] py-4'>
                            <h1 className='text-2xl text-pink-700 font-semibold '>Location</h1>
                            <input className='px-3 py-2 rounded-md text-black' onChange={(e) => setLocation(e.target.value)}></input>
                        </div>
                        <div className='flex flex-col gap-3 ml-[50px] py-4'>
                            <h1 className='text-2xl text-pink-700 font-semibold'>Tags</h1>
                            <input className='px-3 py-2 rounded-md text-black' placeholder='seperate by ,' onChange={(e) => setTags(e.target.value)}></input>
                        </div>
                        <div className='flex justify-center bg-pink-700 text-white px-5 text-lg font-semibold py-2 rounded-md gap-3 ml-[50px] ' onClick={handlecreatePost}>
                            <button>Create Post</button>
                        </div>
                        
                    </div>
                    
                    

                </div>
            </div>

        </div>
    );
};

export default CreatePost;

                    
                        