import React, { useState, useEffect } from 'react';

export const UserBlock = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Fetch data for user count from another API endpoint
    fetch(`${process.env.REACT_APP_URL}/v1/admin/get-product-order-count`)
      .then(response => response.json())
      .then(data => {
        // Set the user count from the API response
        setUserCount(data?.total_active_count);
      })
      .catch(error => {
        console.error('Error fetching user count:', error);
      });
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className='w-1/2 bg-[#feedec] p-6 rounded-lg'>
      
      <div>
        <p className='text-xl text-left pb-2'>Total Users</p>
        <p className='text-2xl text-left font-bold'>{userCount}</p>
      </div>
    </div>
  );
};
