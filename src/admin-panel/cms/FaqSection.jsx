import React from 'react'
import { User } from '../user/User'
import { useState } from 'react'
import EditModal from './EditModal'
const FaqSection = () => {
    const [isClicked, setIsClicked] = useState(false)
    return (
        <main>
            <div className='p-5'>
                <section>
                    <div className='max-w-6xl mx-auto flex justify-between py-5'>
                        <p className='text-2xl text-gray-900 font-semibold'>Frequently Asked Questions</p>
                        <div className='flex gap-x-10'>
                            <form className="flex items-center">
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
                {/* General Questions */}
                <section className='p-5 flex flex-row gap-x-1 border border-[#E8E8E8] rounded'>
                    <div className='p-1 shrink-0 w-[24rem] flex flex-col space-y-4 '>
                        <div className='flex flex-row justify-between'>
                            <p className='text-base text-gray-900 font-semibold'>General Questions</p>
                            <p
                                onClick={() => setIsClicked(true)}
                                className='text-base text-gray-900 font-semibold flex gap-x-2 justify-center items-center cursor-pointer'>Edit
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 font-semibold">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>

                                </span>
                            </p>
                        </div>
                        <div>
                            <p className='text-sm text-[#878A99] font-normal text-left'>General knowledge is information that has been accumulated over time through various mediums and sources. It excludes specialized learning that can only be obtained with extensive training and information confined to a single medium.</p>
                        </div>
                    </div>
                    <div className='p-1 flex-1'>

                    </div>
                </section>
                {
                    isClicked ?
                        <EditModal
                            modalName={`Edit Faq Title & Body`}
                            onClose={setIsClicked}
                        />
                        : null
                }
            </div>
        </main>

    )
}

export default FaqSection