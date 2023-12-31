import React, { useState, useEffect } from "react";
import format from "date-fns/format";
import getList from "../getList";
import { getToken } from "../../hook/getToken";

const UnAssignMMTable = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const url = `${process.env.REACT_APP_URL}/v1/mh/get-ofboard-brands`;
    const token = getToken();
    getList(url, token).then((data) => {
      setList(data.brands);
    });
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-[#383E50] font-semibold leading-10 text-left">
        List of unassign Brands
      </h1>
      <table className="w-full text-left text-xs">
        <thead className="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
          <tr>
            <th scope="col" className="px-6 py-2">
              SL. No
            </th>
            <th scope="col" className="px-6 py-2">
              Brand Name
            </th>
            <th scope="col" className="px-6 py-2">
              Brand Logo
            </th>
            <th scope="col" className="px-6 py-2">
              Product Count
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(list) &&
            list?.map((item, index) => {
              const { _id, brand_name, brand_logo_url, product_count } = item;
              return (
                <tr key={_id}>
                  <td className="px-6 py-2">{index + 1}</td>
                  <td className="px-6 py-2">{brand_name}</td>
                  <td className="px-6 py-2">
                    <img src={brand_logo_url} alt={`${brand_name} Logo`} className="w-8 h-8"/>
                  </td>
                  <td className="px-6 py-2">{product_count}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UnAssignMMTable;
