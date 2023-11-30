import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getToken } from '../../hook/getToken'
import getList from '../getList'
import AssociateSellerTable from './AssociateMmTable'
import SideBar from '../Sidebar'
import { MarHead } from '../../constant'
import NavigateBack from '../NavigateBack'
const AssociateBrandsWithMm = () => {
    const { id } = useParams()
    const [list, setList] = useState([])
    const [mmName, setMmName] = useState('')

    useEffect(() => {
        const url = `${process.env.REACT_APP_URL}/v1/mh/single-mm-brand/${id}`
        const token = getToken()
        getList(url, token).then(data => {
            console.log('single-mm-brand', data);
            setList(data?.brands)
            setMmName(data?.mm_name)
        })
    }, [id])
    return (
        <main className='w-full flex flex-row gap-x-5 '>
            <div className='sidebar bg-[#00388c] h-screen w-fit sticky top-0'>
                <SideBar
                    menu={MarHead}
                />
            </div>
            <div className='flex-1 overflow-hidden mr-5'>

                <section className='flex flex-row justify-between py-5 items-center'>
                    <div className='flex space-x-2 items-center'>
                        <NavigateBack />
                        <h1 className=' text-2xl text-[#383E50] font-semibold leading-10 text-left'>MM {mmName} associated with following brands</h1>

                    </div>
                    {/* <div className='flex flex-row gap-5'>
                        <input type='search' placeholder='Search' className='w-60 border border-solid border-[#EEE] rounded-xl p-2' />

                    </div> */}
                </section>
                <section className='w-full flex flex-col'>
                    <AssociateSellerTable
                        id={id}
                        list={list}

                    />
                </section>
            </div>
        </main>
    )
}

export default AssociateBrandsWithMm;