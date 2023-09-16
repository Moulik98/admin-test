import React, { useState, useEffect } from 'react'
import { User } from '../user/User'
import PrivacyModal from './PrivacyModal'
import EditButton from './EditButton'
const Privacy = () => {
    const [isClicked, setIsClicked] = useState(false)
    const [sectionId, setSectionId] = useState('')
    const [data, setData] = useState()
    const getData = async (url) => {
        const res = await fetch(url)
        const data = await res.json()
        return data
    }
    useEffect(() => {
        const apiUrl = `${process.env.REACT_APP_URL}/v1/cms/privacy-policies`;
        getData(apiUrl).then(data => {
            setData(data)
            console.log('faq-data', data);
        })
    }, [isClicked])
    const handleClick = (id) => {
        setSectionId(id)
        setIsClicked(true)
    }
    console.log('responseData', data);
    return (
        <main>
            <div className='p-5'>
                <section>
                    <div className='max-w-6xl mx-auto flex justify-between py-5'>
                        <p className='text-2xl text-gray-900 font-semibold'>Privacy Policy</p>
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
                <section className='p-5 flex flex-row gap-x-1 border border-[#E8E8E8] rounded mt-2'>
                    <div className='p-1 shrink-0 w-full flex flex-col space-y-4 '>
                        <div className='flex flex-row justify-between'>
                            <p className='text-base text-gray-900 font-semibold'>
                                {data?.length && data[0]?.section}
                            </p>
                            {
                                data?.length &&
                                <EditButton
                                    onClick={handleClick}
                                    id={data[0]?._id}
                                />
                            }
                        </div>
                        <div>
                            <p className='text-sm text-[#878A99] font-normal text-left'>
                                {data?.length && data[0]?.about}
                            </p>
                        </div>
                    </div>
                </section>
                {/* Manage Account */}
                <section className='p-5 flex flex-row gap-x-1 border border-[#E8E8E8] rounded mt-2'>
                    <div className='p-1 shrink-0 w-full flex flex-col space-y-4 '>
                        <div className='flex flex-row justify-between'>
                            <p className='text-base text-gray-900 font-semibold'>
                                {data?.length && data[1]?.heading}
                            </p>
                            {
                                data?.length &&
                                <EditButton
                                    onClick={handleClick}
                                    id={data[1]?._id}
                                />
                            }
                        </div>
                        <div>
                            <p className='text-sm text-[#878A99] font-normal text-left'>
                                {data?.length && data[1]?.about}
                            </p>
                        </div>
                    </div>
                </section>      
                {
                    (isClicked && sectionId) ?
                        <PrivacyModal
                            modalName={`Edit Privacy Title & Body`}
                            onClose={setIsClicked}
                            id={sectionId}
                            apiUrl={`/v1/cms/edit-FAQ-section`}
                        />
                        : null
                }
            </div>
        </main>
    )
}
export default Privacy