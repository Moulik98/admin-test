import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { getToken } from "../../hook/getToken";
import Pagination from "../../Pagination";
import Description from "../../Description";

const ProductModal = ({ visible, onClose, id, modalName }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const modalRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = getToken();
        const response = await fetch(
          `${process.env.REACT_APP_URL}/v1/mh/all-product`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();
        setProducts(data.productsWithBrandDetails);
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

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return (
    <div className="fixed inset-0 z-50 text-xs bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white p-1 rounded-lg shadow-lg w-2/3 relative"
      >
        {/* Close button in the top-right position */}
        <button
          className="absolute top-0 right-0 bg-slate-200 p-1 cursor-pointer"
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

        <h2 className="text-lg font-semibold mb-4 text-center">
          Product Details
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Product Title</th>
              <th className="px-4 py-2 border">Category Tags</th>
              <th className="px-4 py-2 border">Utility Tags</th>
              <th className="px-4 py-2 border">Brand Title</th>
              <th className="px-4 py-2 border">CM Name</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map(({ product, brand, mm_name }) => (
              <tr key={product._id}>
                <td className="px-4 py-2 border">{`${product.item_name}`}</td>
                <td className="px-4 py-2 border">
                  <Description description={product.category_tags.join(", ")} />
                </td>
                <td className="px-4 py-2 border">
                  <Description description={product.utility_tags.join(", ")} />
                </td>
                <td className="px-4 py-2 border">{brand.brand_name}</td>
                <td className="px-4 py-2 border">{`${mm_name}`}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          setCurrentPage={setCurrentPage}
          totalItems={products.length}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ProductModal;
