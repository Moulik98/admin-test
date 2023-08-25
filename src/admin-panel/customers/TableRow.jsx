import React from 'react'
import { Link } from 'react-router-dom';
const TableRow = ({ data, index, length, checkedValue, handleCheckboxChange }) => {
    const { _id, name, type, phone, email, country, orderCount, totalSpend, aov, last_active, register_date, status } = data;
    return (
        <tr class="border-b border-solid border-gray-200 bg-white hover:bg-gray-50 text-[#222222]">
            <td class="px-2 py-2 whitespace-nowrap ">
                <input
                    type='checkbox'
                    checked={Array.isArray(checkedValue) && checkedValue.includes(_id)}// Here's where the error occurs
                    onChange={() => handleCheckboxChange(_id)}
                />

            </td>
            <td class="px-2 py-2 whitespace-nowrap underline hover:text-blue-500 "><Link to={`/customers/${_id}`}>{name}</Link></td>
            <td class="px-2 py-2 whitespace-nowrap">{type}</td>
            <td class="px-2 py-2 whitespace-nowrap ">{phone}</td>
            <td class="px-2 py-2 whitespace-nowrap">{email}</td>
            <td class="px-2 py-2 whitespace-nowrap">{country}</td>
            <td class="px-2 py-2 whitespace-nowrap">{orderCount}</td>
            <td class="px-2 py-2 whitespace-nowrap">{totalSpend}</td>
            <td class="px-2 py-2 whitespace-nowrap">{aov}</td>
            <td class="px-2 py-2 whitespace-nowrap">{last_active}</td>
            <td class="px-2 py-2 whitespace-nowrap">{register_date}</td>
            <td class="px-2 py-2 whitespace-nowrap"><button className={`w-16 h-7 rounded font-bold ${status === 'active' ? 'bg-teal-500 text-teal-900 ' : 'bg-red-500 text-red-900 '}`}>{status}</button></td>
        </tr>
    )
}

export default TableRow