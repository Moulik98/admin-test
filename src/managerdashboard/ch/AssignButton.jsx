import React, { useState } from 'react'
import toast from 'react-hot-toast'
import AssignSellerModal from './AssignSellerModal'

const AssignButton = ({ cmId, count, onClick }) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleClick = () => {
        setIsOpen(true)
        onClick()
    }
    return (
        <>
            <button
                onClick={() => handleClick()}
                type='button' className='py-2 px-4 rounded bg-blue-500 border text-white'>
                Assign Seller
            </button>
            {
                isOpen ?
                    <AssignSellerModal
                        isOpen={isOpen}
                        cmId={cmId}
                        onClose={() => {
                            setIsOpen(false)
                            onClick()
                        }}
                    />
                    : null
            }
        </>
    )
}

export default AssignButton