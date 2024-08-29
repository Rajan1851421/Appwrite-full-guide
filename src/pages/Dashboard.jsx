import React, { useState } from 'react'
import ShowImage from './dasboard_item/ShowImage'
import PostBlog from '../pages/BlogPost'
import { FaRegImage } from "react-icons/fa";
import Register from './Register'
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaCashRegister } from "react-icons/fa";

function Dashboard() {
  
    const [activePage, setActivePage] = useState('ShowImage'); // State to manage the active page

    
    const handleBtnClick = (page) => {
      setActivePage(page);
    };
  
  return (
    <>
      <div className='h-screen bg-black flex'>
        {/* Fixed section */}
        <div className="w-1/4 bg-gray-400 p-4 fixed top-18 left-0 h-full flex flex-col">
          <div className='grid grid-row gap-y-4 '>
            <button onClick={() => handleBtnClick('ShowImage')}
              className='bg-blue-800 rounded-sm px-2 text-white font-bold uppercase py-2 text-start mx-auto w-full flex justify-center md:justify-start items-center'>
                 <FaRegImage className='mx-2' /> <span className='hidden md:block' >Show All Image</span>
            </button>
            <button onClick={() => handleBtnClick('Page2')}
              className='bg-blue-800 rounded-sm px-2 text-white font-bold uppercase py-2 text-start mx-auto w-full flex justify-center md:justify-start items-center ' >
             <IoCloudUploadOutline className='mx-2'  />   <span className='hidden md:block' >Upload Image</span>
            </button>
            <button onClick={() => handleBtnClick('Page3')}
              className='bg-blue-800 rounded-sm px-2 text-white font-bold uppercase py-2 text-start mx-auto w-full flex justify-center md:justify-start items-center '>
                <FaCashRegister className='mx-2' /> <span className='hidden md:block'>Register</span> 
            </button>
          </div>
        </div>

        {/* Scrollable section */}
        <div className="ml-1/4 w-3/4 bg-gray-100 p-4 h-full ml-auto overflow-y-auto">
          {activePage === 'ShowImage' && <ShowImage />}
          {activePage === 'Page2' && <PostBlog/> }
          {activePage === 'Page3' && <Register/> }
        </div>
      </div>

    </>
  )
}

export default Dashboard
