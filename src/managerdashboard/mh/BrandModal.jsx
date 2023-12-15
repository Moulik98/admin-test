import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { getToken } from "../../hook/getToken";
import Pagination from "../../Pagination";

const BrandModal = ({ visible, onClose, id, modalName }) => {
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Adjust the page size according to your preference
  const modalRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = getToken();
        const response = await fetch(
          `${process.env.REACT_APP_URL}/v1/mh/all-brand`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();
        setBrands(data.brands);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      }
    };

    fetchData();
  }, []);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible, onClose]);

  if (!visible) {
    return null;
  }

  // Paginate the brands based on the current page and page size
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedBrands = brands.slice(startIndex, endIndex);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white p-2 text-xs rounded-lg shadow-lg relative"
      >
        {/* Close button in the top-right position */}
        <button
          className="absolute top-0 bg-slate-200  right-0 p-1 cursor-pointer"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal content */}
        <table className="table-auto w-full mr-4 sm:w-auto">
          <thead>
            <tr>
              <th className="px-2 sm:px-4 py-2">Brand Name</th>
              <th className="px-2 sm:px-4 py-2">Brand Logo</th>
              <th className="px-2 sm:px-4 py-2">Product Count</th>
              <th className="px-2 sm:px-4 py-2">MM Name</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBrands.map((brand) => (
              <tr key={brand._id}>
                <td className="border px-2 sm:px-4 py-2">{brand.brand_name}</td>
                <td className="border px-2 sm:px-4 py-2">
                  <img
                    src={brand.brand_logo_url}
                    alt={brand.brand_name}
                    className="w-8 sm:w-8 h-auto"
                  />
                </td>
                <td className="border px-2 sm:px-4 py-2">
                  {brand.product_count}
                </td>
                <td className="border px-2 sm:px-4 py-2">{brand.mm_name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Render Pagination component */}
        <Pagination
          setCurrentPage={setCurrentPage}
          totalItems={brands.length}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default BrandModal;
