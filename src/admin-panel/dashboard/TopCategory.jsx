import React, { useState, useEffect } from 'react';

const TopCategoriesTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/v1/admin/top-categories?page=1&limit=5`);
      const responseData = await response.json();
      const apiData = responseData.topCategories.slice(0,5);
      setData(apiData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1 className="text-left p-2 bg-slate-200">Top Categories</h1>
      <table className="w-full border-collapse border ">
        <thead>
          <tr>
            <th className="border  px-4 py-2">Category Name</th>
            <th className="border  px-4 py-2">Quantity Sold</th>
            <th className="border  px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="border  px-4 py-2">{item.category_name}</td>
              <td className="border  px-4 py-2">{item.qty_sold}</td>
              <td className="border  px-4 py-2">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopCategoriesTable;
