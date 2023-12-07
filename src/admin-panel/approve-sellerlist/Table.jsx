import React from "react";
import Description from "../../Description";

export const Table = ({srNo,product_id,productImage,productName,productDescription,parentCategory,subCategory,childCategory}) => {
  return (
    <tr className="overflow-hidden border-b-2 rounded-b-3xl text-left bg-white transition duration-300 ease-in-out">
      <td className="whitespace-nowrap px-6 py-2 text-xs font-light text-gray-900">
        {srNo}
      </td>
      <td className="whitespace-nowrap px-6 py-2 text-xs font-light text-gray-900">
      <img className="w-8 h-8" src={productImage}/>
      </td>
      <td className=" px-6 py-2 text-xs font-light text-black">
        {productName}
      </td>
      <td className=" px-6 py-2 text-xs font-light  text-gray-900">
        <Description description={productDescription} />
      </td>
      <td className="px-6 py-2 text-xs font-light  text-gray-90">
        {parentCategory}
      </td>
      <td className=" px-6 py-2 text-xs font-light  text-gray-900">
        {subCategory}
      </td>
      <td className=" px-6 py-2 text-xs font-light  text-gray-900">
        {childCategory}
      </td>
    </tr>
  );
};
