import React, { useState, useEffect } from 'react';

const TopProdTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let access_token = localStorage.getItem('access_token')
    try {
      const headers = {
        Authorization: `Bearer ${access_token}`,
      };
  
      const response = await fetch(`${process.env.REACT_APP_URL}/v1/admin/top-products?page=1&limit=5`, {
        headers: headers,
      });
  
      const responseData = await response.json();
      const apiData = responseData.topProducts;
      setData(apiData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  return (
    <div className="container mx-auto pb-8 p-1 border">
      <h1 className="text-xl font-semibold mb-4 py-1 pl-2 text-left">Best Selling Products</h1>
      <table className="w-full">
        <thead>
          <tr className='bg-gray-100'>
          <th className=" px-2 py-2"></th>
            <th className=" px-2 py-2">Title</th>
            <th className=" px-2 py-2">Quantity Sold</th>
            <th className=" px-2 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className=" px-2 py-2"><img className='w-12 h-12 shrink-0' src={item.image} alt=''/></td>
              <td className=" px-4 py-2 flex-wrap">{item.title}</td>
              <td className=" px-2 py-2">{item.qty_sold}</td>
              <td className=" px-2 py-2">{item.sold_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProdTable;
