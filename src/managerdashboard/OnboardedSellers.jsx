import React, { useEffect, useState } from 'react'
import SellerTable from './SellerTable'

const OnboardedSellers = () => {
    const [approvedSellers, setApprovedSellers] = useState();
    const [pendingSellers, setPendingSellers] = useState();
    const token = localStorage.getItem("access_token")

    const fetchData = async() => {
        const url = process.env.REACT_APP_URL + '/v1/category-manager/approved/Onboard-Seller'
        const response = await fetch(url,{
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }
        })
        const data = await response.json();
        if(response.ok){
            setApprovedSellers(data.approvedseller)
        }else{
            console.error("Failed to fetch")
        }
    }
  useEffect(()=> {
    fetchData();
  },[])

  const fetchSellers = async() => {
    const url = process.env.REACT_APP_URL + '/v1/category-manager/pending/Onboard-Seller'
    const response = await fetch(url,{
        headers : {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
    })
    const data = await response.json();
    if(response.ok){
        setPendingSellers(data.pendingSeller)
    }else{
        console.error("Failed to fetch")
    }
  }

  useEffect(()=> {
    fetchSellers()
  },[])
  console.log("Pending List >>",pendingSellers)
  console.log("Approved List >>",approvedSellers)
  return (
    <section className='flex flex-row gap-5 py-5'>
    {/* //Left Side */}
    <div className=' w-[62%]  flex flex-col'>
       
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
      <div className="grid grid-cols-2 gap-4">
        {Array.isArray(pendingSellers) &&
              pendingSellers?.map((seller) => (
          <div key={seller._id} className="flex justify-between items-center">
            <div>
              <p className="text-base text-[#383E50] font-semibold">{seller.fullname}</p>
              <p className="text-sm text-[#ADB5BD]leading-6">{seller.store_name}</p>
              <p className="text-sm text-[#ADB5BD]leading-6">{seller.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
</section>
  )
}

export default OnboardedSellers