import React, { useState } from "react";
import AttachmentModal from "./AttachmentModal";

const TableRow = ({ data}) => {
  const { _id, fullname, email, store_name, isVerify } = data.seller;
  const {name}=data.cm
  const [viewAttachment, setViewAttachment] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleClose = (value) => {
    if (value === "close") {
      setViewAttachment(false);
    }
    if (value === "verify") {
      setViewAttachment(false);
    }
  };

  const handleDelete = () => {
    // Show the delete confirmation popup
    setShowDeletePopup(true);
  };

  return (
    <tr key={_id}>
      <td className="px-4 py-2">{fullname}</td>
      <td className="px-4 py-2">{email}</td>
      <td className="px-4 py-2">{store_name}</td>
      <td className="px-4 py-2">{name}</td>
      <td className="px-4 py-2">
        <div
          className={`flex justify-center items-center rounded-full py-1 px-2 capitalize text-xs text-white ${
            isVerify === "approved" ? "bg-indigo-500" : "bg-indigo-900"
          }`}
        >
          {isVerify}
        </div>
      </td>
      <td className="px-4 py-2">
        <div className="flex gap-1 justify-around">
          <div
            onClick={() => setViewAttachment(true)}
            className="flex items-center cursor-pointer hover:text-indigo-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
            View Attachment
          </div>
        </div>
      </td>
      {viewAttachment && (
        <AttachmentModal visible={viewAttachment} id={_id} onClose={handleClose} />
      )}
    </tr>
  );
};

export default TableRow;
