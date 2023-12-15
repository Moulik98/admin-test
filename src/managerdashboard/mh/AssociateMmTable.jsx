import React, { useCallback } from "react";
import EyeButton from "./EyeButton";
import { useNavigate } from "react-router-dom";

const AssociateMmTable = ({ cmName, id, list }) => {
  const navigate = useNavigate();

  const handleClick = useCallback((id) => {
    const url = `/marketing-head-dashboard/associate-brands/products/${id}`;
    navigate(url);
  }, []);

  return (
    <div className="relative w-full overflow-x-scroll">
      {Array.isArray(list) && list.length > 0 ? (
        <table className="w-full overflow-x-scroll text-left text-xs">
          <thead className="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
            <tr>
              <th scope="col" className="px-4 py-2">
                Sl. No
              </th>
              <th scope="col" className="px-4 py-2">
                Brand Title
              </th>
              <th scope="col" className="px-4 py-2">
                MM Name (ID)
              </th>
              <th scope="col" className="px-4 py-2">
                No: Product
              </th>
              <th scope="col" className="px-4 py-2">
                Action (view)
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((brand, brandIndex) => {
              const { _id, brand_name, cm_data, product_count } = brand;

              return (
                <tr key={_id}>
                  <td className="px-4 py-2">{brandIndex + 1}</td>
                  <td className="px-4 py-2">{brand_name}</td>
                  <td className="px-4 py-2">
                    {cm_data?.name} ({cm_data?.emp_id})
                  </td>
                  <td className="px-4 py-2">{product_count}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-x-2 px-4">
                      <EyeButton id={_id} onClick={() => handleClick(_id)} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No brands available</p>
      )}
    </div>
  );
};

export default AssociateMmTable;
