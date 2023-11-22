import React, { useEffect, useState } from 'react'
import SellerTable from './SellerTable'
import PendingTable from './PendingTable'

const MHSellers = ({approvedSellers,pendingSellers}) => {

  return (
    <section className='flex flex-row gap-5 py-5'>
    {/* //Left Side */}
    <div className=' w-[58%]  flex flex-col'>
       
        <div className='flex gap-5 '>

            <div className='grow w-full p-5 flex flex-col gap-5 border border-solid border-[#EEE] rounded-xl'>
                <p className='text-base text-[#383E50] font-semibold'>Onboarded Sellers</p>
             <SellerTable sellers={approvedSellers} />
            </div>
            {/* //2nd box */}
      
        </div>

    </div>
    {/* //Right Side */}
    <div className='grow flex flex-col'>
      
    <div className="grow p-5 flex flex-col gap-5 border border-solid border-[#EEE] rounded-xl">
      <p className="text-base text-[#383E50] font-semibold">Pending Sellers</p>
    <PendingTable sellers={pendingSellers}/>
  
    </div>
    </div>
</section>
  )
}

export default MHSellers