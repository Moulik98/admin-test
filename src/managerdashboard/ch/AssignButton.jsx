import React, { useState } from 'react'
import toast from 'react-hot-toast'
import AssignSellerModal from './AssignSellerModal'

const AssignButton = ({ cmId, count, isOpen, setIsOpen }) => {

    const handleClick = () => {
        if (count < 5) {
            setIsOpen(true)
        } else (
            toast.error('Can not assign more than 5 seller')
        )
    }
    return (
        <>
            <button
                onClick={() => handleClick()}
                type='button' className='py-2 px-4 rounded bg-blue-500 border text-white'>
                Assign Seller
            </button>
            {
                isOpen &&
                <AssignSellerModal
                    isOpen={isOpen}
                    cmId={cmId}
                    onClose={() => setIsOpen(false)}
                />

            }
        </>
    )
}

export default AssignButton