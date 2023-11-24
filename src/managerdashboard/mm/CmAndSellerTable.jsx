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
        const url = `${process.env.REACT_APP_URL}/v1/mh/get-mm-list`;
        const token = getToken();
        getList(url, token).then((data) => {
            setList(data.marketing_manager)
        })

    }, [])


    const handleClick = useCallback((id) => {
        const url = `/category-head-dashboard/associate-seller/${id}`
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
                            Seller(Name & Id)
                        </th>
                        <th scope="col" className="px-4 py-2">
                            CM(Name & Id)
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Category Tags
                        </th>
                        
                        <th scope="col" className="px-4 py-2">
                            Utility Tags
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(list) &&
                        list?.map((item, index) => {
                            const { _id, name, email, userName, phone, onboardCount,emp_id } = item;

                            return (
                                <tr key={_id}>
                                    <td className="px-4 py-2">{index+1}</td>
                                    <td className="px-4 py-2">{emp_id}</td>
                                    <td className="px-4 py-2">{name} ({userName})</td>
                                    <td className="px-4 py-2">{phone}</td>
                                    <td className="px-4 py-2">{email}</td>
                                    <td className="px-4 py-2">{onboardCount}</td>
                                    <td className="px-4 py-2">
                                        <div className='flex '>
                                            {/* <EyeButton
                                                onClick={handleClick}
                                            /> */}
                                            <EyeButton
                                                id={_id}
                                                onClick={handleClick}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default CmAndSellerTable;