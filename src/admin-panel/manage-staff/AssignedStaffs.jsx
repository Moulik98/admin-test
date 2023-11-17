import React, { useState } from "react";
import StaffModal from "./StaffModal";

const AssignedStaffs = ({ data,index }) => {
  // State for view modal
  const [viewModal, setViewModal] = useState(false);
  // State for edit
  const [editModal, setEditModal] = useState(false);
  // const [view, setView] = useState([])


  const handleClose = () => {
    setViewModal(false)
    setEditModal(false)
  }
  return (
    <tr class="border-b border-solid border-gray-200 bg-white hover:bg-gray-50 text-[#222222]">
      <td class="px-2 py-2 ">{index+1}</td>
      <td class="px-2 py-2 ">{data.emp_id}</td>
      <td scope="row" class="whitespace-nowrap px-2 py-2 font-medium text-gray-900">{data.name}</td>
     
      <td class="px-2 py-2 ">{data.phone}</td>
      <td class="px-2 py-2 ">{data.email}</td>
      
      <td class="px-2 py-2 ">{data.roles}</td>
      <td class="px-2 py-2 ">{data.userName}</td>



      <td className="whitespace-nowrap text-xs font-light text-gray-900">
        <div className="flex">
          <select className={`rounded outline-none p-1`}>
            <option value="active">Activate</option>
            <option value="deactivated">Deactivate</option>
          </select>
        </div>
      </td>
    </tr>
  )
}

export default AssignedStaffs