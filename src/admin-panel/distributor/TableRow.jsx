import React, { useState } from "react";
import AttachmentModal from "./AttachmentModal";
const TableRow = ({ data, onDelete }) => {
  const {
    company_name,
    name,
   gstn,pan,
    createdAt,
    brand_name,
    _id,
    
    
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
 

 
  return (
    <tr class="border-b border-solid border-gray-200 hover:bg-gray-50  text-[#222222]">
     <td className="px-4 py-2">{formattedDate}</td>
      
      <td className="px-4 py-2">{company_name}</td>
      <td className="px-4 py-2">{brand_name}</td>
      <td className="px-4 py-2">
        {name}
      </td>
      <td className="px-4 py-2">{gstn}</td>
      <td className="px-4 py-2"> {pan}</td>
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
