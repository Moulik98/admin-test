import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { User } from '../../../user/User'
import { getToken } from '../../../../hook/getToken';
import { useLocation } from 'react-router-dom';
import componentRegistry from './ComponentRegistry';
const Preview = () => {
    const [data, setData] = useState([])
    const [isStatusChanged, setIsStatusChanged] = useState(false)
    const [id, setId] = useState('')
    const [contentDetails, setContentDetails] = useState({})
    const [error, setError] = useState('')
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const status = {
        pending: 'bg-blue-500 text-white',
        declined: 'bg-red-500 text-white',
        approved: 'bg-green-500 text-white',
    }
    // Access individual query parameters
    const product_id = queryParams.get('product_id');
    const variation_group_id = queryParams.get('variation_group_id');

    useEffect(() => {

        fetch(`${process.env.REACT_APP_URL}/v1/product-cms/get-product-dtl-content?product_id=${product_id}&variation_id=${variation_group_id}`).then(res => res.json()).then(data => {
            console.log('data', data.response);
            setError(data.error)
            setContentDetails({
                contentName: data?.response?.content_name,
                status: data?.response?.status
            })
            setId(data?.response?._id)
            setData(data?.response?.data)
        });

    }, [product_id, variation_group_id, isStatusChanged]);

    const handleClick = async (status) => {
        const apiUrl = `${process.env.REACT_APP_URL}/v1/product-cms/verify-content/${id}`;
        const body = {
            status: status
        };
        const token = getToken()
        // Replace with your actual authorization token

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the token in the 'Authorization' header
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                // Request was successful
                toast.success('Status updated successfully')
                setIsStatusChanged((pre) => !pre)
                const data = await response.json();
                console.log(data);

                // Do something with the response data
            } else {
                // Request failed
                console.error('Request failed:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <main>
            <div className='flex flex-col'>
                <section>
                    <div className='max-w-5xl mx-auto flex justify-between items-center py-5 pr-5'>
                        <p className='text-2xl text-gray-900 font-semibold'>A+ Content Preview</p>
                        <div className='flex gap-x-10'>
                            <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
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
                <section>
                    <div>
                        {error && <h1 className='text-3xl text-black font-medium'>{error}</h1>}
                    </div>
                    <div className='flex justify-between pr-5 items-center'>
                        <h1 className='text-xl text-gray-900 font-semibold'>{contentDetails?.contentName}</h1>
                        <button className={`py-2 px-4 rounded-md ${status[contentDetails?.status]}`}>{contentDetails?.status}</button>
                    </div>
                    <div className='mt-5'>
                        {data?.map((item, index) => {
                            const ComponentToRender = componentRegistry[item.component];
                            if (ComponentToRender) {
                                return <ComponentToRender
                                    key={index}
                                    data={item.data}
                                />
                            } else {
                                return null; // You can return null if you don't want to render anything for other cases
                            }
                        })}
                    </div>

                    <div className='flex justify-center items-center space-x-5 my-5'>
                        <button
                            onClick={() => handleClick('approved')}
                            className='py-2 px-4 rounded-md bg-green-500 text-white'>
                            Approve
                        </button>
                        <button
                            onClick={() => handleClick('declined')}
                            type='button'
                            className='py-2 px-4 rounded-md bg-red-500 text-white'>
                            Decline
                        </button>
                    </div>
                </section>
            </div >
        </main>
    )
}

export default Preview