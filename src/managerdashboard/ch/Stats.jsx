import React, { useState, useEffect } from 'react'
import getList from '../getList';
import { getToken } from '../../hook/getToken';
const Stats = () => {
    const [statData, setStatData] = useState(null);
    // useEffect(() => {
    //     const url = `${process.env.REACT_APP_URL}/v1/admin/get-product-order-count`;
    //     const token = getToken();
    //     getList(url, token)
    //         .then(data => {
    //             setStatData(data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }, [])

    const dummyData = [
        {
            id: '483fe8uher',
            name: 'Total CM',
            count: 100
        },
        {
            id: '483fe8uher',
            name: 'Total Seller',
            count: 244
        },
        {
            id: '483fe8uher',
            name: 'Total Brands',
            count: 100
        },
        {
            id: '483fe8uher',
            name: 'Total Products',
            count: 100
        },
        {
            id: '483fe8uher',
            name: 'Total A+ Content',
            count: 100
        },
        {
            id: '483fe8uher',
            name: 'Total SKU',
            count: 2000
        },
        {
            id: '483fe8uher',
            name: 'Total B2C Customer',
            count: 244
        },
        {
            id: '483fe8uher',
            name: 'Total B2B Customer',
            count: 50
        },
        {
            id: '483fe8uher',
            name: 'Total Orders',
            count: 1000
        },
        {
            id: '483fe8uher',
            name: 'Total Cancelled Orders',
            count: 103
        }
    ]
    return (
        <section className='grid grid-cols-5 gap-5 my-10'>
            {
                dummyData.map((item, index) => (
                    <div key={item.id} className=' ring-1 bg-white rounded-xl shadow-md  hover:shadow-2xl p-5 cursor-pointer'>
                        <p className='text-base text-gray-500'>{item.name}</p>
                        <p className='text-3xl font-semibold'>{item.count}</p>
                    </div>
                ))
            }
        </section>
    )
}

export default Stats