import React, { useState, useEffect } from 'react';

export const ProductBlock = () => {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    // Fetch data from the API
    fetch(`${process.env.REACT_APP_URL}/v1/admin/get-product-order-count`)
      .then(response => response.json())
      .then(data => {
        // Set the product count from the API response
        setProductCount(data.product_count);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className='w-1/2 bg-[#fff7db] p-6 rounded-lg'>
      <p className='text-xl text-left pb-2'>Total Products</p>
      <p className='text-2xl text-left font-bold'>{productCount}</p>
    </div>
  );
};
