import React from 'react'
import MmwithBrandCount from './MmwithBrandCount'
import { MarHead, } from '../../constant'
import SideBar from '../Sidebar'
import NavigateBack from '../NavigateBack'
import UnAssignMMTable from './UnAssignMMTable'
const MHAssignSeller = () => {
    return (
        <main className='w-full flex flex-row gap-x-5'>
            <div className='sidebar bg-[#00388c] h-screen w-fit sticky top-0'>
                <SideBar
                    menu={MarHead}
                />
            </div>
            <div className='flex-1 mr-5'>

                <section className='flex flex-row justify-between py-5 items-center'>
                    <div className='flex space-x-2 items-center'>
                        <NavigateBack />
                        <h1 className=' text-2xl text-[#383E50] font-semibold leading-10 text-left'>Brand to MM assignment</h1>

                    </div>
                    <div className='flex flex-row gap-5'>
                        <input type='search' placeholder='Search' className='w-60 border border-solid border-[#EEE] rounded-xl p-2' />

                    </div>
                </section>
                <section className='flex flex-col'>
                    <MmwithBrandCount />
                </section>
                <section className='flex flex-col'>
                    <UnAssignMMTable />
                </section>
            </div>
        </main>
    )
}

export default MHAssignSeller