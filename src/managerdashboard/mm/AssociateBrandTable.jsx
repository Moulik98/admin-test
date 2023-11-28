import React, { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import MergeButton from "./MergeButton";
import EyeButton from "./EyeButton";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../hook/getToken";

const AssociateBrandTable = ({ cmName, id }) => {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    try {
      // Retrieve the access token from local storage
      const accessToken = getToken();

      const response = await fetch(
        `${process.env.REACT_APP_URL}/v1/mm/get-products/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            // Include the access token in the Authorization header
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(id);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // Check if 'sellers' property exists in the response
      setApiData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = useCallback((id) => {
    const url = `/category-head-dashboard/associate-seller/${id}`;
    console.log("url", url);
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
              Product Name
            </th>
            <th scope="col" className="px-4 py-2">
              Category
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
                item_name,
                onboarding_date,
                parent_category_name,
                sub_category_name,
                child_category_name,
              } = item;

              return (
                <tr key={_id}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item_name}</td>

                  <td className="px-4 py-2">
                    {parent_category_name} - {sub_category_name} -{" "}
                    {child_category_name}
                  </td>
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

export default AssociateBrandTable;
