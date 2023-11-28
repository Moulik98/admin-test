import React, { useState, useEffect, useCallback } from 'react';
import getList from '../getList';
import { getToken } from '../../hook/getToken';
import EyeButton from './EyeButton';
import MergeButton from './MergeButton';
import { useNavigate } from "react-router-dom";

const CmAndSellerTable = () => {
    const navigate = useNavigate()
    const [list, setList] = useState([]);
    useEffect(() => {
        const url = `${process.env.REACT_APP_URL}/v1/mm/mm_dashboard`;
        const token = getToken();
        getList(url, token).then((data) => {
            setList(data.brands)
        })

    }, [])


    const handleClick = useCallback((id) => {
        const url = `/MM-dashboard/associate-brand/${id}`
        navigate(url);
        console.log('id', id);
    }, [])
    return (
        <div className="relative  overflow-hidden">

            <h4 className='text-left text-xl text-[#383E50] font-medium py-2'>List of Brands</h4>
            <table className="w-full text-left text-xs">
                <thead className="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
                    <tr>
                        <th scope="col" className="px-4 py-2">
                            Sl. NO
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Brands
                        </th>

                        <th scope="col" className="px-4 py-2">
                            Products
                        </th>

                        <th scope="col" className="px-4 py-2">
                            CM Name & Id
                        </th>
                        <th scope="col" className="px-4 py-2">
                            CM Contact No
                        </th>
                        <th scope="col" className="px-4 py-2">
                            CM Email
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(list) &&
                        list.map((item, index) => {
                            const { _id, brand_name, product_count, cm_data } = item;

                            return (
                                <tr key={_id}>
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{brand_name}</td>
                                    <td className="px-4 py-2">{product_count}</td>
                                    <td className="px-4 py-2">{`${cm_data?.name} (${cm_data?.userName})`}</td>
                                    <td className="px-4 py-2">{cm_data?.phone}</td>
                                    <td className="px-4 py-2">{cm_data?.email}</td>
                                    <td className="px-4 py-2">
                                        <div className='flex '>
                                            <EyeButton
                                                id={_id}
                                                onClick={() => handleClick(_id)}  // Pass _id to the handleClick function
                                            />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default CmAndSellerTable;