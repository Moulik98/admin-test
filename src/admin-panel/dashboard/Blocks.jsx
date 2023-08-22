import React, { useState, useEffect } from "react";

export const Blocks = () => {
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://two1genx.onrender.com/v1/admin/get-product-order-count")
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
        <div className="flex justify-between">
          <div className="pl-8 pr-14 py-4 text-left bg-slate-100 shadow-lg">
            <p className="text-lg">B2C user</p>
            <p className="text-xl font-bold">{orderData.b2c_active_count}</p>
          </div>
          <div className="pl-8 pr-14 py-4 text-left bg-slate-100 shadow-lg">
            <p className="text-lg">Pending Orders</p> <p className="text-xl font-bold">{orderData.total_pending_order}</p>
          </div>
          <div className="pl-8 pr-14 py-4 text-left bg-slate-100 shadow-lg">
            <p className="text-lg">Confirmed Orders</p> <p className="text-xl font-bold">{orderData.total_confirm_order}</p>
          </div>
          <div className="pl-8 pr-14 py-4 text-left bg-slate-100 shadow-lg">
            <p className="text-lg">Cancelled Orders</p> <p className="text-xl font-bold">{orderData.total_cancel_order}</p>
          </div>
          {/* You can add more statistics here */}
        </div>
      )}
    </div>
  );
};
