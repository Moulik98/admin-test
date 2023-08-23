import React, { useState, useEffect } from 'react'
import TableRow from './TableRow'
import { Link } from 'react-router-dom'
import { User } from '../user/User'
import { getToken } from '../../hook/getToken'
const Customers = () => {
    const [customerData, setCustomerData] = useState()
    const [countData, setCountData] = useState({})
    useEffect(() => {
        const url = `${process.env.REACT_APP_URL}/v1/customer/getCustomer?limit=25&page=1`;

        const token = getToken(); // Replace with your actual Bearer token

        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        fetch(url, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log('customer-data', data);
                setCountData({
                    "b2cCount": data.b2cCount,
                    "b2bCount": data.b2bCount,
                    "totalActiveCount": data.totalActiveCount
                })
                setCustomerData(data.allCustomers)
            })
            .catch(err => console.log(err));

    }, [])

    return (
        <main>
            <div className='container mx-auto flex flex-col'>
                <section>
                    <div className='max-w-6xl mx-auto flex justify-between py-5'>
                        <Link to='/customers' className='text-2xl text-gray-900 font-semibold'>Customers</Link>
                        <User />
                    </div>
                </section>
                <section>
                    <div className='max-w-3xl mx-auto flex justify-between py-5'>
                        <div className='flex justify-center items-center gap-x-5'>
                            <div className='w-20 h-20 flex justify-center items-center rounded-full bg-gradient-to-r from-green-100 to-teal-100'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                                    <path d="M16.0302 19.0225C15.8552 19.005 15.6452 19.005 15.4527 19.0225C11.2877 18.8825 7.98022 15.47 7.98022 11.27C7.98022 6.9825 11.4452 3.5 15.7502 3.5C20.0377 3.5 23.5202 6.9825 23.5202 11.27C23.5027 15.47 20.1952 18.8825 16.0302 19.0225Z" stroke="#00AC4F" strokeWidth="2.625" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M28.7172 7C32.1122 7 34.8422 9.7475 34.8422 13.125C34.8422 16.4325 32.2172 19.1275 28.9447 19.25C28.8047 19.2325 28.6472 19.2325 28.4897 19.25" stroke="#00AC4F" strokeWidth="2.625" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7.2805 25.48C3.0455 28.315 3.0455 32.935 7.2805 35.7525C12.093 38.9725 19.9855 38.9725 24.798 35.7525C29.033 32.9175 29.033 28.2975 24.798 25.48C20.003 22.2775 12.1105 22.2775 7.2805 25.48Z" stroke="#00AC4F" strokeWidth="2.625" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M32.0947 35C33.3547 34.7375 34.5447 34.23 35.5247 33.4775C38.2547 31.43 38.2547 28.0525 35.5247 26.005C34.5622 25.27 33.3897 24.78 32.1472 24.5" stroke="#00AC4F" strokeWidth="2.625" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className='flex flex-col'>
                                <p className='text-sm text-gray-500'>B2C Customers</p>
                                <p className='text-3xl text-gray-900 font-bold'>{countData?.b2cCount}</p>

                            </div>
                        </div>
                        <div className='flex justify-center items-center gap-x-5'>
                            <div className='w-20 h-20 flex justify-center items-center rounded-full bg-gradient-to-r from-green-100 to-teal-100'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <path d="M24.0667 31.7501L26.6 34.2835L31.6667 29.2168" stroke="#00AC4F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M20.2671 18.1173C20.1004 18.1007 19.9004 18.1007 19.7171 18.1173C15.7504 17.984 12.6004 14.734 12.6004 10.734C12.5837 6.65065 15.9004 3.33398 19.9837 3.33398C24.0671 3.33398 27.3837 6.65065 27.3837 10.734C27.3837 14.734 24.2171 17.984 20.2671 18.1173Z" stroke="#00AC4F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19.9832 36.3501C16.9498 36.3501 13.9332 35.5835 11.6332 34.0501C7.59982 31.3501 7.59982 26.9501 11.6332 24.2668C16.2165 21.2001 23.7332 21.2001 28.3165 24.2668" stroke="#00AC4F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className='flex flex-col'>
                                <p className='text-sm text-gray-500'>B2B Customers</p>
                                <p className='text-3xl text-gray-900 font-bold'>{countData?.b2bCount}</p>

                            </div>
                        </div>
                        <div className='flex justify-center items-center gap-x-5'>
                            <div className='w-20 h-20 flex justify-center items-center rounded-full bg-gradient-to-r from-green-100 to-teal-100'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                                    <path d="M11.27 3.5H30.7125C36.9425 3.5 38.5 5.0575 38.5 11.27V22.3475C38.5 28.5775 36.9425 30.1175 30.73 30.1175H11.27C5.0575 30.135 3.5 28.5775 3.5 22.365V11.27C3.5 5.0575 5.0575 3.5 11.27 3.5Z" stroke="#00AC4F" strokeWidth="2.625" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M21 30.1348V38.4998" stroke="#00AC4F" strokeWidth="2.625" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3.5 22.75H38.5" stroke="#00AC4F" strokeWidth="2.625" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13.125 38.5H28.875" stroke="#00AC4F" strokeWidth="2.625" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className='flex flex-col'>
                                <p className='text-sm text-gray-500'>Active Customer</p>
                                <p className='text-3xl text-gray-900 font-bold'>{countData?.totalActiveCount}</p>

                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className='max-w-6xl mx-auto flex flex-col'>
                        <div className='flex justify-between px-10 py-5'>
                            <div>
                                <p className='text-2xl font-bold'>All Active Customers</p>
                            </div>
                            <div className='flex gap-5'>
                                <form className="flex items-center">
                                    <div className="flex items-center px-2 py-1 gap-x-1 bg-gray-100 rounded-2xl ">
                                        <div className="p-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-4 h-4 text-gray-600 font-bold"
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
                                <select className='flex items-center px-2 py-1 gap-x-1 bg-gray-100 rounded-2xl'>
                                    <option>Newest</option>
                                    <option>Oldest</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex justify-end'>

                        </div>
                    </div>
                </section>
                <section>
                    <div className="max-w-6xl relative overflow-x-scroll">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-white text-xs font-normal  text-gray-400">
                                <tr>
                                    <th scope="col" className="px-2 py-3 whitespace-nowrap "></th>
                                    <th scope="col" className="px-2 py-3 whitespace-nowrap ">Customer Name</th>
                                    <th scope="col" className="px-2 py-3 whitespace-nowrap ">Type</th>
                                    <th scope="col" className="px-2 py-3 whitespace-nowrap ">Phone Number</th>
                                    <th scope="col" className="px-2 py-3 whitespace-nowrap ">Email</th>
                                    <th scope="col" className="px-2 py-3 whitespace-nowrap ">Country</th>
                                    <th scope="col" className="px-2 py-3 whitespace-nowrap ">Orders</th>
                                    <th scope="col" className="px-2 py-3 whitespace-nowrap ">Total Spend</th>
                                    <th scope="col" className="px-2 py-3 whitespace-nowrap ">
                                        AOV
                                    </th>
                                    <th scope="col" className="px-2 py-3 whitespace-nowrap ">Last Active</th>
                                    <th scope="col" className="px-2 py-3 whitespace-nowrap ">Date Registered</th>
                                    <th scope="col" className="px-2 py-3 whitespace-nowrap ">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customerData?.length ?
                                        customerData.map((item, index) => (
                                            <TableRow
                                                key={item._id + index}
                                                data={item}
                                                index={index}
                                                length={customerData.length}
                                            />
                                        ))
                                        : null
                                }
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>
        </main>
    )
}

export default Customers