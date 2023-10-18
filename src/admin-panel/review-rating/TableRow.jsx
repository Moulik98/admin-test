import React, { useState } from 'react'
import Description from '../../Description'
import Rating from './Rating'
import ReviewModal from './ReviewModal'
const TableRow = ({ data, onDelete }) => {
    const { _id, isActive, rating, title, description, userName, productInfo, productImages } = data

    const [showModal, setShowModal] = useState(false)
    const handleClose = (value) => {
        if (value === 'close') {
            setShowModal(false)
            onDelete()
        } if (value === 'verify') {
            onDelete()
            setShowModal(false)
        }

    }
    async function makeDeleteRequest(id) {
        try {
            const token = localStorage.getItem('access_token'); // Replace with your actual bearer token
            const url = `${process.env.REACT_APP_URL}/v1/verifySeller/deleteData?page=1&limit=500`;

            const payload = {
                // Add your desired request body here
                id: id
            };

            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            };

            const response = await fetch(url, requestOptions);

            if (response.ok) {
                const responseData = await response.json();
                onDelete();
                console.log('Delete request successful:', responseData);
            } else {
                throw new Error('Delete request failed');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }



    const handleDelete = () => {
        makeDeleteRequest(_id);
    }
    return (
        <tr class="border-b border-solid border-gray-200 hover:bg-gray-50  text-[#222222]">
            <td
                scope="row"
                class="whitespace-nowrap px-4 py-2 text-[10px] font-medium text-gray-900"
            >
                <div className='flex gap-x-2 items-center'>
                    <img src={productImages[0]?.main_img} className='w-7 h-7 object-contain' />
                    <p>{productInfo?.item_name}</p>
                </div>
            </td>
            <td class="px-4 py-2 text-[10px]">{productInfo?.sellerName}</td>
            <td class="px-4 py-2 text-[10px]">
                {userName}
            </td>
            <td class="px-4 py-2 text-[10px]">
                <Rating rating={rating} /></td>
            <td class="px-4 py-2 text-[10px]">
                <Description description={description} />
            </td>
            <td
                scope="row"
                class="whitespace-nowrap px-4 py-2 text-[10px] font-medium text-gray-900"
            >
                <div className={`flex justify-center items-center rounded-full py-1 px-2 text-[10px] text-white ${isActive ? 'bg-green-500' : 'bg-red-500'}`}>

                    {`${isActive ? 'Approved' : 'Declined'}`}

                </div>
            </td>
            <td class="px-4 py-2 text-[10px]">
                <div class="flex justify-around">
                    <div
                        onClick={() => setShowModal(true)}
                        class="flex items-center cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <div
                        onClick={() => handleDelete()}
                        class="flex items-center cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-4 w-4"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                        </svg>
                    </div>
                    {
                        showModal &&
                        <ReviewModal
                            onCLose={handleClose}
                            isVisible={showModal}
                            id={_id}
                            rating={rating}
                            isActive={isActive}
                            title={title}
                            description={description}
                        />
                    }
                </div>
            </td>
        </tr >
    )
}

export default TableRow