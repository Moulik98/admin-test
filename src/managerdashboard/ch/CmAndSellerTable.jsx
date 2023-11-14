import React, { useState, useEffect, useCallback } from 'react';
import getList from '../getList';
import { getToken } from '../../hook/getToken';
import EyeButton from './EyeButton';
import MergeButton from './MergeButton';
import { useNavigate } from "react-router-dom";

const CmAndSellerTable = () => {
    const navigate = useNavigate()
    // const [list, setList] = useState([]);
    // useEffect(() => {
    //     const url = `${process.env.REACT_APP_URL}/v1/category-head/onboarded-seller-cm`;
    //     const token = getToken();
    //     getList(url, token).then((data) => {
    //         setList(data.onboardedSellers)
    //     })

    // }, [])


    const list = [
        {
            slNo: 1,
            empCode: 'EC001',
            name: 'John Doe',
            contactNo: '123-456-7890',
            mailId: 'john.doe@example.com',
            onboardSellers: 10,
            pendingSellers: 5,
            onboardBrands: 8,
            actions: 'View Details',
        },
        {
            slNo: 2,
            empCode: 'EC002',
            name: 'Jane Smith',
            contactNo: '987-654-3210',
            mailId: 'jane.smith@example.com',
            onboardSellers: 15,
            pendingSellers: 3,
            onboardBrands: 12,
            actions: 'View Details',
        },
        // Add more objects as needed
        {
            slNo: 3,
            empCode: 'EC003',
            name: 'Alice Johnson',
            contactNo: '555-123-4567',
            mailId: 'alice.johnson@example.com',
            onboardSellers: 8,
            pendingSellers: 7,
            onboardBrands: 6,
            actions: 'View Details',
        },
        {
            slNo: 4,
            empCode: 'EC004',
            name: 'Bob Williams',
            contactNo: '111-222-3333',
            mailId: 'bob.williams@example.com',
            onboardSellers: 12,
            pendingSellers: 2,
            onboardBrands: 10,
            actions: 'View Details',
        },
        {
            slNo: 5,
            empCode: 'EC005',
            name: 'Eva Davis',
            contactNo: '999-888-7777',
            mailId: 'eva.davis@example.com',
            onboardSellers: 5,
            pendingSellers: 10,
            onboardBrands: 4,
            actions: 'View Details',
        },
    ];

    const handleClick = useCallback((id) => {
        // const url = `/category-head-dashboard/associate-seller/${id}`
        // navigate(url);
        console.log('id', id);
    }, [])
    return (
        <div className="relative  overflow-hidden">
            <h4 className='text-left text-xl text-[#383E50] font-medium py-2'>List of CM and Seller</h4>
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
                            Name (username)
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
                            const { slNo, empCode, name, contactNo, mailId, onboardSellers, pendingSellers, onboardBrands, actions } = item;

                            return (
                                <tr key={index + empCode}>
                                    <td className="px-4 py-2">{slNo}</td>
                                    <td className="px-4 py-2">{empCode}</td>
                                    <td className="px-4 py-2">{name}</td>
                                    <td className="px-4 py-2">{contactNo}</td>
                                    <td className="px-4 py-2">{mailId}</td>
                                    <td className="px-4 py-2">{onboardSellers}</td>
                                    <td className="px-4 py-2">{pendingSellers}</td>
                                    <td className="px-4 py-2">{onboardBrands}</td>
                                    <td className="px-4 py-2">
                                        <div className='flex '>
                                            {/* <EyeButton
                                                onClick={handleClick}
                                            /> */}
                                            <EyeButton
                                                id={empCode}
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