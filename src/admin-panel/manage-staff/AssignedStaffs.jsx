import React from 'react'

const AssignedStaffs = ({data}) => {
  return (
    <tr class="border-b border-solid border-gray-200 bg-white hover:bg-gray-50 text-[#222222]">
    <td scope="row" class="whitespace-nowrap px-2 py-2 font-medium text-gray-900">{data.name}</td>
    <td class="px-2 py-2 ">{data.email}</td>
    <td class="px-2 py-2 ">{data.roles}</td>
    <td class="px-2 py-2 ">{data.userName}</td>
 
</tr>
  )
}

export default AssignedStaffs