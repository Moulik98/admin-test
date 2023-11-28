import React, { useState } from 'react'
import ViewModal from './ViewModal'
import RefundModal from './RefundModal'
import EditModal from './EditModal'
const OrdersTableRow = ({ data, onDelete }) => {
    const { _id, user_order_id, order_status, payment_method, payment_id, payment_status, voucher, seller_details, amount, order_date } = data
    console.log("Order data", data)
    // state for viewModa 
    const [viewModal, setViewModal] = useState(false)
    const [refundModal, setRefundModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const handleClose = () => {
        setViewModal(false)
        setRefundModal(false)
        setEditModal(false)
    }
    const token = localStorage.getItem('access_token')

    const handleDelete = () => {
        try {
            fetch(`${process.env.REACT_APP_URL}/v1/order/delete_order/admin/${_id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    if (res.ok) {
                        onDelete();
                    }
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <tr class="border-b border-solid border-gray-200 bg-white hover:bg-gray-50 text-[#222222]">
            <td scope="row" class="whitespace-nowrap px-2 py-2 font-medium text-gray-900">{user_order_id}</td>
            <td class="px-2 py-2 capitalize">{order_status.replace(/_/g, " ")}</td>
            <td class="px-2 py-2">{payment_method}</td>
            <td class="px-2 py-2 capitalize"><div className={`p-1 text-center rounded-md capitalize ${payment_status === 'paid' ? 'bg-green-100' : 'bg-red-100'}`}>{payment_status}</div></td>
            <td scope="row" class="whitespace-nowrap px-2 py-2 font-medium text-gray-900">{voucher && voucher[0]?.coupon_code}</td>
            <td class="px-2 py-2">{seller_details && seller_details[0]?.fullname}</td>
            <td class="px-2 py-2">₹{amount}</td>
            <td class="px-2 py-2">{order_date}</td>
            <td className="px-2 py-2">
                {(order_status === 'returned' || order_status === 'cancelled') && payment_status === 'paid' ? (
                    <button className='bg-red-500 px-2 py-1 text-white' onClick={() => setRefundModal(true)}>Issue Refund</button>
                ) : null}
                {
                    refundModal &&
                    <RefundModal
                        order_id={user_order_id}
                        payment_id={payment_id}
                        amount={amount}
                        visible={refundModal}
                        onClose={handleClose} />
                }
            </td>
            <td class="px-2 py-2">
                <div class="flex gap-x-2">
                    <div onClick={() => setEditModal(true)} className="rounded bg-[#E8F0FE] p-2 text-xs font-bold text-[#4285F4] cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>

                    </div>
                    <div
                        onClick={() => setViewModal(true)}
                        className="rounded bg-[#E8F0FE] p-2 text-xs font-bold text-[#4285F4] cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    {
                        editModal && <EditModal 
                        id={_id}
                        order_id={user_order_id}
                        visible={editModal}
                        onClose={handleClose}
                        />
                    }

                    {/* <div
                        onClick={() => handleDelete()}
                        class="rounded bg-[#F7D7DB] p-2 text-xs font-bold text-[#A12321] cursor-pointer">Delete
                    </div> */}
                    {
                        viewModal && <ViewModal
                            id={_id}

                            visible={viewModal}
                            onClose={handleClose}
                        />
                    }
                </div>
            </td>
        </tr>
    )
}

export default OrdersTableRow