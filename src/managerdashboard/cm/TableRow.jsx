import React from 'react'
import ViewReasonIcon from './ViewReasonIcon';
import format from 'date-fns/format';
const TableRow = ({ data, index }) => {
  const { _id, fullname, seller_code, phone, email, sellerType, store_name, createdAt } = data;
  const date = format(new Date(createdAt), 'dd/MM/yyyy')
  console.log('data', data);;
  return (
    <tr key={_id}>
      <td className="px-4 py-2">{index + 1}</td>
      <td className="px-4 py-2">{date}</td>
      <td className="px-4 py-2">{fullname}({seller_code})</td>
      <td className="px-4 py-2">{phone}</td>
      <td className="px-4 py-2">{email}</td>
      <td className="px-4 py-2">{sellerType}</td>
      <td className="px-4 py-2">{store_name}</td>
      <td className="px-4 py-2">
        <ViewReasonIcon id={_id} />
      </td>
    </tr>
  )
}

export default TableRow