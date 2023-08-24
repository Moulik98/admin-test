import React from 'react'

const UserDetailsCard = ({ name, email, lastSession, location, registrationDate, latestOrder }) => {
    return (
        <div className='basis-80 shrink-0 flex flex-col gap-5 rounded-xl shadow-xl p-5'>
            <div className='flex flex-col justify-center items-center border-b border-solid border-gray-300 pb-5'>
                <div className='w-24 h-24 rounded-full overflow-hidden'>
                    <img src={`https://res.cloudinary.com/genx21/image/upload/v1687601345/products/oh6qbida5fkmexaqondm.jpg`} />
                </div>
                <p className='text-sm text-[#1C2A53] text-start font-bold' >{name}</p>
                <p className='text-sm text-gray-400 font-normal' >{email}</p>

            </div>
            <div className='flex flex-col gap-5'>
                <div className='flex gap-5'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M14.6666 12.6667C14.6666 13.0203 14.5261 13.3594 14.2761 13.6095C14.026 13.8595 13.6869 14 13.3333 14H2.66659C2.31296 14 1.97382 13.8595 1.72378 13.6095C1.47373 13.3594 1.33325 13.0203 1.33325 12.6667V3.33333C1.33325 2.97971 1.47373 2.64057 1.72378 2.39052C1.97382 2.14048 2.31296 2 2.66659 2H5.99992L7.33325 4H13.3333C13.6869 4 14.026 4.14048 14.2761 4.39052C14.5261 4.64057 14.6666 4.97971 14.6666 5.33333V12.6667Z" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <p className='text-sm text-[#1C2A53] text-start font-bold' >Last Active Session</p>
                        <p className='text-sm text-gray-400 font-normal' >{lastSession}</p>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M14 6.72727C14 11.1818 8 15 8 15C8 15 2 11.1818 2 6.72727C2 5.20831 2.63214 3.75155 3.75736 2.67748C4.88258 1.60341 6.4087 1 8 1C9.5913 1 11.1174 1.60341 12.2426 2.67748C13.3679 3.75155 14 5.20831 14 6.72727Z" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 8.66602C9.10457 8.66602 10 7.77059 10 6.66602C10 5.56145 9.10457 4.66602 8 4.66602C6.89543 4.66602 6 5.56145 6 6.66602C6 7.77059 6.89543 8.66602 8 8.66602Z" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <p className='text-sm text-[#1C2A53] text-start font-bold' >Location</p>
                        <p className='text-sm text-gray-400 font-normal' >{location}</p>
                    </div>
                </div>

                <div className='flex gap-5'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M12.6667 2.66602H3.33333C2.59695 2.66602 2 3.26297 2 3.99935V13.3327C2 14.0691 2.59695 14.666 3.33333 14.666H12.6667C13.403 14.666 14 14.0691 14 13.3327V3.99935C14 3.26297 13.403 2.66602 12.6667 2.66602Z" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.6667 1.33398V4.00065" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5.33325 1.33398V4.00065" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 6.66602H14" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <p className='text-sm text-[#1C2A53] text-start font-bold' >Registered Date</p>
                        <p className='text-sm text-gray-400 font-normal' >{registrationDate}</p>
                    </div>
                </div>

                <div className='flex gap-5'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M12.6667 2.66602H3.33333C2.59695 2.66602 2 3.26297 2 3.99935V13.3327C2 14.0691 2.59695 14.666 3.33333 14.666H12.6667C13.403 14.666 14 14.0691 14 13.3327V3.99935C14 3.26297 13.403 2.66602 12.6667 2.66602Z" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.6667 1.33398V4.00065" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5.33325 1.33398V4.00065" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 6.66602H14" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <p className='text-sm text-[#1C2A53] text-start font-bold' >Latest Orders</p>
                        <p className='text-sm text-gray-400 font-normal' >{latestOrder}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetailsCard