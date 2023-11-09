import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getToken } from '../../hook/getToken'
import getList from '../getList'
import AssociateSellerTable from './AssociateSellerTable'
import SideBar from '../Sidebar'
import { categoryMenu } from '../../constant'
import NavigateBack from '../NavigateBack'
const AssociateSellerWithCm = () => {
    const { id } = useParams()
    const [list, setList] = useState([])
    const [cmName, setCmName] = useState('')

    useEffect(() => {
        const url = `${process.env.REACT_APP_URL}/v1/category-head/single-cm/${id}`
        const token = getToken()
        getList(url, token).then(data => {
            setList(data?.cmSellerCounts[0]?.sellers)
            setCmName(data?.cmSellerCounts[0]?.cmName)
        })
    }, [id])
    return (
        <main className='w-full flex flex-row gap-x-5'>
            <div className='sidebar bg-[#00388c] h-screen w-fit sticky top-0'>
                <SideBar
                    menu={categoryMenu}
                />
            </div>
            <div className='flex-1 mr-5'>

                <section className='flex flex-row justify-between py-5 items-center'>
                    <div className='flex space-x-2 items-center'>
                        <NavigateBack />
                        <h1 className=' text-2xl text-[#383E50] font-semibold leading-10 text-left'>Cm {cmName} associated with following seller</h1>

                    </div>
                    {/* <div className='flex flex-row gap-5'>
                        <input type='search' placeholder='Search' className='w-60 border border-solid border-[#EEE] rounded-xl p-2' />

                    </div> */}
                </section>
                <section className='flex flex-col'>
                    <AssociateSellerTable
                        cmId={id}
                        list={list}
                        cmName={cmName}
                    />
                </section>
            </div>
        </main>
    )
}

export default AssociateSellerWithCm