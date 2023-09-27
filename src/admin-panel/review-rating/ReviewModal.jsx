import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import Rating from './Rating'
import { getToken } from '../../hook/getToken'
const ReviewModal = ({ isVisible, onCLose, id, rating, isActive, title, description }) => {

    // const { _id, rating, title, description, img_1, img_2, img_3, img_4, img_5, isActive } = data
    // const images = [img_1, img_2, img_3, img_4, img_5].filter(img => img !== (null || undefined))
    // console.log("product_id", _id);

    //Handling the value
    let [images, setImages] = useState()
    async function getReview() {
        try {
            const token = localStorage.getItem('access_token'); // Replace with your actual bearer token
            const url = `${process.env.REACT_APP_URL}/v1/review/get/${id}`;

            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                const img_1 = data.review.img_1
                const img_2 = data.review.img_2
                const img_3 = data.review.img_3
                const img_4 = data.review.img_4
                const img_5 = data.review.img_5

                images = [img_1, img_2, img_3, img_4, img_5].filter(img => img !== (null || undefined))
                setImages(images)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getReview()
    }, [])

    const [formData, setFormData] = useState({
        title: title,
        description: description
    })
    const handleClick = async (body, id) => {

        const apiUrl = `${process.env.REACT_APP_URL}/v1/review/activateReview/${id}`
        const token = getToken()
        // Create the headers object with the authorization token
        const headers = {
            'Content-Type': 'application/json', // Set the content type to JSON
            'Authorization': `Bearer ${token}`, // Add the authorization token
        };

        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body), // Convert the data to JSON format
        });
        if (res.ok) {
            toast.success('Change done successfully')
            onCLose('close')
        }
        const data = await res.json()
        console.log('data', data);
    }


    const handleClose = (e) => {
        const { id } = e.target;
        if (id === "review-modal") {
            onCLose('close')
        }
    }
    if (!isVisible) return null
    return (
        <div
            onClick={(e) => handleClose(e)}
            id='review-modal'
            className=' fixed inset-0 z-50 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center'>
            <div className=' w-9/12 rounded-2xl  flex flex-col justify-center items-center bg-white p-5'>

                <Rating
                    rating={rating}
                />
                <div className='w-full flex flex-col py-5'>
                    <input
                        type='text'
                        placeholder='Title'
                        name='title'
                        value={formData?.title}
                        maxLength={100}
                        className='w-full py-2 px-6 bg-white rounded shadow outline-none focus:ring-1'
                    />

                </div>
                <div className='w-full flex flex-col'>
                    <textarea
                        name="description"
                        value={formData?.description}
                        id=""
                        rows="4"
                        type="text"
                        maxLength={500}
                        className='w-full py-2 px-6 bg-white rounded shadow outline-none focus:ring-1'
                        placeholder='Your Review'
                    >
                    </textarea>
                </div>

                {images?.length > 0
                    && <div className="w-full  p-4 border border-gray-300 rounded-lg shadow my-5">
                        <div className="flex  items-center">
                            {images?.length > 0 && (
                                <div className="w-fit flex flex-wrap ml-4">
                                    {images?.map((image, index) => (
                                        <div key={index} className=" relative mr-4">
                                            <img
                                                src={image}
                                                alt={`Image ${index + 1}`}
                                                className="w-20 aspect-square object-cover rounded"
                                            />

                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                }

                <div className='felx justify-center space-x-5 mt-5'>
                    <button
                        disabled={isActive}
                        onClick={() => handleClick({ isActive: true }, id)}
                        className='py-2 px-6 rounded bg-green-500 text-white' >Verify</button>
                    <button
                        disabled={!isActive}
                        onClick={() => handleClick({ isActive: false }, id)}
                        className='py-2 px-6 rounded bg-red-500 text-white' >Decline</button>
                </div>

            </div>
        </div>
    )
}

export default ReviewModal