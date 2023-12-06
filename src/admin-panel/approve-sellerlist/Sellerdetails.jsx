import React, { useState, useEffect } from "react";
import { Table } from "./Table";
import { useParams } from "react-router-dom";

const Sellerdetails = () => {
  const [data, setData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    // Fetch data from the API
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
  }, [id]); // Add 'id' as a dependency to useEffect

  return (
    <div className="pr-6 py-10 text-sm font-semibold">
      <div>
        <div className="flex items-center gap-2 py-3">
          <a href="/seller/sellerlist">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
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
          <p className="text-2xl">Seller Details</p>
        </div>
      </div>

      <div className="flex gap-10 py-5 text-sm text-base ">
        <div>
          <img />
        </div>
        <div className="flex flex-col items-start">
          <p>Seller ID# : {data?.seller_id} </p>
          <p>Store Name : {data?.store_name} </p>
          <p>Full Name : {data?.fullname}</p>
          <p>Email : {data?.email}</p>
          <p>GST Number : {data?.gst_number}</p>
          <p>Pan Number : {data?.pan_number} </p>
          <p>Shop Address : {data?.sellerAddress}</p>
        </div>
        <div className="flex flex-col items-start capitalize">
          <p>Total Products : {data?.productCount}</p>
          <p>Joined : {data?.joinedDuration}</p>
          <p>CM Name : {data?.cm_name}</p>
          <p>seller type : {data?.sellerType}</p>
          <p>seller code : {data?.seller_code}</p>
          <button className=" rounded" disabled={!data?.isVerify}>
            Seller Status:{" "}
            <span
              className={`bg-${
                data?.isVerify ? "green" : "gray"
              }-500 px-1 rounded-sm`}
            >
              {data?.isVerify ? "Verified" : "Pending"}
            </span>
          </button>
        </div>
      </div>

      <table className="border border-1">
        <thead className=" border border-b-[2px] py-6 text-xs  text-xs  uppercase text-gray-900 font-semibold border-b border-solid border-gray-200 ">
          <tr className="font-normal">
            <th>sl no</th>
            <th>product image</th>
            <th>product name</th>
            <th>product description</th>
            <th>parent category</th>
            <th>sub ctaegory</th>
            <th>child category</th>
          </tr>
        </thead>
        <tbody>
          {data.productData &&
            data.productData.map((e, index) => (
              <Table
                key={e?._id}
                id={e?._id}
                srNo={index + 1}
                productImage={e?.main_img} // Updated property name
                productName={e?.item_name}
                productDescription={e?.product_description} // Updated property name
                parentCategory={e?.parentCategoryName} // Updated property name
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
