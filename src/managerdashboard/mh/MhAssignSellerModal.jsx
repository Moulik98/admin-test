import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import Select from 'react-select';
import { getToken } from '../../hook/getToken'
import getList from '../getList'
const MhAssignSellerModal = ({ isOpen, onClose, mmId }) => {

    const [isSaving, setIsSaving] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const [list, setList] = useState([])
    useEffect(() => {
        const url = `${process.env.REACT_APP_URL}/v1/mh/get-ofboard-brands`
        const token = getToken()
        getList(url, token).then((data) => {
            setList(data.brands)
        })
    }, [isOpen, mmId])

    const handleSubmit = async (e) => {
        setIsSaving(true)
        e.preventDefault()
        try {
            const url = `${process.env.REACT_APP_URL}/v1/mh/onboard-brand`
            const token = getToken()
            const body = {
                mm_id: mmId,
                brand_id: selectedOption.value
            }
            console.log('body', body);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body)
            })
            if (response.ok) {
                toast.success('Seller Assigned Successfully')
                onClose()
            }
            const resData = await response.json();
            console.log(resData)
        } catch (err) {
            console.log(err)
        } finally {
            setIsSaving(false)
            onClose()
        }
    }

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
            <div className='w-1/2 bg-white  p-5 rounded-xl'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='flex flex-col'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-2xl text-black'>Assign Brand to Marketing Manager</h1>
                            <button onClick={() => onClose()} className='text-2xl text-black'>X</button>
                        </div>
                        <div className='mt-10'>
                            <Select
                                value={selectedOption}
                                onChange={handleChange}
                                options={list?.map(item => ({
                                    value: item._id,
                                    label: (item?.brand_name ? item.brand_name : '')
                                }))}
                            />
                        </div>

                        <div className='mt-10 flex justify-end'>
                            <button disabled={isSaving} type='submit' className='py-2 px-6 rounded bg-blue-500 text-white'>Assign MM</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default MhAssignSellerModal