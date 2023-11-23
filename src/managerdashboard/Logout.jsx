import React from 'react'
import { useNavigate } from "react-router-dom";
const LogOutModal = ({ visible, onClose }) => {
    const navigate = useNavigate();
   
    const handleClose = (e) => {
        if (e.target.id === 'container') {
            onClose()
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('userId')
        localStorage.removeItem('passToken')
        localStorage.removeItem('email')
        localStorage.removeItem('ally-supports-cache')
        localStorage.removeItem('isStaffLogin')
       

        onClose()
        navigate('/')

    }
    if (!visible) return null
    return (
        <div
            id='container'
            onClick={(e) => handleClose(e)}
            className='fixed inset-0 z-50 bg-black bg-opacity-30  backdrop-blur-sm flex justify-center items-center'>
            <div className='w-2/5 rounded bg-white '>
                <div className='flex flex-col  items-center justify-center'>
                    <div className='font-medium text-gray-900  text-base mt-7'>Are you sure you want to Log out ?</div>
                    {/* <div className='font-medium text-gray-900  text-base'>your order ?</div> */}
                    <div className='flex gap-x-5 my-7'>
                        <button onClick={() => onClose()} className='py-2 px-14 bg-white text-gray-900 rounded-full border border-solid border-gray-900'>No</button>
                        <button onClick={() => handleLogout()} className='py-2 px-14 bg-blue-500 text-white rounded-full'>Yes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogOutModal;