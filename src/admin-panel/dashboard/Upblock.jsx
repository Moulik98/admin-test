import React, { useState, useEffect } from "react";

export const Upblock = () => {
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      let access_token = localStorage.getItem("access_token");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/v1/admin/get-product-order-count`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`, // Replace with your actual access token
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setOrderData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {orderData && (
        <div className="flex space-x-4">
          <div className="flex-1 pl-8 pr-14 py-4 text-left bg-pink-100 border border-blue-200 rounded-md hover:shadow-2xl shadow-lg">
            <p className="text-lg">Products</p>
            <p className="text-xl font-bold">{orderData?.product_count}</p>
          </div>
          <div className="flex-1 pl-8 pr-14 py-4 text-left bg-green-100 border border-blue-200 rounded-md hover:shadow-2xl shadow-lg">
            <p className="text-lg">Orders</p>{" "}
            <p className="text-xl font-bold">{orderData?.total_orders}</p>
          </div>
          <div className="flex-1 pl-8 pr-14 py-4 text-left bg-yellow-100 border border-blue-200 rounded-md hover:shadow-2xl shadow-lg">
            <p className="text-lg">Customers</p>{" "}
            <p className="text-xl font-bold">{orderData?.total_active_count}</p>
          </div>
          <div className="flex-1 pl-8 pr-14 py-4 text-left bg-teal-100 border border-blue-200 rounded-md hover:shadow-2xl shadow-lg">
            <p className="text-lg">Sales</p>
            <div className="flex justify-between gap-2 items-end">
              <p className="text-xl font-bold">
              ₹{orderData?.total_sales_amount}
              </p>
              <img src="../assets/admin-panel/graph.svg" alt="" />
            </div>
          </div>
          {/* You can add more statistics here */}
        </div>
      )}
    </div>
  );
};
