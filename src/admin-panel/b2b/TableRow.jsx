import React, { useState } from "react";
import AttachmentModal from "./AttachmentModal";
const TableRow = ({ data, onDelete }) => {
  const { email, is_approved, business_name, _id, personal_name } = data;
  const [viewAttachment, 
    setViewAttachment] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleClose = (value) => {
    if (value === "close") {
      setViewAttachment(false);
    }
    if (value === "verify") {
      onDelete();
      setViewAttachment(false);
    }
  };

  

  const handleDelete = () => {
    // Show the delete confirmation popup
    setShowDeletePopup(true);
  };
  return (
    <tr className="border-b border-solid border-gray-200 hover:bg-gray-50  text-[#222222]">
      <td
        scope="row"
        className="whitespace-nowrap px-4 py-2 text-xs font-medium text-gray-900"
      >
        {personal_name}
      </td>
      <td className="px-4 py-2 text-xs">{email}</td>
      <td className="px-4 py-2 text-xs">{business_name}</td>
      <td
        scope="row"
        className="whitespace-nowrap px-4 py-2 text-xs font-medium text-gray-900"
      >
        <div
          className={`flex justify-center items-center rounded-full py-1 px-2 capitalize text-xs text-white ${
            is_approved ? "bg-indigo-500" : "bg-indigo-900"
          }`}
        >
          {is_approved}
        </div>
      </td>
      <td className="px-4 py-2 text-xs">
        <div className="flex gap-1 justify-around">
          <div
            onClick={() => setViewAttachment(true)}
            className="flex items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
            View Attachment
          </div>
        </div>
      </td>
      {viewAttachment && (
        <AttachmentModal
          visible={viewAttachment}
          id={_id}
          onClose={handleClose}
        />
      )}
    </tr>
  );
};

export default TableRow;
