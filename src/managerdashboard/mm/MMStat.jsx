import React, { useState, useEffect } from 'react';
import { getToken } from '../../hook/getToken';
import  getList  from '../getList'; // Assuming you have an API function to fetch total stats

const MMStats = () => {
    const [totalStats, setTotalStats] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const url = `${process.env.REACT_APP_URL}/v1/mm/mm_dashboard`;
        const token = getToken();

        getList(url, token) // Assuming you have an API function to fetch total stats
            .then(data => {
                setTotalStats(data);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className="flex justify-center"><img className="h-16 w-16" src="../../assets/admin-panel/loading.gif" alt="" /></div>;
    }

    return (
        <section className='grid grid-cols-4 gap-5 my-10'>
            <div className=' ring-1 bg-white rounded-xl shadow-md  hover:shadow-2xl p-5 cursor-pointer'>
                <p className='text-base text-gray-500'>Total Brands</p>
                <p className='text-3xl font-semibold'>{totalStats?.totalBrandCount}</p>
            </div>
            <div className=' ring-1 bg-white rounded-xl shadow-md  hover:shadow-2xl p-5 cursor-pointer'>
                <p className='text-base text-gray-500'>Total Products</p>
                <p className='text-3xl font-semibold'>{totalStats?.totalProductCount}</p>
            </div>
        </section>
    );
};

export default MMStats;
