import React, { useState } from 'react';
import Component from './Component';
import { getToken } from '../../../hook/getToken';
import toast from 'react-hot-toast';

const Hotdeal = () => {
//   const [selectedProducts, setSelectedProducts] = useState([]);
  const accessToken = getToken(); // Replace with your actual access token

  const handleProductSelect = async (selectedProducts) => {
    try {
      if (selectedProducts.length > 0) {
        const response = await fetch(`${process.env.REACT_APP_URL}/v1/cms/add-hot-deals`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
          },
          body: JSON.stringify({
            "head_line": "hot deal",
            "data": selectedProducts,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add hot deals');
        }

        const responseData = await response.json();
        toast.success(responseData.message);
        // console.log(responseData)

        // You can add further logic here based on the response from the add hot deals API
        // console.log('Selected Product IDs:', selectedProducts);
      }
    } catch (error) {
      console.error('Error adding hot deals:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg p-8 rounded-lg">
        <h1 className="text-3xl font-semibold mb-4">Product Search</h1>
        <Component onProductSelect={handleProductSelect} />
      </div>
    </div>
  );
};

export default Hotdeal;
