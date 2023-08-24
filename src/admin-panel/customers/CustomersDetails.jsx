import React from 'react'
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { User } from '../user/User';
import UserDetailsCard from './UserDetailsCard';
import revenue from '../../assets/Revenue.png'
import { useEffect } from 'react';
import { getToken } from '../../hook/getToken';
import { useState } from 'react';
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

    return (
        <main>
            <section>
                <div className='max-w-6xl mx-auto flex justify-between py-5'>
                    <Link to='/customers' className='text-2xl text-gray-900 font-semibold'>Customers</Link>
                    <User />
                </div>
            </section>

            <section>
                <div className='flex '>
                    <UserDetailsCard
                        name={data?.name}
                        email={data?.email}
                        lastSession={data?.formatted_last_login_date}
                        location={data?.custom_address}
                        registrationDate={data?.formatted_register_date}
                        latestOrder={data?.Latest_orders_date}
                    />
                    <img src={revenue} />
                </div>
            </section>
        </main>
    )
}

export default CustomersDetails