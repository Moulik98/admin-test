import React, { useState, useEffect } from 'react';

const TopProdTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/v1/admin/top-products?page=1&limit=5`);
      const responseData = await response.json();
      const apiData = responseData.topProducts;
      setData(apiData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className=''> 
      <h1 className='text-left py-2'>Top Products</h1>
      <table className='border'>
        <thead className='border'>
          <tr>
            <th className='border py-2' >Title</th>
            <th className='px-2 border py-2'>Quantity Sold</th>
            <th className='px-2 border py-2'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className='border px-2'>{item.title}</td>
              <td className='border py-2'>{item.qty_sold}</td>
              <td className='border py-2'>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProdTable;
