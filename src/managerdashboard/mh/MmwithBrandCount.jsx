import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from "react-router-dom";

import MhAssignButton from './MhAssignButton';
import getList from '../getList';
import { getToken } from '../../hook/getToken';
import EyeButton from './EyeButton';
const MmwithBrandCount = () => {
    const navigate = useNavigate()
    const [isDataChange, setIsDataChange] = useState(false)
    const [list, setList] = useState([])
    useEffect(() => {
        const url = `${process.env.REACT_APP_URL}/v1/mh/get-mm-list`
        const token = getToken()
        getList(url, token).then((data) => {
            setList(data.marketingManagers)
        })
    }, [isDataChange])

    const handleRefresh = () => {
        setIsDataChange((preValue) => !preValue)
    }
    const handleClick = useCallback((id) => {
        const url = `/marketing-head-dashboard/associate-brands/${id}`
        navigate(url);
    }, [])
    return (
        <div className='w-full flex flex-col'>
            <div className='w-full h-80'>
                <table className="w-full  overflow-y-scroll text-left text-xs">
                    <thead className="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
                        <tr>
                            <th scope="col" className="px-6 py-2">
                                MM Name
                            </th>
                            <th scope="col" className="px-6 py-2">
                                No: Of Brands
                            </th>
                            <th scope="col" className="px-6 py-2">
                                View Details
                            </th>
                            <th scope="col" className="px-6 py-2">
                                Assign
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(list) &&
                            list?.map((item) => {
                                const { _id, name, userName, brand_count} = item;

                                return (
                                    <tr key={_id}>
                                        <td className="px-6 py-2">{name} ({userName})</td>
                                        <td className="px-6 py-2">{brand_count}</td>
                                        <td className="px-6 py-2">
                                            <EyeButton
                                                id={_id}
                                                onClick={handleClick}
                                            />
                                        </td>
                                        <td className="px-6 py-2">
                                            <MhAssignButton
                                                mmId={_id}
                                                // count={onboardCount}
                                                onClick={handleRefresh}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MmwithBrandCount