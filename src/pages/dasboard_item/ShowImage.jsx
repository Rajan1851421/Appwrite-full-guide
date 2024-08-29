import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFiles } from '../../appwrite/config'
import { GetimageAll } from '../../feature/authSlice'
import { toast } from "react-toastify";
import { storage } from '../../appwrite/config';
import { FiDownloadCloud } from "react-icons/fi";

function ShowImage() {
    const { imageAll } = useSelector((state) => state.auth)
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchImage()
        console.log("all:",imageAll);
        
    }, [])

    const fetchImage = async () => {
        try {
            setLoading(true)
            const fileList = await getAllFiles();
            dispatch(GetimageAll(fileList))
            setLoading(false)
        } catch (error) {
            toast.error(error.message)
        }
    }


    return (
        <>

        


            <div className='grid grid-cols-4 gap-4 w-[95%] mx-auto mt-5 '>
                {/* Display loading text if loading */}
                {loading && (
                    <p className="text-center col-span-4">Loading...</p> // Make sure to occupy full width when loading
                )}

                {/* Render images or no files found message based on file length */}
                {imageAll.length > 0 ? (
                    imageAll.map((img) => (
                        img.mimeType.startsWith('image/') && ( // Check if the file is an image
                            <div key={img.$id} className="flex flex-col items-center gap-4">
                                {/* Image */}
                                <img
                                    src={storage.getFilePreview(img.bucketId, img.$id)}
                                    alt={img.name}
                                    className="w-full h-[200px] object-cover"
                                />

                                {/* Button */}
                                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md w-1/2 flex justify-center
                                     items-center hover:bg-blue-700"
                                    onClick={() => handleDownload(img.$id)}
                                >
                                    Download <FiDownloadCloud className="mx-2" />
                                </button>
                            </div>
                        )
                    ))
                ) : (
                    !loading && <p className="col-span-4 text-center">No files found.</p> // Display message only when not loading and no files
                )}
            </div>
        </>
    )
}

export default ShowImage
