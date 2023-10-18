import React, { useEffect, useState } from 'react';
import OrdersTableRow from '../orders/OrdersTableRow';
import Pagination from '../../Pagination';
import { Link } from "react-router-dom";

const status = [
    {
        fieldName: 'order_status',
        name: 'cancelled'
    }, {
        fieldName: 'order_status',
        name: 'processing'
    }, {
        fieldName: 'order_status',
        name: 'delivered'
    },
    {
        fieldName: 'order_status',
        name: 'shipped'
    }, {
        fieldName: 'payment_status',
        name: 'paid'
    }, {
        fieldName: 'payment_status',
        name: 'pending'
    }
];

const OrdersTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const [orderList, setOrderList] = useState([]);

    async function fetchOrderData(data) {
        const token = localStorage.getItem('access_token');
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/v1/order/getAllOrders/admin?page=1&limit=5&sort_date=desc`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            setOrderList(responseData.data);
            setTotalItems(responseData.totalOrder);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchOrderData({}); // Initial fetch
    }, [isClicked, currentPage, pageSize]);

    return (
        <div className='my-4 border'>
            <p className='px-2 text-left py-4 text-xl font-semibold'><Link to='/orders'>Recent Orders</Link></p>
            <div className='p-1'>
                <section>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
                                <tr>
                                    <th scope="col" className="px-2 py-3">Order</th>
                                    <th scope="col" className="px-2 py-3">Status</th>
                                    <th scope="col" className="px-2 py-3">Method</th>
                                    <th scope="col" className="px-2 py-3">Payment</th>
                                    <th scope="col" className="px-2 py-3">Voucher</th>
                                    <th scope="col" className="px-2 py-3">Seller</th>
                                    <th scope="col" className="px-2 py-3">Amount</th>
                                    <th scope="col" className="px-2 py-3">Order Date</th>
                                    <th scope="col" className="px-2 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderList.map((item) => (
                                    <OrdersTableRow
                                        key={item._id}
                                        data={item}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

        </div>
    );
};

export default OrdersTable;
