import React, { useState, useEffect } from 'react';

const UserTable = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const accessToken = localStorage.getItem('access_token'); // Replace with your actual access token
        const response = await fetch(`${process.env.REACT_APP_URL}/v1/admin/get-top-user?page=1&limit=5`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        
        if (data.success) {
          setTopUsers(data.topUsers.slice(0,5));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='container mx-auto p-4 border border-gray-300 text-sm'>
      <h2 className='text-xl text-left font-semibold mb-4'>Top Customers</h2>
      <table className='w-full'>
        <thead>
          <tr className='bg-gray-100 text-xs font-medium text-center uppercase text-[#666666]'>
            <th className='py-2 px-4 '></th>
            <th className='py-2 px-4 '>Name & Address</th>
            <th className='py-2 px-4 '> Amount</th>
          </tr>
        </thead>
        <tbody>
          {topUsers.map(user => (
            <tr key={user._id} className='shadow-sm  space-y-5'>
              <td className='py-4 px-4'>
                <div className='flex justify-center'><img src={user.avatar} alt={`${user.customerName}'s Avatar`} className='rounded-full w-10 h-10' /></div>
              </td>
              <td className='py-4 px-4'>
                <p className='font-semibold'>{user.customerName}</p>
                <p className='text-gray-600'>{user.shippingAddress}</p>
              </td>
              <td className='py-4 px-4'>₹{user.totalOrderAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
