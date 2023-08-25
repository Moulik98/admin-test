import React from 'react'
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { User } from '../user/User';
import UserDetailsCard from './UserDetailsCard';
import revenue from '../../assets/Revenue.png'
import { useEffect } from 'react';
import { getToken } from '../../hook/getToken';
import { useState } from 'react';
import OrdersTableRow from '../orders/OrdersTableRow';
const CustomersDetails = () => {
    const { id } = useParams()
    const [data, setData] = useState()
    useEffect(() => {
        const fetchSingleCustomer = async () => {
            const token = getToken()
            try {
                const response = await fetch(`${process.env.REACT_APP_URL}/v1/customer/singleCustomer/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // Add other headers if needed
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    setData(data)
                    console.log('single customer', data);
                } else {
                    console.error('Error fetching data', data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchSingleCustomer();
    }, [id]);
    const handlePrint = () => {
        window.print()
    }

    return (
        <main>
            <section>
                <div className='max-w-6xl mx-auto flex justify-between py-5'>
                    <Link to='/customers' className='text-2xl text-gray-900 font-semibold'>Customers</Link>
                    <User />
                </div>
            </section>
            <section>
                <div className='flex justify-between py-5'>
                    <div>
                        <p className='text-2xl text-[#1C2A53]'>Connie Robertson</p>
                    </div>
                    <div className='flex'>
                        <div
                            onClick={() => handlePrint()}
                            className='p-2 cursor-pointer rounded border border-solid border-[#0072B7]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                <path d="M15.75 8.75H14.875V3.5H6.125V8.75H5.25C4.27875 8.75 3.5 9.5375 3.5 10.5V16.625H17.5V10.5C17.5 9.5375 16.7212 8.75 15.75 8.75ZM7.875 5.25H13.125V8.75H7.875V5.25ZM15.75 14.875H5.25V10.5H15.75V14.875ZM14.875 13.125H11.375V11.375H14.875V13.125Z" fill="#0072B7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* // status section */}
            <section>
                <div className='grid grid-cols-4 gap-5 py-5'>
                    <div className='flex flex-col justify-center items-center h-24 shadow-lg ' >
                        <p className='text-gray-500'>Revenue</p>
                        <p className='text-3xl text-gray-900 font-bold'>{data?.order_status_data[0]?.total_delivered_price}</p>

                    </div>
                    <div className='flex flex-col justify-center items-center h-24 shadow-lg ' >
                        <p className='text-gray-500'>Orders Paid</p>
                        <p className='text-3xl text-gray-900 font-bold'>{data?.order_status_data[0]?.total_delivered_orders}</p>
                    </div>
                    <div className='flex flex-col justify-center items-center h-24 shadow-lg ' >
                        <p className='text-gray-500'>Return</p>
                        <p className='text-3xl text-gray-900 font-bold'> {data?.order_status_data[0]?.total_return_order}</p>

                    </div>
                    <div className='flex flex-col justify-center items-center h-24 shadow-lg ' >
                        <p className='text-gray-500'>Orders</p>
                        <p className='text-3xl text-gray-900 font-bold'>{data?.order_status_data[0]?.total_orders}</p>

                    </div>
                </div>
            </section>
            {/* Graph section */}
            <section>
                <div className='flex '>
                    <UserDetailsCard
                        name={data?.name}
                        email={data?.email}
                        lastSession={data?.formatted_last_login_date}
                        location={data?.custom_address}
                        registrationDate={data?.formatted_register_date}
                        latestOrder={data?.latest_orders_date}
                    />
                    <div className='max-w-xl h-96'>
                        <img src={revenue} className='w-full h-full object-cover' />
                    </div>
                </div>
            </section>
            {/* Order table Section */}
            <section>
                <div class="relative overflow-x-auto mt-5">
                    <table class="w-full text-left text-xs">
                        <thead class="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
                            <tr>
                                <th scope="col" class="px-2 py-3">Order</th>
                                <th scope="col" class="px-2 py-3">Status</th>
                                <th scope="col" class="px-2 py-3">Method</th>
                                <th scope="col" class="px-2 py-3">Payment</th>
                                <th scope="col" class="px-2 py-3">Voucher</th>
                                <th scope="col" class="px-2 py-3">Seller</th>
                                <th scope="col" class="px-2 py-3">Amount</th>
                                <th scope="col" class="px-2 py-3">Order Date</th>
                                <th scope="col" class="px-2 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.isArray(data?.orders) && data.orders.length > 0 ? (
                                    data.orders.map((item) => (
                                        <OrdersTableRow
                                            key={item._id}
                                            data={item}
                                        />
                                    ))
                                ) : (
                                    <p>No orders available.</p>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}

export default CustomersDetails