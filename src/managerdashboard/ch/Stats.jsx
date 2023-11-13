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
            name: 'TOTAL CMs',
            count: 14
        },
        {
            id: '483fe8uher',
            name: 'TOTAL SELLERS',
            count: 23
        },
        {
            id: '483fe8uher',
            name: 'LIVE BRANDS',
            count: 24
        },
        {
            id: '483feq28uher',
            name: 'PENDING BRANDS',
            count: 65
        },
        {
            id: '483fe8uher',
            name: 'LIVE PRODUCTS',
            count: 75
        },
        {
            id: '483fq44e8uher',
            name: 'DRAFT PRODUCTS',
            count: 12
        },
        {
            id: '483fq44e8u34her',
            name: 'PENDING PRODUCTS',
            count: 140
        },
        {
            id: '483fe8uher',
            name: 'LIVE A+CONTENT',
            count: 15
        },
        {
            id: '4836r3fe8uher',
            name: 'PENDING A+CONTENT',
            count: 17
        },
        {
            id: '483fe8uher',
            name: 'Total SKU',
            count: 21
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