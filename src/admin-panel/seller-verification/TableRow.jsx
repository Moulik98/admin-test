import React, { useState } from "react";
import AttachmentModal from "./AttachmentModal";
import { getToken } from "../../hook/getToken";
const TableRow = ({ data, onDelete, index }) => {
  const { fullname, email, isVerify, store_name, _id, seller_code } = data;
  const [viewAttachment, setViewAttachment] = useState(false);

  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleDelete = () => {
    // Show the delete confirmation popup
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    // Perform the delete action here
    // You can call your delete function or API request here
    // After successful delete, close the popup and update the UI
    try {
      // Your delete logic here
      await makeDeleteRequest(_id); // This should call your delete function
      onDelete(); // This should trigger the UI update
    } catch (error) {
      console.error("Error during delete:", error);
    } finally {
      setShowDeletePopup(false); // Close the delete confirmation popup
    }
  };
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
      const token = getToken()
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
        {fullname}
      </td>
      <td className="px-4 py-2 text-xs">{seller_code}</td>

      <td className="px-4 py-2 text-xs">{email}</td>
      <td className="px-4 py-2 text-xs">{store_name}</td>
      <td
        scope="row"
        className="whitespace-nowrap px-4 py-2 text-xs font-medium text-gray-900"
      >
        <div
          className={`flex justify-center items-center rounded-full py-1 px-2 text-xs text-white ${
            isVerify === "approved" ? "bg-indigo-500" : "bg-indigo-900"
          }`}
        >
          {isVerify}
        </div>
      </td>
      <td className="px-4 py-2 text-xs">
        <div className="flex justify-around">
          <div
            onClick={() => setViewAttachment(true)}
            className="flex items-center gap-1 cursor-pointer"
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
          <div
            onClick={handleDelete}
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
        </div>
      </td>
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <p className="text-base text-gray-800 mb-4">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-end">
              <button
                className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 mr-2"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-blue-400 text-white rounded hover-bg-red-500"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
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
