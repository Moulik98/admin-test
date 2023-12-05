import React, { useState, useEffect } from 'react';
import Component from './Component';
import { getToken } from '../../../hook/getToken';
import toast from 'react-hot-toast';
import Card from './Card';

const Hotdeal = () => {
  const accessToken = getToken(); // Replace with your actual access token
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/v1/cms/get-hot-deal-cms`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProducts(data.productList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
            "data": selectedProducts.map(product => product._id),
          }),
        });
        console.log(JSON.stringify({
          "head_line": "hot deal",
          "data": selectedProducts.map(product => product._id),
        }));

        if (!response.ok) {
          throw new Error('Failed to add hot deals');
        }

        const responseData = await response.json();
        toast.success(responseData.message);
      }
    } catch (error) {
      console.error('Error adding hot deals:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg p-8 rounded-lg">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">Product Search</h1>
        <Component onProductSelect={handleProductSelect} />
      </div>

      <div className="mt-12">
        <p className="text-lg font-semibold text-gray-700 mb-4">Current Hot Deal Products</p>
        <div className="flex flex-wrap justify-center gap-5">
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hotdeal;
