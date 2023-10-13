import React, { useState } from "react";
// import AttachmentModal from './AttachmentModal'
const TableRow = ({ data, onDelete, onViewDetails }) => {
  const { fullname, email, isVerify, store_name, sellerType, _id, seller_id } =
    data;
  // const [viewAttachment, setViewAttachment] = useState(false)
  // const handleClose = (value) => {
  //     if (value === 'close') {
  //         setViewAttachment(false)
  //     } if (value === 'verify') {
  //         onDelete()
  //         setViewAttachment(false)
  //     }

  // }
  async function makeDeleteRequest(id) {
    try {
      const url = `${process.env.REACT_APP_URL}/v1/verifySeller/deleteData`;

      const payload = {
        // Add your desired request body here
        id: id,
      };

      const accessToken = localStorage.getItem("access_token"); // Replace with your actual access token

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
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
  async function onViewDetails(id) {
    window.location.href = `/sellerdetails/${id}`;
  }

  const setViewDetails = () => {
    onViewDetails(_id);
  };

  const handleDelete = () => {
    makeDeleteRequest(_id);
  };
  return (
    <tr class="border-b border-solid border-gray-200 hover:bg-gray-50  text-[#222222]">
      <td
        scope="row"
        class="whitespace-nowrap px-4 py-2 text-xs font-medium text-gray-900"
      >
        {fullname}
      </td>
      <td class="px-4 py-2 text-xs">{email}</td>
      <td class="px-4 py-2 text-xs capitalize">{sellerType}</td>
      <td class="px-4 py-2 text-xs capitalize">{store_name}</td>
      {/* <td
                scope="row"
                class="whitespace-nowrap px-4 py-2 text-xs font-medium text-gray-900"
            >
                <div className={`flex justify-center items-center rounded-full py-1 px-2 text-xs text-white ${isVerify ? 'bg-indigo-500' : 'bg-indigo-900'}`}>

                    {`${isVerify ? 'Approved' : 'Declined'}`}

                </div>
            </td> */}
      <td class="px-4 py-2 text-xs">{seller_id}</td>
      <td class="px-4 py-2 text-xs">
        <div class="flex justify-around">
          <div
            onClick={() => setViewDetails()}
            class="flex items-center cursor-pointer"
          >
            View Details
          </div>
          <div
            onClick={() => handleDelete()}
            class="flex items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
          {/* {
                        viewAttachment &&
                        <AttachmentModal
                            visible={viewAttachment}
                            id={_id}
                            onClose={handleClose}
                        />
                    } */}
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
