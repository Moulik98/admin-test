import React from 'react'
import TextEditor from './TextEditor'
import { useState } from 'react'
import { useCallback } from 'react'

const EditModal = ({ modalName, onClose }) => {
    const [formData, setFormData] = useState()
    // Plain text to be converted to an editor
    const plainText = '';
    const handleChange = async (name, value) => {
        setFormData((preValue) => {
            return { ...preValue, [name]: value }
        })
    }
    const handleSubmit = async () => {
        console.log('formData', formData);
    }
    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
            <div className='w-3/5 bg-white rounded-xl '>
                <div className='flex justify-between items-center py-2 pr-5 pl-2 border-b border-[#DEE2E6]'>
                    <h1 className='text-lg text-[#143250] font-normal uppercase'>{modalName}</h1>
                    <button
                        onClick={() => onClose(false)}
                        className='text-3xl text-gray-900 opacity-50'>X</button>
                </div>

                <div className='py-5 px-10 '>
                    <div className='py-5 flex flex-row justify-center items-center gap-x-5'>
                        <label className='text-sm text-[#0D3359] font-semibold'>Title *</label>
                        <input
                            type='text'
                            name='title'
                            value={formData?.title}
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
                        <TextEditor
                            onChange={handleChange}
                            plainText={plainText}
                        />
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

export default EditModal