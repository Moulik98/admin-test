import React, { useState } from "react";

const TableRow = ({ data,index }) => {
  const { cancellation_reasons, reason_for, isActive, _id } = data;
  const [selectedStatus, setSelectedStatus] = useState(isActive);

  // changin value based on coupon is actived or not


  const id = _id;

  const handleChange = async () => {
    // Make the API call
    const token = localStorage.getItem("access_token")
    const url = `${process.env.REACT_APP_URL}/v1/cancellation-reason/update-status/${id}`;
    console.log(url)
    const response = await fetch(url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
       
      }
    );


    if (response.ok) {
      // If the API call is successful, toggle the selectedStatus
     
      setSelectedStatus((prevStatus) => !prevStatus);
      console.log("status",selectedStatus)
      // Handle success if needed
    } else {
      // Handle error
      console.error('Error updating status:', response.statusText);
    }
  };
  const bgColor = selectedStatus === true ? "bg-green-200" : "bg-red-200";

  return (
    <tr className="border-b border-solid border-gray-200 hover:bg-gray-50  text-[#222222]">
       <td
        scope="row"
        className="whitespace-nowrap px-4 py-2 text-xs font-medium text-gray-900"
      >
        {index + 1}
      </td>
      <td
        scope="row"
        className="whitespace-nowrap px-4 py-2 text-xs font-medium text-gray-900"
      >
        {cancellation_reasons}
      </td>
      <td
        scope="row"
        className="whitespace-nowrap px-4 py-2 text-xs font-medium text-gray-900"
      >
        {reason_for}
      </td>
   
      <td className="whitespace-nowrap px-6 text-xs font-light text-gray-900">
            <div className="flex gap-2 justify-center">
              <select
                className={`rounded outline-none p-1 ${bgColor}`}
                value={selectedStatus ? "active" : "deactivated"}
                onChange={handleChange}
              >
                <option value="active">Activate</option>
                <option value="deactivated">Deactivate</option>
              </select>
            </div>
          </td>
    </tr>
  );
};

export default TableRow;
