import React, { useState } from 'react'
import EditModal from './EditModal'
import EditButton from './EditButton'
const Accordian = ({ heading, title }) => {
    const [isClicked, setIsClicked] = useState(false)
    const [isEditClicked, setIsEditClicked] = useState(false)
    return (
        <div className='flex flex-col border'>
            <div className={`p-3  flex flex-row  justify-between ${isClicked ? 'bg-[rgba(0,87,255,0.12)]' : 'bg-white'}`}>
                <div className='flex flex-row  gap-x-5 items-center'>
                    <p className='text-sm text-[#0F1114]'>{heading}</p>
                    <EditButton
                        onClick={setIsEditClicked}
                    />
                </div>
                <div
                    onClick={() => setIsClicked((preValue) => !preValue)}
                    className=''>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-5 h-5 ${isClicked ? 'rotate-180' : 'rotate-0'}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>

            <div className={`p-3  ${isClicked ? 'block transition-all' : 'hidden transition-all'}`}>
                <p className='text-left text-sm text-[#878A99]'>{title}</p>
            </div>
            {
                isEditClicked ?
                    <EditModal
                        modalName={`Edit Faq Title & Body`}
                        onClose={setIsEditClicked}
                    />
                    : null
            }
        </div>
    )
}

export default Accordian