import React, { useState, useEffect } from 'react';
import { ID } from 'appwrite';
import { storage, getAllFiles } from '../appwrite/config';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { GetimageAll } from '../feature/authSlice';
import { FiDownloadCloud } from "react-icons/fi";



function BlogPost() {
    const { imageAll } = useSelector((state) => state.auth)
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState()
    const dispatch = useDispatch()



    const viewImage = () => {
        getFileImage()
    }

    const fetchFiles = async () => {

        try {
            setLoading(true)
            const fileList = await getAllFiles();
            console.log("A:", fileList);
            dispatch(GetimageAll(fileList))
            setLoading(false)
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };

    const handleUpload = async () => {
        if (!image) {
            alert("Select Image")
            console.log("No image selected");
            return;
        }

        try {
            const response = await storage.createFile(
                import.meta.env.VITE_APPWRITE_BUCKET_ID,
                ID.unique(),
                image
            );
            console.log("Image uploaded successfully:", response);
            if (response) {
                toast.success("Uploaded")
                setImage(null)
            } else {
                toast.error("failed")
            }
        } catch (error) {
            console.log("Image upload failed:", error);
        }
    };

    const getFileImage = async () => {
        fetchFiles()
        // console.log("storage", files);

    }

    const handleDownload = async ($id)=>{
        console.log("clicked",$id);
        
        try {
            const result = storage.getFileDownload(import.meta.env.VITE_APPWRITE_BUCKET_ID , $id);
            console.log("Downloaded:",result);
            window.open(result, '');
            
        } catch (error) {
            console.log("Download:",error);
            
        }
    }



    return (
        <>
            <div className='bg-gray-400 h-screen'>
                <div className='flex place-content-center '>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fileInput">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                            onChange={(e) => setImage(e.target.files[0])}  // Correctly handle the event
                        />
                        <p className="mt-1 text-xs text-gray-500">Please upload an image file (jpg, png, etc.).</p>
                    </div>
                </div>

                <div className='flex justify-center '>
                    <div className='flex justify-around '>
                        <button
                            onClick={handleUpload}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                        >
                            Upload
                        </button>
                        <button
                            onClick={viewImage}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none mx-1"
                        >
                            View Image
                        </button>
                    </div>
                </div>

               


            </div>


        </>
    );
}


export default BlogPost;
