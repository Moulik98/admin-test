import React, { useState } from 'react'
import toast from 'react-hot-toast';

const EditModal = ({ order_id, visible, onClose }) => {

    const [selectedOption, setSelectedOption] = useState('');
    const token = localStorage.getItem("access_token")

    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
    };

    // Set a default option
    const defaultOption = "--select--";
    const statusOptions = [
        "shipped",
        "out_for_delivery",
        "delivered",
        "pick_up",
        "return_item_received",
        "cancelled",
        "returned"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = process.env.REACT_APP_URL + `/v1/orders/update-order-status`
        const requestBody = {
            user_order_id: order_id,
            order_status: selectedOption
        }
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message)
                onClose();
            } else {
                toast.error(data.message)
            }

        } catch (err) {
            console.log(err);
        }
    }
    if (visible)
        return (
            <div className=" fixed inset-0 overflow-x-hidden overflow-y-scroll bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center my-auto p-4">
                <div className="w-96 flex flex-col bg-white rounded py-1 px-4">
                    <div className="flex justify-end">
                        <button className=" float-right text-3xl leading-none font-semibold"
                            type="button"
                            onClick={() => onClose()}>
                            <span className="hover:scale-110 duration-300 bg-transparent text-[#50C4D9]  text-2xl block">
                                x
                            </span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label className='text-lg ' htmlFor="orderId">Order ID:</label>
                            <input
                                className='border p-1'
                                type="text"
                                id="orderId"
                                value={order_id}

                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className='text-lg' htmlFor="dropdown">Order Status:</label>
                            <select id="dropdown" value={selectedOption} className='border p-1' onChange={handleDropdownChange}>
                            <option value="" disabled hidden>{defaultOption}</option>
                                {statusOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option.replace(/_/g, " ")}{/* Replacing underscores with spaces */}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-center items-center py-2">
                            <button className="bg-blue-900 px-4 py-2 text-white" type='submit' >
                                Update
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        );
};


export default EditModal