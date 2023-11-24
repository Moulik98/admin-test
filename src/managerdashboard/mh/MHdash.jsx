import React, { useState } from 'react'
import { MarHead } from '../../constant'
// import CmAndSellerTable from './CmAndSellerTable'
import Stats from './Stats'
import SideBar from '../Sidebar'
import NavigateBack from '../NavigateBack'
import CmAndSellerTable from './CmAndSellerTable'
import LogOutModal from '../Logout'

const MHdash = () => {

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const handleLogout = () => {
        setShowLogoutModal(true);
    };
    const handleModalClose = () => {
        setShowLogoutModal(false);
    };

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
                        <h1 className=' text-2xl text-[#383E50] font-semibold leading-10 text-left'>MH Dashboard</h1>

                    </div>

                    <div className='flex flex-row gap-5'>
                        <div className="flex items-center" onClick={handleLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                        </div>
                        <LogOutModal visible={showLogoutModal} onClose={handleModalClose} />
                        <input type='search' placeholder='Search' className='w-60 border border-solid border-[#EEE] rounded-xl p-2' />

                    </div>
                </section>
                <Stats />

                <section className='flex flex-col'>
                    <CmAndSellerTable />
                </section>

            </div>


        </main>
    )
}

export default MHdash;