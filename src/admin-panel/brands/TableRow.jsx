import React, { useState } from "react";
import AttachmentModal from "./AttachmentModal";
import Description from "../../Description";
const TableRow = ({ data, onDelete }) => {
  const {
    brand_name,
    trademark_reg_no,
    status,
    trademark_office,
    createdAt,
    brand_desc,
    _id,
    brand_logo_url,
    seller,
    cm_data,
    mm_data
    
  } = data;
  const formattedDate = new Date(createdAt).toLocaleDateString();
  const [viewAttachment, setViewAttachment] = useState(false);
  const handleClose = (value) => {
    if (value === "close") {
      setViewAttachment(false);
    }
    if (value === "verify") {
      onDelete();
      setViewAttachment(false);
    }
  };
  async function makeDeleteRequest(id) {
    try {
      const token = localStorage.getItem("access_token"); // Replace with your actual bearer token
      const url = `${process.env.REACT_APP_URL}/v1/verifySeller/deleteData`;

      const payload = {
        // Add your desired request body here
        id: id,
      };

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      };

      const response = await fetch(url, requestOptions);

      if (response.ok) {
        const responseData = await response.json();
        onDelete();
        console.log("Delete request successful:", responseData);
      } else {
        throw new Error("Delete request failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  const handleDelete = () => {
    makeDeleteRequest(_id);
  };
  return (
    <tr class="border-b border-solid border-gray-200 hover:bg-gray-50  text-[#222222]">
     <td className="px-4 py-2">{formattedDate}</td>
      <td className="px-4 py-2">
        <img src={brand_logo_url} alt={brand_name} className="w-8 h-8" />
      </td>
      <td className="px-4 py-2">{brand_name}</td>
      <td className="px-4 py-2">
      <Description description={`${trademark_office} ${trademark_reg_no}`} />
      </td>
      <td className="px-4 py-2">{seller?.fullname}</td>
      <td className="px-4 py-2">{cm_data?.name}</td>
      <td className="px-4 py-2">{mm_data?.name}</td>
      <td className="px-4 py-2"><Description description={brand_desc} /></td>
      <td className="text-center px-4 py-2">
        {status === "Approved" ? (
          <div className="flex justify-center items-center rounded-sm py-1 px-2 text-xs  bg-indigo-200">
            Approved
          </div>
        ) : status === "Pending Review" ? (
          <div className="flex justify-center items-center rounded-sm py-1 px-2 text-xs  bg-yellow-200">
            Pending Review
          </div>
        ) : (
          <div className="flex justify-center items-center rounded-sm py-1 px-2 text-xs  bg-indigo-500">
            Declined
          </div>
        )}
      </td>
      <td class="px-4 py-2 text-xs">
        <div class="flex justify-around">
          <div
            onClick={() => setViewAttachment(true)}
            class="flex p-1 border-b-2 rounded-lg items-center cursor-pointer"
          >
            view
          </div>
          
          {viewAttachment && (
            <AttachmentModal
              visible={viewAttachment}
              id={_id}
              onClose={handleClose}
            />
          )}
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
