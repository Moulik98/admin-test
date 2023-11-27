import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { getToken } from '../../hook/getToken'
const DeAssingModal = ({ onClose, cmId, sellerId, sellerName, cmName }) => {
    const [isPending, setIsPending] = useState(false)
    const handleDeassign = async () => {
        try {
            setIsPending(true)
            const url = `${process.env.REACT_APP_URL}/v1/category-head/off-board-sellers/${sellerId}`
            const token = getToken()
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.ok) {
                toast.success('Seller Deassigned Successfully')
            }

        } catch (err) {
            console.log(err)
        } finally {
            onClose()
            setIsPending(false)
        }

    }

    const handleClick = (e) => {
        const { id } = e.target
        if (id === 'container') {
            onClose()
        }
    }
    return (
        <div
            onClick={(e) => handleClick(e)}
            id='container'
            className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center'
        >
            <div className='w-2/5 rounded bg-white '>
                <div className={` items-center justify-center  flex flex-col`}>
                    <div className='font-medium text-gray-900  text-base mt-7'>Are you sure you want to deassign the<span className='font-bold'> Brand {sellerName}</span></div>
                    <div className='font-medium text-gray-900  text-base '> from  <span className='font-bold'>MM {cmName}</span> ?</div>
                    <div className='flex gap-x-5 my-7'>
                        <button disabled={isPending}
                            onClick={() => onClose()} className='py-2 px-14 bg-white text-gray-900 rounded-full border border-solid border-gray-900'>No</button>
                        <button
                            disabled={isPending}
                            onClick={() => handleDeassign()} className='py-2 px-14 bg-red-600 text-white rounded-full'>Yes</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DeAssingModal