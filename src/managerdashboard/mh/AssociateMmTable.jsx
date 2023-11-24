import React, { useEffect, useState, useCallback } from 'react';
import { format } from 'date-fns';
import MergeButton from './MergeButton';
import EyeButton from './EyeButton';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../hook/getToken';

const AssociateMmTable = ({ cmName, id }) => {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    try {
      // Retrieve the access token from local storage
      const accessToken = getToken();

      const response = await fetch(
        `${process.env.REACT_APP_URL}/v1/category-head/single-cm/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            // Include the access token in the Authorization header
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // Check if 'sellers' property exists in the response
      setApiData(data?.response?.sellers);
      console.log(data?.response?.sellers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = useCallback((id) => {
    const url = `/category-head-dashboard/associate-seller/${id}`;
    console.log('url', url);
    // navigate(url);
  }, []);

  return (
    <div className="relative w-full overflow-x-scroll">
      <table className="w-full overflow-x-scroll text-left text-xs">
        <thead className="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
          <tr>
            <th scope="col" className="px-4 py-2">
              Sl. No
            </th>
            <th scope="col" className="px-4 py-2">
              Full Name
            </th>
            <th scope="col" className="px-4 py-2">
              Onboarding Date
            </th>
            <th scope="col" className="px-4 py-2">
              Approved Brands
            </th>
            <th scope="col" className="px-4 py-2">
              Pending Brands
            </th>
            <th scope="col" className="px-4 py-2">
              Approved Products
            </th>
            <th scope="col" className="px-4 py-2">
              Draft Products
            </th>
            <th scope="col" className="px-4 py-2">
              Seller Status
            </th>
            <th scope="col" className="px-4 py-2">
              Approved Product Content
            </th>
            <th scope="col" className="px-4 py-2">
              Pending Product Content
            </th>
            <th scope="col" className="px-4 py-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(apiData) &&
            apiData?.map((item, index) => {
              const {
                _id,
                fullname,
                onboarding_date,
                approvedBrand,
                pendingBrand,
                approvedProduct,
                draftProduct,
                seller_status,
                approvedProductContent,
                pendingProductContent,
              } = item;

              return (
                <tr key={_id}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{fullname}</td>
                  <td className="px-4 py-2">
                    {format(new Date(onboarding_date), 'yyyy-MM-dd')}
                  </td>
                  <td className="px-4 py-2">{approvedBrand}</td>
                  <td className="px-4 py-2">{pendingBrand}</td>
                  <td className="px-4 py-2">{approvedProduct}</td>
                  <td className="px-4 py-2">{draftProduct}</td>
                  <td className="px-4 py-2">{seller_status}</td>
                  <td className="px-4 py-2">{approvedProductContent}</td>
                  <td className="px-4 py-2">{pendingProductContent}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-x-2 px-4">
                      <EyeButton id={_id} onClick={() => handleClick(_id)} />
                      <MergeButton sellerId={_id} />
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AssociateMmTable;
