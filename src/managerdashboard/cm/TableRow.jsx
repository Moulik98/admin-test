import React from 'react'

const TableRow = ({data,index}) => {
    const { _id, fullname, seller_code,phone,email,sellerType, store_name, isVerify } = data;
    const { name } = data;
  return (
    <tr key={_id}>
    <td className="px-4 py-2">{index+1}</td>
    <td className="px-4 py-2">{fullname}</td>
    <td className="px-4 py-2">{seller_code}</td>
    <td className="px-4 py-2">{phone}</td>
    <td className="px-4 py-2">{email}</td>
    <td className="px-4 py-2">{sellerType}</td>
    <td className="px-4 py-2">{store_name}</td>
    <td className="px-4 py-2">
      <div
        className={`flex justify-center items-center rounded-full py-1 px-2 capitalize text-xs text-white ${
          isVerify === "approved" ? "bg-indigo-500" : "bg-indigo-900"
        }`}
      >
        {isVerify}
      </div>
    </td>
    </tr>
  )
}

export default TableRow