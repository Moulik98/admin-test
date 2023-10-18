import React from 'react'
import SellerTable from './SellerTable'

const OnboardedSellers = () => {
  return (
    <section className='flex flex-row gap-5 py-5'>
    {/* //Left Side */}
    <div className=' w-[62%]  flex flex-col'>
       
        <div className='flex gap-5 '>

            <div className='grow w-full p-5 flex flex-col gap-5 border border-solid border-[#EEE] rounded-xl'>
                <p className='text-base text-[#383E50] font-semibold'>Onboarded Sellers</p>
             <SellerTable />
            </div>
            {/* //2nd box */}
      
        </div>

    </div>
    {/* //Right Side */}
    <div className='grow flex flex-col'>
      
    <div className='grow p-5 flex flex-col gap-5 border border-solid border-[#EEE] rounded-xl'>
                <p className='text-base text-[#383E50] font-semibold'>Pending Sellers</p>
                <div className='flex flex-col gap-5 pl-2'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='text-base text-[#383E50] font-semibold'>Patric Adams</p>
                            <p className='text-sm text-[#ADB5BD]leading-6'>Sanfrancisco</p>
                        </div>
                       
                    </div>
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='text-base text-[#383E50] font-semibold'>Patric Adams</p>
                            <p className='text-sm text-[#ADB5BD]leading-6'>Sanfrancisco</p>
                        </div>
                       
                    </div>
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='text-base text-[#383E50] font-semibold'>Patric Adams</p>
                            <p className='text-sm text-[#ADB5BD]leading-6'>Sanfrancisco</p>
                        </div>
                       
                    </div>
                </div>
            </div>
    </div>
</section>
  )
}

export default OnboardedSellers