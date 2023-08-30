import React, { useState, useEffect } from 'react';

const TopBrandsTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem('access_token'); // Replace with your actual access token
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
  
      const response = await fetch(`${process.env.REACT_APP_URL}/v1/admin/top-brands?page=1&limit=5`, {
        headers: headers,
      });
  
      const responseData = await response.json();
      const apiData = responseData.topBrands.slice(0, 5);
      setData(apiData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  return (
    <div className="container mx-auto p-1 border text-sm">
      <h1 className="text-xl font-semibold text-left py-1 pl-2 mb-4">Top Brands</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
            <th className="px-4 py-2 text-left">Brand Name</th>
            <th className="px-4 py-2 text-left">Quantity Sold</th>
            <th className="px-4 py-2 text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-4 py-2 text-left">{item.brand_name}</td>
              <td className="px-4 py-2 text-left">{item.qty_sold}</td>
              <td className="px-4 py-2 text-left">₹{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopBrandsTable;
