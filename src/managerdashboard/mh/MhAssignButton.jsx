import React, { useState } from 'react'
import toast from 'react-hot-toast'
import AssignSellerModal from './MhAssignSellerModal'

const MhAssignButton = ({ mmId, count, onClick }) => {
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
                Assign MM
            </button>
            {
                isOpen ?
                    <AssignSellerModal
                        isOpen={isOpen}
                        mmId={mmId}
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

export default MhAssignButton