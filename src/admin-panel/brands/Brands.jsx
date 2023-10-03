import React, { useState, useEffect } from "react";
import { User } from "../user/User";
import TableRow from "./TableRow";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination"; // Import the Pagination component

export const Brands = () => {
  const [verificationList, SetVerificationList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  async function fetchSellerVerificationList() {
    try {
      const token = localStorage.getItem("access_token");
      const url = `${process.env.REACT_APP_URL}/v1/brand-registration/get-registration-data/admin?page=${currentPage}&limit=${pageSize}`;

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      SetVerificationList(data?.data?.data);
      setTotalItems(data?.data?.totalItems);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSellerVerificationList();
  }, [currentPage, pageSize]); // Update the useEffect dependencies

  const handleRefresh = () => {
    fetchSellerVerificationList();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <section>
        <div className="max-w-6xl mx-auto flex justify-between py-5">
          <p className="text-2xl text-gray-900 font-semibold">Brands Listing</p>
          <div className="flex gap-x-10">
            <form className="flex items-center">
              <div className="flex items-center px-2 py-1 gap-x-1 bg-gray-100 rounded-2xl ">
                <div className=" bg-white rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
                <input
                  className="w-52 py-1 px-1 bg-gray-100 outline-0"
                  type="text"
                />
              </div>
            </form>
            <User />
          </div>
        </div>
      </section>
      <section>
        <div
          className="flex flex-col mt-10 
                    shadow-[0px_0px_16.9227px_rgba(0,0,0,0.1)] rounded-lg"
        >
          <div className="p-5 border-b border-solid border-gray-300">
            <h2 className="text-base font-semibold text-[#143250]">
              Allow Verification To Brand Registration :
            </h2>
          </div>
          <div className="relative overflow-x-auto p-5">
            <table className="w-full text-left text-xs">
              <thead className=" text-xs  uppercase text-gray-900 font-semibold border-b border-solid border-gray-200 ">
                <tr>
                <th scope="col" className=" px-4 py-3">
                    Date
                  </th>
                  <th scope="col" className=" px-4 py-3">
                    Logo
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Brand
                  </th>
                  <th scope="col" className=" px-4 py-3">
                    Registration Details
                  </th>
                  <th scope="col" className=" px-4 py-3">
                    Seller
                  </th>
                  <th scope="col" className=" px-4 py-3">
                    Description
                  </th>
                  <th scope="col" className="text-center px-4 py-3 ">
                    Status
                  </th>
                  <th
                    scope="col"
                    className="text-center px-4
                                        mx-auto py-3"
                  >
                    actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {verificationList.map((item, index) => (
                  <TableRow key={index} data={item} onDelete={handleRefresh} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="flex justify-end items-center py-5">
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          setCurrentPage={handlePageChange} // Use handlePageChange for pagination
        />
      </div>
    </div>
  );
};
