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
  // Add a new state for search results
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropDown] = useState(false);

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

  console.log("Brand List >>>", verificationList);

  const handleRefresh = () => {
    fetchSellerVerificationList();
  };

  // Handle change in search
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value === "") {
      setShowDropDown(false);
    } else {
      setShowDropDown(true);
    }
  };

  useEffect(() => {
    // Define a function to fetch data from the API
    const fetchData = async () => {
      try {
        // If the searchQuery is empty, fetch all data
        if (!searchQuery) {
          await fetchSellerVerificationList();
        } else {
          // Fetch data based on the search query
          const response = await fetch(
            `${process.env.REACT_APP_URL}/v1/brand-registration/searchSuggetion?query=${searchQuery}`
          );

          if (response.ok) {
            const data = await response.json();

            // Assuming the API returns an array of category objects
            setSearchResults(data);
            console.log("Search Results>>>", searchResults);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when searchQuery changes
    fetchData();
  }, [searchQuery, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClick = async (brandId, brand_name) => {
    try {
      console.log(brandId);
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `${process.env.REACT_APP_URL}/v1/brand-registration/get-registration-data/admin/${brandId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Data >>", data);

        // Ensure that data is an object
        const dataObject = data?.data || {};

        // Log the entire data object
        console.log("Data Object >>", dataObject);

        SetVerificationList([dataObject]); // Wrap the object in an array if needed
        setShowDropDown(false);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <div className="pr-5">
      <section>
        <div className="max-w-6xl mx-auto flex justify-between py-5">
          <p className="text-2xl text-gray-900 font-semibold">Brands Listing</p>
          <div className="flex gap-x-10">

            <User />
          </div>
        </div>
      </section>
      <div className="max-w-6xl mx-auto flex justify-end items-center">
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
              onChange={(event) => {
                handleInputChange(event);
              }}
            />
            {/* Dropdown */}
            {showDropdown && searchResults.length > 0 && (
              <div className="relative">
                <div className="z-10 absolute top-full max-h-60 -left-60 w-60 mt-6 bg-white border border-solid border-[#9D9D9D] rounded-md shadow-md overflow-y-scroll search-scrollbar">
                  <ul>
                    {searchResults.map((result) => (
                      <li
                        key={result._id}
                        onClick={() => {
                          handleClick(result._id, result.brand_name);
                        }}
                        className="p-2 hover:bg-gray-300 font-light text-xs"
                      >
                        {result?.brand_name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
      <section>
        <div
          className="max-w-[76rem] flex flex-col mt-10 
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
                    CM
                  </th>
                  <th scope="col" className=" px-4 py-3">
                    MM
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
