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
        const url = `${process.env.REACT_APP_URL}/v1/category-head/cm-seller-count`;
        const token = getToken();
        getList(url, token).then((data) => {
            setList(data.cmSellerCounts)
        })

    }, [])


    const handleClick = useCallback((id) => {
        const url = `/category-head-dashboard/associate-seller/${id}`
        navigate(url);
        console.log('id', id);
    }, [])
    return (
        <div className="relative  overflow-hidden">
            <h4 className='text-left text-xl text-[#383E50] font-medium py-2'>List of CMs</h4>
            <table className="w-full text-left text-xs">
                <thead className="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
                    <tr>
                        <th scope="col" className="px-4 py-2">
                            Sl. NO
                        </th>
                        <th scope="col" className="px-4 py-2">
                            EmpCode
                        </th>

                        <th scope="col" className="px-4 py-2">
                            CM (username)
                        </th>

                        <th scope="col" className="px-4 py-2">
                            Contact No
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Mail Id
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Onboad Sellers
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Pending Sellers
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Onboard Brands
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Actions (View Details)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(list) &&
                        list?.map((item, index) => {
                            const { _id, emp_id, name, email, userName, phone, onboardCount, pendingSeller, brandCount } = item;

                            return (
                                <tr key={_id}>
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{emp_id}</td>
                                    <td className="px-4 py-2">{name} ({userName})</td>
                                    <td className="px-4 py-2">{phone}</td>
                                    <td className="px-4 py-2">{email}</td>
                                    <td className="px-4 py-2">{onboardCount}</td>
                                    <td className="px-4 py-2">{pendingSeller}</td>
                                    <td className="px-4 py-2">{brandCount}</td>
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