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
    <div className="container mx-auto pb-8 p-1 border text-sm">
      <h1 className="text-xl font-semibold mb-4 py-1 pl-2 text-left">Best Selling Products</h1>
      <table className="w-full">
        <thead>
          <tr className='bg-gray-100 text-xs font-medium uppercase text-[#666666]'>
          <th className=" px-2 py-2 text-left"></th>
            <th className=" px-2 py-2 text-left">Title</th>
            <th className=" px-2 py-2 text-left">In stocks</th>
            <th className=" px-2 py-2 text-left">Qty sold</th>
            <th className=" px-2 py-2 text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className=" px-2 py-2 text-left w-16 h-16 shrink-0"><img className='w-full h-full' src={item?.image} alt=''/></td>
              <td className=" px-2 py-2 text-left flex-wrap">{item?.title}</td>
              <td className=" px-2 py-2 text-left">{item?.qty_available}</td>
              <td className=" px-2 py-2 text-left">{item?.qty_sold}</td>
              <td className=" px-2 py-2 text-left">₹{item?.sold_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProdTable;
