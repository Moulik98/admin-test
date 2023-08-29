import React, { useState, useEffect } from "react";

export const Blocks = () => {
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token'); // Replace with your actual access token
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
  
        const response = await fetch(`${process.env.REACT_APP_URL}/v1/admin/get-product-order-count`, {
          headers: headers,
        });
  
        const data = await response.json();
        setOrderData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {orderData && (
        <div className="flex space-x-4">
          <div className="flex-1 pl-8 pr-14 py-4 text-left bg-blue-200 shadow-lg">
            <p className="text-lg">B2C user</p>
            <p className="text-xl font-bold">{orderData.b2c_active_count}</p>
          </div>
          <div className="flex-1 pl-8 pr-14 py-4 text-left bg-green-200 shadow-lg">
            <p className="text-lg">Pending Orders</p> <p className="text-xl font-bold">{orderData.total_pending_order}</p>
          </div>
          <div className="flex-1 pl-8 pr-14 py-4 text-left bg-yellow-200 shadow-lg">
            <p className="text-lg">Confirmed Orders</p> <p className="text-xl font-bold">{orderData.total_confirm_order}</p>
          </div>
          <div className="flex-1 pl-8 pr-14 py-4 text-left bg-red-200 shadow-lg">
            <p className="text-lg">Cancelled Orders</p> <p className="text-xl font-bold">{orderData.total_cancel_order}</p>
          </div>
          {/* You can add more statistics here */}
        </div>
      )}
    </div>
  );
};
