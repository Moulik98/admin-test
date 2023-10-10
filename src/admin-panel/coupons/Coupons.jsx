import React, { useState } from 'react'
import CouponForm from './CouponForm'
import CouponsList from './CouponsList'
import { Link } from 'react-router-dom'
import { User } from '../user/User'
const Coupons = () => {
    const [isClicked, setIsClicked] = useState(false)
      // Add a new state for search results
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropDown] = useState(false);

    const [couponId, setCouponId] = useState('')
    const handleNewClick = (id) => {
        console.log(id);
        setCouponId(id)
        setIsClicked(true)
    }
    const handleClose = () => {
        setIsClicked(false)
    }


    return (
        <main>
            <div className='pr-6'>
                <section>
                    <div className='max-w-6xl mx-auto flex justify-between py-5'>
                        <Link to='/dashboard' className='text-3xl text-gray-900 font-semibold'>{`${isClicked ? 'Coupons' : 'Coupons List'}`}</Link>
                        <div className='flex gap-x-10'>
                     
                            <User/>
                        </div>
                    </div>
                </section>
                {
                    isClicked ?
                        <CouponForm
                            handleClose={handleClose}
                            id={couponId}
                        /> :
                        <CouponsList
                            handleClick={handleNewClick}
                        />
                }


            </div>
        </main>
    )
}
export default Coupons