import React, { useState, useEffect } from "react";
import format from "date-fns/format";
import getList from "../getList";
import { getToken } from "../../hook/getToken";

const UnAssignMMTable = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const url = `${process.env.REACT_APP_URL}/v1/category-head/off-boarded-seller`;
    const token = getToken();
    getList(url, token).then((data) => {
      setList(data.offboardedseller);
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
              OnBoard Date
            </th>
            <th scope="col" className="px-6 py-2">
              Brand NAme
            </th>
            <th scope="col" className="px-6 py-2">
              Business Type
            </th>
            <th scope="col" className="px-6 py-2">
              PAN
            </th>
            <th scope="col" className="px-6 py-2">
              GSTN
            </th>
            <th scope="col" className="px-6 py-2">
              Contact No
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(list) &&
            list?.map((item, index) => {
              const {
                _id,
                createdAt,
                fullname,
                seller_code,
                sellerType,
                pan_number,
                gst_number,
                phone,
              } = item;
              const date = format(new Date(createdAt), "dd-MM-yyyy");
              return (
                <tr key={_id}>
                  <td className="px-6 py-2">{index + 1}</td>
                  <td className="px-6 py-2">{date}</td>
                  <td className="px-6 py-2">
                    {fullname}({seller_code})
                  </td>
                  <td className="px-6 py-2">{sellerType}</td>
                  <td className="px-6 py-2">{pan_number}</td>
                  <td className="px-6 py-2">{gst_number}</td>
                  <td className="px-6 py-2">{phone}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UnAssignMMTable;
