import React from 'react'
import CmwithSellerCount from './CmwithSellerCount'
import { categoryMenu } from '../../constant'
import SideBar from '../Sidebar'
import NavigateBack from '../NavigateBack'
import UnAssignSellerTable from './UnAssignSellerTable'
const CategoryHeadAssignSeller = () => {
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
                        <h1 className=' text-2xl text-[#383E50] font-semibold leading-10 text-left'>Seller to CM assignment</h1>

                    </div>
                    <div className='flex flex-row gap-5'>
                        <input type='search' placeholder='Search' className='w-60 border border-solid border-[#EEE] rounded-xl p-2' />

                    </div>
                </section>
                <section className='flex flex-col'>
                    <CmwithSellerCount />
                </section>
                <section className='flex flex-col'>
                    <UnAssignSellerTable />
                </section>
            </div>
        </main>
    )
}

export default CategoryHeadAssignSeller