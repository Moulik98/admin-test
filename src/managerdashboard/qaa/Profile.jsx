import React, { useState } from 'react'
import { useEffect } from 'react';
import SideBar from '../Sidebar'
import Loader from '../Loader';
import toast from 'react-hot-toast';
import {qa } from '../../constant';

const inputFields = [
    {
        id: 'YUJDdfdruefndiyijhcihufb',
        label: 'Full Name',
        isDisabled: false,
        name: 'name',
    }, {
        id: 'dfdruef450ndiyijhcihufb',
        label: 'Phone Number',
        isDisabled: false,
        name: 'phone',
    },
    {
        id: 'fdruefndiy8457ijhcihufb',
        label: 'Email Address',
        isDisabled: false,
        name: 'email',
    },
    {
        id: 'fdruefndiy645ijhcihufb',
        label: 'UserName',
        isDisabled: true,
        name: 'userName',
    }
]

const Profile = () => {
    const [cminfo, setCMInfo] = useState();
    const [isMutating, setIsMutating] = useState(false)
    const token = localStorage.getItem("access_token")

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        userName: ''
    })


    const CategotyManager = async() => {
        const url = process.env.REACT_APP_URL + '/v1/category-manager/me'
        const response = await fetch(url,{
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }
        })
        const data = await response.json();
        if(response.ok){
            setCMInfo(data.sellerDetails)
            setFormData({
                name: data.sellerDetails.name,
                phone: data.sellerDetails.phone,
                email: data.sellerDetails.email,
                userName: data.sellerDetails.userName
            })
        }else{
            console.error("Failed to fetch Data")
        }
    }
    useEffect(() => {
        CategotyManager()
    },[])


    console.log("Category manger Info",cminfo)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((preValue) => {
            return { ...preValue, [name]: value }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const url = process.env.REACT_APP_URL + '/v1/category-manager/editStaffProfile'
        try{
        const response = await fetch (url,{
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            body: JSON.stringify(formData),
        })
        const data = await response.json()
        if (response.ok) {
            setIsMutating(false)
            toast.success(data.message)
        } else {
            setIsMutating(false)
        }
       
        console.log('stote details response', data);
    } catch (error) {
        console.error("Error submitting form:", error);
        setIsMutating(false)
    }    
    }


  return (
    <main className='max-w-full flex'>
       <div className="sidebar bg-[#00388c] h-screen w-fit sticky top-0">
    <SideBar menu={qa} />
    </div>
    <form className='grow p-8' onSubmit={(e) => handleSubmit(e)}>
        <h1 className='text-xl text-left font-bold'>Category Manager Profile</h1>
    <div className='grid grid-cols-2 gap-5 mt-8'>
        {
            inputFields.map((field, index) => (
                <div key={field.id + index} className='flex flex-col'>
                    <label className='text-sm text-gray-900 py-2'>{field.label}</label>
                    <input
                        type='text' className='w-full py-2 px-4 rounded border border-solid border-gray-200 text-sm'
                        name={field.name}
                        disabled={field.isDisabled}
                        value={`${formData[field.name]}`}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
            ))
        }
    </div>
    <div className='flex justify-end gap-x-5 mt-5'>
        <button
            type='submit'
            className='py-2 px-6 rounded bg-blue-500  text-white'>
            {isMutating ? <Loader /> : 'Update'}
        </button>

    </div>
</form>
</main>
  )
}

export default Profile