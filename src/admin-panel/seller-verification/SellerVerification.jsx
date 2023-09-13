import React, { useEffect, useState } from 'react'
import TableRow from './TableRow';
import { Link } from 'react-router-dom';
import { User } from '../user/User';
const SellerVerification = () => {

    const [verificationList, SetVerificationList] = useState([])
    async function fetchSellerVerificationList() {
        try {
            const token = localStorage.getItem('access_token'); // Replace with your actual bearer token
            const url = `${process.env.REACT_APP_URL}/v1/verifySeller/getData`;
            
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
    
            const data = await response.json();
            console.log(data);
            SetVerificationList(data);
            
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchSellerVerificationList()
    }, [])
    const handleRefresh = () => {
        fetchSellerVerificationList()
    }
    return (
        <main>
            <div className='pr-7'>
                <section>
                    <div className='max-w-6xl mx-auto flex justify-between py-5'>
                        <Link to='/' className='text-3xl text-gray-900 font-semibold'>Seller Verification</Link>
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
                </section>
                {/* // Table Section */}
                <section>
                    <div className='flex flex-col mt-10 
                    shadow-[0px_0px_16.9227px_rgba(0,0,0,0.1)] rounded-lg'>
                        <div className='p-5 border-b border-solid border-gray-300'>
                            <h2 className='text-base font-semibold text-[#143250]'>Allow Verification To Add Product :
                            </h2>
                        </div>
                        <div class="relative overflow-x-auto p-5">
                            <table class="w-full text-left text-xs">
                                <thead class=" text-xs  uppercase text-gray-900 font-semibold border-b border-solid border-gray-200 ">
                                    <tr>
                                        <th scope="col" class=" px-4 py-3">Vendor Name</th>
                                        <th scope="col" class=" 
                                        px-4 py-3">Vendor Email</th>
                                        <th scope="col" class=" px-4 py-3">Store Name</th>
                                        <th scope="col" class="text-center px-4 py-3 ">Status</th>
                                        <th scope="col" class="text-center px-4
                                        mx-auto py-3">
                                            Options
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        verificationList.map((item, index) => (
                                            <TableRow
                                                key={index}
                                                data={item}
                                                onDelete={handleRefresh}
                                        
                                            />
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </section>
            </div>
        </main>
    )
}

export default SellerVerification