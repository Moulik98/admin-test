import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./products.css";
import { getToken } from "../../hook/getToken";
import Description from "../../Description";

const AllProductRow = ({ variationId, slNo, name, img, sellerName, parentCategory, subCategory, childCategory, country, award, approved, id, review, handleEdit, action, selectedOptions, }) => {
  console.log("All product list >>>>", name)

  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);



  const handleDelete = () => {
    const url = `${process.env.REACT_APP_URL}/v1/products/remove/${id}`; // Replace with your API endpoint
    const access_token = getToken();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
        // Add any other headers required by your API
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        if (response.ok) {
          handleEdit(id, "delete");
        }
        // Request successful, handle the response as needed
        console.log("Delete request successful");
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error.message);
      });

    console.log(id);
  };

  const showConfirmation = () => {
    setIsConfirmationVisible(true);
  };

  const hideConfirmation = () => {
    setIsConfirmationVisible(false);
  };

  const confirmDelete = () => {
    handleDelete(id);
    hideConfirmation();
  };

  return (
    <tr className="overflow-hidden border-b-2 bg-white transition duration-300 ease-in-out">
      <td className="whitespace-nowrap px-4 py-2 text-xs font-light text-gray-900">
        {slNo}
      </td>
      <td className="whitespace-nowrap px-3 py-2 text-xs font-light text-gray-900">
        <img className="w-12 h-12" src={img} />
      </td>
      <td className="px-4 py-2 text-xs font-light text-gray-900">
        <Description description={name}/>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-xs font-light text-gray-900">
        {sellerName}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-xs font-light text-gray-900">
        <p className={`${selectedOptions.parent ? "block" : "hidden"}`}>
          {parentCategory}
        </p>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-xs font-light text-gray-900">
        <p className={`${selectedOptions.sub ? "block" : "hidden"}`}>
          {subCategory}
        </p>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-xs font-light text-gray-900">
        <p className={`${selectedOptions.child ? "block" : "hidden"}`}>
          {childCategory}
        </p>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-xs font-light text-gray-900">
        <p className={`${selectedOptions.country ? "block" : "hidden"}`}>
          {country}
        </p>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-xs font-light text-gray-900">
        <p className={`${selectedOptions.awards ? "block" : "hidden"}`}>
          <img className="w-8 h-8 rounded-full" src={award} />
        </p>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-xs font-light text-white">
        <div
          className={`${review === "pending"
            ? "bg-gray-500 py-2 px-4 rounded-md"
            : "bg-green-500 py-2 px-4 rounded-md"
            }`}
        >
          {`${review === "pending" ? "Review" : "Reviewed"}`}
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-xs font-light text-white">
        <div
          className={`${approved === "pending"
            ? "bg-gray-500 p-2 rounded-md"
            : approved === "approved"
              ? "bg-green-500 py-2 px-4 rounded-md"
              : "bg-red-500 py-2 px-4 rounded-md"
            } p-2 rounded-md text-center`}
        >
          {`${approved === "pending"
            ? "Pending"
            : approved === "approved"
              ? "Approved"
              : "Declined"
            }`}
        </div>
      </td>

      <td className="whitespace-nowrap px-4 py-2 text-xs font-light text-gray-900">
        <div
          onClick={showConfirmation}
          class="flex items-center justify-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-4 h-4 text-red-700"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
        </div>
      </td>
      {isConfirmationVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="text-lg font-bold mb-4">Confirm Deletion</p>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-end">
              <button
                onClick={hideConfirmation}
                className="px-4 py-2 mr-2 text-gray-500 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white border rounded"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </tr>
  );
};

export default AllProductRow;
