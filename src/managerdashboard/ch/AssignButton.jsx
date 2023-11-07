import React, { useState } from 'react'
import toast from 'react-hot-toast'
import AssignSellerModal from './AssignSellerModal'

const AssignButton = ({ cmId, count, isOpen, setIsOpen }) => {

    const handleClick = () => {
        setIsOpen(true)
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