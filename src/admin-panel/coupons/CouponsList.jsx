import React, { useEffect, useState } from "react";
import CouponsTableRow from "./CouponsTableRow";

const CouponsList = (props) => {
  const { handleClick } = props;
  const [data, setData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const handleEdit = (id, type) => {
    if (type === "edit") {
      handleClick(id);
      console.log(type);
    } else if (type === "delete") {
      setIsClicked((preValue) => !preValue);
      console.log(type);
    } else if (type === "status") {
      setIsClicked((preValue) => !preValue);
    }
    // console.log(id)
  };

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  // Add a new state for search results
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropDown] = useState(false);

  useEffect(() => {
    couponData();
  }, [currentPage, pageSize, isClicked]);

  const couponData = async () => {
    // Perform an API call to retrieve paginated data
    // Adjust the API endpoint and parameters as per your application's needs
    const response = await fetch(
      `${process.env.REACT_APP_URL}/v1/coupon/get-coupon?page=${currentPage}&limit=${pageSize}`
    );
    const data = await response.json();
    console.log(data);
    setItems(data?.data);
    setTotalItems(data?.data?.count);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
          await couponData();
        } else {
          // Fetch data based on the search query
          const response = await fetch(
            `${process.env.REACT_APP_URL}/v1/coupon/search?query=${searchQuery}`
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

  const handleSelect = async (couponId, coupon_code) => {
    try {
      console.log(couponId);
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `${process.env.REACT_APP_URL}/v1/coupon/get-coupon/${couponId}`,
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
  
        setItems([dataObject]); // Wrap the object in an array if needed
        setShowDropDown(false);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(totalItems / pageSize);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(totalItems / pageSize);
    const pageNumbers = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );

    return (
      <div className="flex justify-end">
        <div className="flex items-center border border-solid border-[#EEEEEE] rounded-md ">
          {pageNumbers.length ? (
            <button
              className="flex justify-center items-center w-9 h-9 border-r border-solid border-[#EEEEEE]"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          ) : null}

          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`flex justify-center items-center w-9 h-9 border-r border-solid border-[#EEEEEE]  ${
                page === currentPage
                  ? "bg-[#4285F4] text-white"
                  : "text-[#222222]"
              }`}
              onClick={() => handlePageChange(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          ))}

          {pageNumbers.length ? (
            <button
              className="flex justify-center items-center w-9 h-9 border-r border-solid border-[#EEEEEE]"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    );
  };

  console.log(data);
  return (
    <section>
      <div className="flex justify-between py-5">
        <div className="text-base text-gray-700 font-normal">
          {` Showing 1 to ${items.length} of ${totalItems} results`}
        </div>
        <div className="flex gap-10">
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
                //   value={searchTerm}
                onChange={(event) => {
                    handleInputChange(event);
                  }}
                type="text"
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
                              handleSelect(result._id, result.coupon_code);
                            }}
                            className="p-2 hover:bg-gray-300 font-light text-xs"
                          >
                            {result?.coupon_code}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
            </div>
          </form>
          <div
          onClick={() => handleClick()}
          className="text-base text-gray-700 font-normal cursor-pointer"
        >
          <span className="text-xl font-bold">+</span> Add New
        </div>
        </div>
      
      </div>

      {/* // Table Section */}

      <div class="relative overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-white text-xs font-bold border-b border-solid border-gray-200 text-gray-900">
            <tr>
              <th scope="col" class="px-6 py-3 text-xs">
                Code
              </th>
              <th scope="col" class="px-6 py-3 text-xs">
                Type
              </th>
              <th scope="col" class="px-6 py-3 text-xs">
                Description
              </th>
              <th scope="col" class="px-6 py-3 text-xs">
                Amount
              </th>
              <th scope="col" class="px-6 py-3 text-xs">
                Used
              </th>
              <th scope="col" class="px-6 py-3 text-xs">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-xs">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <CouponsTableRow
                key={index}
                id={item._id}
                code={item.coupon_code}
                type={item.discount_type}
                amount={item.discount}
                description={item.description}
                isActive={item.isActive}
                used={item.Used}
                discount_type={item.discount_type}
                handleEdit={handleEdit}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="py-5">{renderPagination()}</div>
    </section>
  );
};

export default CouponsList;
