import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import Select from 'react-select';
import { getToken } from '../../hook/getToken'
import getList from '../getList'
import { is } from 'date-fns/locale';
const CancelReasonModal = ({ isOpen, onClose, id }) => {

    const [data, setData] = useState()

    useEffect(() => {
        const url = `${process.env.REACT_APP_URL}/v1/category-manager/declined-reasons/${id}`
        const token = getToken()
        getList(url, token).then((data) => {
            setData({
                reasons: data.reasons,
                content: data.emailContent
            })
        })
    }, [id, isOpen])

    const handleClick = (e) => {
        const { id } = e.target
        if (id === 'container') {
            onClose()
        }
    }
    if (!isOpen) return null;
    return (
        <div
            onClick={(e) => handleClick(e)}
            id='container'
            className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center'>
            <div className='w-2/5 bg-white  p-10 rounded'>
                <h4 className='text-left text-xl text-[#383E50] font-medium py-2'>Reason for Declining</h4>
                <ul className='list-disc'>
                    {
                        data?.reasons?.map((item, index) => {
                            return (
                                <li className='p-2 text-base' key={index}>{item}</li>
                            )
                        })
                    }
                </ul>
                <h4 className='text-left text-xl text-[#383E50] font-medium py-2'>Note</h4>
                <p className='text-base'>{data?.content}</p>
            </div>
        </div>
    )
}

export default CancelReasonModal