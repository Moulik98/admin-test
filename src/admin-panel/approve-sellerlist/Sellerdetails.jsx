
import React, { useState, useEffect } from "react";
import { Table } from "./Table";
import { useParams } from "react-router-dom";

const Sellerdetails = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/v1/verifySeller/getSingleApprovedData/${id}`
        );

        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container mx-auto px-6 py-10 text-sm bg-gray-100 rounded-md">
      <div>
        <div className="flex items-center gap-2 py-3">
          <a href="/seller/sellerlist" className="text-indigo-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </a>
          <p className="text-2xl text-gray-800">Seller Details</p>
        </div>
      </div>

      <div className="flex gap-10 py-5 text-sm text-base">
        <div className="flex flex-col items-start">
          <p className="text-gray-800">Seller ID# : {data?.seller_id} </p>
          <p className="text-gray-800">Store Name : {data?.store_name} </p>
          <p>Full Name : {data?.fullname}</p>
          <p>Email : {data?.email}</p>
          <p>GST Number : {data?.gst_number}</p>
          <p>Pan Number : {data?.pan_number} </p>
          <p>Shop Address : {data?.sellerAddress}</p>
        </div>
        <div className="flex flex-col items-start capitalize">
          <p className="text-gray-800">Total Products : {data?.productCount}</p>
          <p className="text-gray-800">Onboarded: {data?.joinedDuration}</p>
          <p className="text-gray-800">CM Name : {data?.cm_name}</p>
          <p>seller type : {data?.sellerType}</p>
          <p>seller code : {data?.seller_code}</p>
          <p>seller Contact No : {data?.phone}</p>
          <button
            className={`rounded ${
              data?.isVerify ? "bg-green-500" : "bg-gray-500"
            } px-3 py-1 text-white`}
            disabled={!data?.isVerify}
          >
            Seller Status:{" "}
            <span className="px-1 rounded-sm">
              {data?.isVerify ? "Verified" : "Pending"}
            </span>
          </button>
        </div>
      </div>

      <table className="border border-1 w-full bg-white rounded-md overflow-hidden">
        <thead className="border-b-2 py-6 text-xs uppercase text-gray-900 font-semibold border-solid border-gray-200 ">
          <tr className="font-normal">
            <th className="p-2">sl no</th>
            <th className="p-2">product image</th>
            <th className="p-2">product name</th>
            <th className="p-2">product description</th>
            <th className="p-2">parent category</th>
            <th className="p-2">sub category</th>
            <th className="p-2">child category</th>
          </tr>
        </thead>
        <tbody>
          {data.productData &&
            data.productData.map((e, index) => (
              <Table
                key={e?._id}
                id={e?._id}
                srNo={index + 1}
                productImage={e?.main_img}
                productName={e?.item_name}
                productDescription={e?.product_description}
                parentCategory={e?.parentCategoryName}
                subCategory={e?.subCategoryName}
                childCategory={e?.childCategoryName}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sellerdetails;
