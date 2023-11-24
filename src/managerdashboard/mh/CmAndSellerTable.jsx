import React, { useState, useEffect, useCallback } from "react";
import getList from "../getList";
import { getToken } from "../../hook/getToken";
import EyeButton from "./EyeButton";
import MergeButton from "./MergeButton";
import { useNavigate } from "react-router-dom";

const CmAndSellerTable = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  useEffect(() => {
    const url = `${process.env.REACT_APP_URL}/v1/mh/get-mm-list`;
    const token = getToken();
    getList(url, token).then((data) => {
      setList(data.marketingManagers);
      console.log(data.marketingManagers)
    });
  }, []);

  const handleClick = useCallback((id) => {
    const url = `/marketing-head-dashboard/associate-brands/${id}`;
    navigate(url);
    console.log("id", id);
  }, []);
  return (
    <div className="relative  overflow-hidden">
      <h4 className="text-left text-xl text-[#383E50] font-medium py-2">
        List of MMs
      </h4>
      <table className="w-full text-left text-xs">
        <thead className="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
          <tr>
            <th scope="col" className="px-4 py-2">
              Sl. NO
            </th>
            <th scope="col" className="px-4 py-2">
              MM Code
            </th>

            <th scope="col" className="px-4 py-2">
              MM Name
            </th>

            <th scope="col" className="px-4 py-2">
              Contact No
            </th>
            <th scope="col" className="px-4 py-2">
              Email
            </th>
            <th scope="col" className="px-4 py-2">
              No of Brands
            </th>
            <th scope="col" className="px-4 py-2">
              No of Products
            </th>

            <th scope="col" className="px-4 py-2">
              Actions (View Details)
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(list) &&
            list?.map((item, index) => {
              const {
                _id,
                name,
                email,
                userName,
                phone,
                brand_count,
                emp_id,
                total_product_count
              } = item;

              return (
                <tr key={_id}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{emp_id}</td>
                  <td className="px-4 py-2">
                    {name} ({userName})
                  </td>
                  <td className="px-4 py-2">{phone}</td>
                  <td className="px-4 py-2">{email}</td>
                  <td className="px-4 py-2">{brand_count}</td>
                  <td className="px-4 py-2">{total_product_count}</td>
                  <td className="px-4 py-2">
                    <div className="flex ">
                      <EyeButton id={_id} onClick={handleClick} />
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

export default CmAndSellerTable;
