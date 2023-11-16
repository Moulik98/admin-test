import React, { useState, useEffect } from 'react'
import getList from '../getList';
import { getToken } from '../../hook/getToken';
import { set } from 'date-fns';
const Stats = () => {
    const [statData, setStatData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        const url = `${process.env.REACT_APP_URL}/v1/category-head/stats`;
        const token = getToken();
        getList(url, token)
            .then(data => {
                setStatData(data.stats);
            })
            .catch(err => {
                console.log(err);
            }).finally(() => {
                setIsLoading(false);
            })
    }, [])


    if (isLoading) {
        return <div className="flex justify-center"><img className="h-16 w-16" src="../../assets/admin-panel/loading.gif" alt="" /></div>;
    }
    return (
        <section className='grid grid-cols-5 gap-5 my-10'>
            {
                statData?.map((item, index) => (
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