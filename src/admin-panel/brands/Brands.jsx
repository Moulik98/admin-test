import React from 'react'
import { User } from '../user/User'

export const Brands = () => {
  return (
    <div><section>
    <div className='max-w-6xl mx-auto flex justify-between py-5'>
        <p className='text-2xl text-gray-900 font-semibold'>Brands Registration</p>
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
            <User/>
        </div>
    </div>
</section></div>
  )
}