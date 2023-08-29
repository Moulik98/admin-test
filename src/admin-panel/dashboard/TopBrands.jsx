import React, { useState, useEffect } from 'react';

const TopBrandsTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/v1/admin/top-brands?page=1&limit=5`);
      const responseData = await response.json();
      const apiData = responseData.topBrands.slice(0, 5);
      setData(apiData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mx-auto p-1 border">
      <h1 className="text-xl font-semibold text-left py-1 pl-2 mb-4">Top Brands</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Brand Name</th>
            <th className="px-4 py-2">Quantity Sold</th>
            <th className="px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-4 py-2">{item.brand_name}</td>
              <td className="px-4 py-2">{item.qty_sold}</td>
              <td className="px-4 py-2">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopBrandsTable;