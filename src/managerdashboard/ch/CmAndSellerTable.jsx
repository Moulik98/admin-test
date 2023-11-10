import React, { useState, useEffect, useCallback } from 'react';
import getList from '../getList';
import { format } from 'date-fns';
import { getToken } from '../../hook/getToken';
import EyeButton from './EyeButton';
import MergeButton from './MergeButton';


const CmAndSellerTable = () => {
    const [list, setList] = useState([]);
    useEffect(() => {
        const url = `${process.env.REACT_APP_URL}/v1/category-head/onboarded-seller-cm`;
        const token = getToken();
        getList(url, token).then((data) => {
            setList(data.onboardedSellers)
        })

    }, [])

    // const handleClick = useCallback((id) => {
    //     console.log('hii there');
    // }, [])
    return (
        <div className="relative  overflow-hidden">
            <h4 className='text-left text-xl text-[#383E50] font-medium py-2'>List of CM and Seller</h4>
            <table className="w-full text-left text-xs">
                <thead className="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
                    <tr>
                        <th scope="col" className="px-6 py-2">
                            Assign / Creation Date
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Category Manager
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Cm user Name
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Seller Name
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Seller Store Name
                        </th>
                        <th scope="col" className="px-6 py-2">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(list) &&
                        list?.map((item) => {
                            const { _id, createdAt, seller_info, cm_info, } = item;

                            const date = format(new Date(createdAt), 'dd/MM/yyyy');
                            return (
                                <tr key={_id}>
                                    <td className="px-6 py-2">{date}</td>
                                    <td className="px-6 py-2">{cm_info.name}</td>
                                    <td className="px-6 py-2">{cm_info.userName}</td>
                                    <td className="px-6 py-2">{seller_info.fullname}</td>
                                    <td className="px-6 py-2">{seller_info.store_name}</td>
                                    <td className="px-6 py-2">
                                        <div className='flex '>
                                            {/* <EyeButton
                                                onClick={handleClick}
                                            /> */}
                                            <MergeButton
                                                cmId={cm_info._id}
                                                sellerId={seller_info._id}
                                                cmName={cm_info.name}
                                                sellerName={seller_info.fullname}
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