import React, { useState } from 'react'
import Rating from './Rating'
const ReviewModal = ({ isVisible, onCLose, data }) => {
    const { _id, rating, title, description, img_1, img_2, img_3, img_4, img_5 } = data
    const images = [img_1, img_2, img_3, img_4, img_5].filter(img => img !== null)

    //Handling the value

    const [formData, setFormData] = useState({
        productId: _id,
        title: title,
        description: description
    })


    const handleClose = (e) => {
        const { id } = e.target;
        if (id === "review-modal") {
            onCLose('close')
        }
    }
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

                <div className="w-full  p-4 border border-gray-300 rounded-lg shadow my-5">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Upload Images (Up to 5)
                    </label>
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

                <div className='felx justify-center space-x-5'>
                    <button>Verify</button>
                    <button>Cancel</button>
                </div>

            </div>
        </div>
    )
}

export default ReviewModal