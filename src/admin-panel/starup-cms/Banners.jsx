import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { User } from '../user/User'
import UploadIcon from './UploadIcon'
const Banners = () => {
    const [images, setImages] = useState([])
    const [isUploaded, setIsuploaded] = useState(false)
    useEffect(() => {
        const apiUrl = `${process.env.REACT_APP_URL}/v1/cms/getBanner`
        fetch(apiUrl).then(res => res.json()).then(data => {
            setImages(data.data)
        })
    }, [isUploaded])

    async function makePostRequest(url, data) {
        console.log('url,data', url, data);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // You can add other headers here if needed
                },
                body: JSON.stringify(data), // Convert the data to JSON format
            });
            if (response.ok) {
                setIsuploaded(preValue => !preValue)
            }
            const responseBody = await response.json(); // Parse the JSON response

            return responseBody;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    const handleUpdate = async (e, id) => {
        const apiUrl = `${process.env.REACT_APP_URL}/v1/cms/startup-banner-update/${id}`
        const { files } = e.target;
        const file = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const body = { image: reader.result }
            makePostRequest(apiUrl, body)
                .then(responseData => {
                    if (!responseData.success) {
                        toast.error(responseData.message)
                    }
                    console.log('Response data:', responseData);
                })
                .catch(error => {
                    console.error('Request failed:', error);
                });
        };
    }
    const handleStatus = async (id) => {
        const apiUrl = `${process.env.REACT_APP_URL}/v1/cms/toggleBannerStatus/${id}`;

        try {
            const res = await fetch(apiUrl, {
                method: "POST",
            });

            if (res.status === 200) {
                // Handle success
                toast.success("Status toggled successfully.");
                setIsuploaded(preValue => !preValue)
            } else {
                // Handle other status codes
                toast.error("Status toggle failed.");
            }
        } catch (error) {
            // Handle network errors or exceptions
            console.error("An error occurred:", error);
        }
    };

    return (
        <main className='flex flex-col'>
            <section className='mr-7'>
                <div className='max-w-6xl mx-auto flex justify-between items-center py-5'>
                    <Link to='/review-rating' className='text-3xl text-gray-900 font-semibold'>Startup Banners</Link>
                    <div className='flex gap-x-10'>
                        <form className="flex items-center">
                            <div className="flex items-center px-2 py-1 gap-x-1 bg-gray-100 rounded-2xl ">
                                <div className=' bg-white rounded-full p-1'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    className="w-52 py-1 px-1 bg-gray-100 outline-0"
                                    //   value={searchTerm}
                                    //   onChange={handleSearch}
                                    type="text"
                                />

                            </div>
                        </form>
                        <User />
                    </div>
                </div>
            </section>
            <section className='w-full flex flex-wrap '>
                <div className="w-full grid grid-cols-4 grid-flow-row gap-4 px-8 py-6">
                    {
                        images?.map(item => {
                            const fillColor = item.status ? 'red' : 'none'
                            const textColor = item.status ? 'text-red-500' : 'text-black'
                            return (

                                <div className="relative">
                                    <input
                                        type="file"
                                        name="main_img"
                                        id="main_img"
                                        onChange={(e) => handleUpdate(e, item._id)}
                                        className="border bg-[#e2eced] border-gray-400 h-8 w-full rounded-md px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <div
                                        onClick={() => handleStatus(item._id)}
                                        className='cursor-pointer absolute -top-5 -right-5'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill={fillColor} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${textColor} w-6 h-6`}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                        </svg>

                                    </div>
                                    <div className="w-full h-40 bg-[#e2eced] flex items-center justify-center">

                                        {item.image ?
                                            <img
                                                src={item.image}
                                                alt="Main"
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                            : <UploadIcon />
                                        }


                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </main>
    )
}

export default Banners