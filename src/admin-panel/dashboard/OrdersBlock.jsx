import React, { useState, useEffect } from 'react';

export const OrderBlock = () => {
  const [OrderCount, setOrderCount] = useState(0);

  useEffect(() => {

    // Fetch data for user count from another API endpoint
    fetch(`${process.env.REACT_APP_URL}/v1/admin/get-product-order-count`)
      .then(response => response.json())
      .then(data => {
        // Set the user count from the API response
        setOrderCount(data.total_orders);
      })
      .catch(error => {
        console.error('Error fetching user count:', error);
      });
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className='w-1/5 bg-[#e8fcfb] p-6 rounded-lg'>
      <div>
        <p className='text-xl text-left pb-2'>Total Orders</p>
        <p className='text-2xl text-left font-bold'>{OrderCount}</p>
      </div>
    </div>
  );
};
