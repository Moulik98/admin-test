import React, { useState } from 'react'
import toast from 'react-hot-toast';

const RefundModal = ({ order_id,payment_id,amount,visible, onClose }) => {

    const [isClicked, setIsClicked] = useState(false);

    const handleDivClick = () => {
        setIsClicked(true);
    };

    const apiUrl = process.env.REACT_APP_URL + '/v1/orders/payment-refund'
    const token = localStorage.getItem('access_token')

    const [commentsTextareaValue, setCommentsTextareaValue] = useState("");

const handleCommentsChange = (event) => {
    setCommentsTextareaValue(event.target.value);
};

const handleRefund = async () => {
    const requestBody = {
        order_id: order_id,
        payment_id: payment_id,
        notes: isClicked ? commentsTextareaValue : null,
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        if (response.ok) {
          
            toast.success(data.message);
            onClose();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        console.error("Error during refund:", error.message);
        // Handle error, e.g., show an error message to the user
        toast.error("Failed to process refund. Please try again later.");
    }
};

    if (visible)
        return (
            <div className="fixed inset-0 overflow-x-hidden overflow-y-scroll bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center my-auto" >
                <div className="flex flex-col bg-white rounded-md">
                    <div className=' bg-gray-200 py-3 px-5'>
                        <div className="flex justify-between gap-x-24 ">
                            <div className="flex justify-center items-center">
                                <h1 className='text-xl font-normal text-gray-700'>Refund Payment</h1>
                            </div>
                            <div className="flex items-start justify-end px-4 py-1  border-solid border-slate-200 rounded-t">
                                <button className=" float-right text-3xl leading-none font-semibold"
                                    onClick={() => onClose()}
                                    type="button"
                                >
                                    <span className="hover:scale-110 duration-300 bg-transparent text-gray-600 text-xl block">
                                        x
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col px-4 py-4 gap-y-2">
                        <label className='text-lg font-semibold text-gray-800' htmlFor="">Refund amount</label>
                        <div class="flex">
                            <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>

                            </span>
                            <input value={amount} type="text" id="website-admin" class="rounded-none rounded-e-lg bg-white border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 " placeholder="" />
                        </div>
                        <p className='text-gray-400'>This will be a <span className='font-semibold'>full refund</span>.Change amount for a partial refund</p>
                    </div>
                    <div className="px-12">
                        <div className="flex gap-x-2">
                            <input 
                            type="checkbox"
                            disabled
                             />
                            <label className='text-sm text-gray-400 font-semibold' htmlFor="">Refund Instantly</label>
                        </div>
                    </div>
                    <div className="flex px-4 py-4">
                        <p className='text-gray-400'>Currently,Instant Refunds are available on TPV, <br /> netbanking, UPI and select credit cards and debit cards.</p>
                    </div>
                    <div className="flex flex-col px-4 py-4 justify-start " onClick={handleDivClick}>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p>Add Comments(Optional)</p>
                        </div>
                        {isClicked && (
                            <textarea
                                placeholder="Type your comments here..."
                                rows="4"
                                cols="40"
                                className="border p-2 mt-2"
                                onChange={handleCommentsChange}
                            />
                        )}
                    </div>
                    <div className="flex justify-center mx-4 my-4">
                        <button onClick={handleRefund} className='w-4/5 px-4 py-2 bg-blue-500 text-base text-white rounded'>Issue Refund</button>
                    </div>
                </div>
            </div >
        )
}

export default RefundModal