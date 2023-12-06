import React, { useState, useEffect } from "react";
import getList from "../getList";
import { getToken } from "../../hook/getToken";
import BrandModal from "./BrandModal";
import ProductModal from "./ProductModal"; // Import the ProductModal component

const Stats = () => {
  const [statData, setStatData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false); // State to manage brand modal visibility
  const [showProductModal, setShowProductModal] = useState(false); // State to manage product modal visibility

  useEffect(() => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_URL}/v1/mh/get-stats`;
    const token = getToken();
    getList(url, token)
      .then((data) => {
        setStatData(data.stats);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Example arrays of table data
  // Replace these with actual API calls or data

  const handleItemClick = (itemName) => {
    // Set the state to true when either "Brand" or "Product" item is clicked
    if (itemName === "BRANDS") {
      setShowBrandModal(true);
    } else if (itemName === "PRODUCTS") {
      setShowProductModal(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <img
          className="h-16 w-16"
          src="../../assets/admin-panel/loading.gif"
          alt=""
        />
      </div>
    );
  }

  return (
    <section className="grid grid-cols-5 gap-5 my-10">
      {statData?.map((item, index) => (
        <div
          key={item.id}
          className="ring-1 bg-white rounded-xl shadow-md hover:shadow-2xl p-5 cursor-pointer"
          onClick={() => handleItemClick(item.name)} // Call handleItemClick when clicked
        >
          <div>
            <p className="text-base text-gray-500">{item.name}</p>
            <p className="text-3xl font-semibold">{item.count}</p>
          </div>
        </div>
      ))}

      {/* Conditionally render modals based on showBrandModal and showProductModal states */}
      {showBrandModal && (
        <BrandModal visible={true} onClose={() => setShowBrandModal(false)} />
      )}
      {showProductModal && (
        <ProductModal visible={true} onClose={() => setShowProductModal(false)} />
      )}
    </section>
  );
};

export default Stats;
