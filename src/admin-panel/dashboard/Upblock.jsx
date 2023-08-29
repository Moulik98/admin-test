import React, { useState, useEffect } from "react";

export const Upblock = () => {
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/v1/admin/get-product-order-count`)
      .then((response) => response.json())
      .then((data) => {
        setOrderData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {orderData && (
        <div className="flex space-x-4">
          <div className="flex-1 pl-8 pr-14 py-4 text-left bg-orange-200 shadow-lg">
            <p className="text-lg">Total Products</p>
            <p className="text-xl font-bold">{orderData.product_count}</p>
          </div>
          <div className="flex-1 pl-8 pr-14 py-4 text-left bg-blue-200 shadow-lg">
            <p className="text-lg">Total Orders</p> <p className="text-xl font-bold">{orderData.total_orders}</p>
          </div>
          <div className="flex-1 pl-8 pr-14 py-4 text-left bg-green-200 shadow-lg">
            <p className="text-lg">Total Users</p> <p className="text-xl font-bold">{orderData.total_active_count}</p>
          </div>
          <div className="flex-1 pl-8 pr-14 py-4 text-left bg-gray-200 shadow-lg">
            <p className="text-lg">Total Sales</p> <p className="text-xl font-bold">{orderData.total_sales_amount}</p>
          </div>
          {/* You can add more statistics here */}
        </div>
      )}
    </div>
  );
};
