import React, { useState, useEffect } from 'react'
import { getToken } from '../../hook/getToken'
import TextEditor from './TextEditor'
const RefundModal = ({ modalName, onClose, id, sectionId, apiUrl }) => {
    const [formData, setFormData] = useState()
    const getData = async (url) => {
        const res = await fetch(url)
        const data = await res.json()
        return data
    }
 
     const handleChange = async (name, value) => {
        setFormData((preValue) => {
            return { ...preValue, [name]: value }
        })
    }
    const handleSubmit = async () => {
        const url = `${process.env.REACT_APP_URL}${apiUrl}/${id}`
        console.log('url', url);
        const token = getToken()
        const body = sectionId ? {
            _id: sectionId,
            heading: formData.heading,
            about: formData.about
        } :
            {
                heading: formData.heading,
                  about: formData.about
            }
            console.log(body)
        const requestOptions = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        };
        try {
            const res = await fetch(url, requestOptions)
            const data = await res.json()
            console.log('edit-response', data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (id && sectionId) {
            const url = `${process.env.REACT_APP_URL}/v1/cms/edit-refund/${id}`
            console.log('sub section url', url);
            getData(url).then(data => {
                console.log(' sub-section-data', data);
                setFormData({
                    heading: data.heading,
                    about: data.about
                })
            }).catch(err => console.log(err))
        }
        else {
            const url = `${process.env.REACT_APP_URL}/v1/cms/refund-cancellation/${id}`
            console.log('section url', url);
            getData(url).then(data => {
                console.log(' section-data', data)
                setFormData({
                    heading: data.heading,
                    about: data.about
                })
            }).catch(err => console.log(err))
        }
    }, [])
    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
            <div className='w-3/5 h-[30rem] bg-white rounded-xl overflow-scroll no-scrollbar'>
                <div className='sticky top-0 z-50 flex justify-between items-center py-2 pr-5 pl-2 border-b border-[#DEE2E6] bg-gray-50'>
                    <h1 className='text-lg text-[#143250] font-normal uppercase'>{modalName}</h1>
                    <button
                        onClick={() => onClose(false)}
                        className='text-xl text-gray-900 opacity-50'>X</button>
                </div>
                <div className='py-5 px-10  '>
                    <div className='py-5 flex flex-row justify-center items-center gap-x-5'>
                        <label className='text-sm text-[#0D3359] font-semibold'>Title *</label>
                        <input
                            type='text'
                            name='heading'
                            value={formData?.heading}
                            onChange={(e) => {
                                const { name, value } = e.target
                                handleChange(name, value)
                            }}
                            className='flex-1 py-2 px-6 rounded border border-[#8D8D8D]'
                            placeholder='Enter Title'
                        />
                    </div>
                    {/* Text Editor */}
                    <div>
                        {
                            formData?.about ?
                                <TextEditor
                                    onChange={handleChange}
                                    htmlContent={formData?.about}
                                />
                                : null
                        }
                    </div>
                    <div className='flex justify-center space-x-5 mt-10'>
                        <button
                            onClick={() => onClose(false)}
                            type='button'
                            className='py-2 px-12 bg-white text-red-500'>Cancel</button>
                        <button
                            onClick={() => handleSubmit()}
                            type='button'
                            className='py-2 px-12 bg-[#1F224F] text-white'>Publish</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RefundModal