import React, { useState, useEffect } from "react";
import CategoriesRow from "./ParentCategoriesRow";
import { ParentModal } from "./ParentModal";
import getParentList from "./FetchApi";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";

const ParentCategories = () => {
  // State for parent categories list
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [parentCategories, setParentCategories] = useState([]);
  const [parentModal, setParentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropDown] = useState(false);
  // getting parent list data
  async function parentData() {
    const url = `${process.env.REACT_APP_URL}/v1/categories/get?filter[category_type][$eq]=parent&page=${currentPage}&limit=${pageSize}&sort=-createdAt`;
    const parentCategories = await getParentList(url);
    setParentCategories(parentCategories.categoryList);
    setTotalItems(parentCategories.totalCount);
  }
  useEffect(() => {
    parentData();
  }, [parentModal, currentPage, pageSize]);
  // For Closing Modal
  const handleClose = () => {
    setParentModal(false);
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

// Parent Category Search
useEffect(() => {
  // Define a function to fetch data from the API
  const fetchData = async () => {
    try {
      // If the searchQuery is empty, fetch all data
      if (!searchQuery) {
         await parentData();
      } else {
        // Fetch data based on the search query
        const response = await fetch(
          `${process.env.REACT_APP_URL}/v1/categories/category-search?search=${searchQuery}&category_type[]=parent`
        );

        if (response.ok) {
          const data = await response.json();

          // Assuming the API returns an array of category objects
          setSearchResults(data.response);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Call the fetchData function when searchQuery changes
  fetchData();
}, [searchQuery, currentPage, pageSize]);


  const handleClick = async(categoryId) => {
    try {
      const response = await fetch (`${process.env.REACT_APP_URL}/v1/categories/get?filter[category_type][$eq]=parent&filter[_id][$eq]=${categoryId}`);
      if(response.ok){
        const data = await response.json();
        setParentCategories(data.categoryList);
        setShowDropDown(false);
      }
    }catch (error){
      console.error("Error fetching data")
    }
  }

  return (
    <div className="pr-6 py-10 text-sm font-semibold">
      <div>
        <div className="flex items-center py-3">
          <Link to="/category">
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
          </Link>
          <p className="text-2xl">Parent Categories</p>
        </div>
        <div className="flex text-xs px-6 text-[#0056fe]">
          Categories &gt; Parent Categories
        </div>
      </div>
    
      <div className="max-w-6xl mx-auto flex justify-between  my-4 relative">
      <div className="flex justify-end my-4 ">
        <div className="flex flex-col">
          <div
            onClick={() => setParentModal(true)}
            className="flex items-center "
          >
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
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-xs">Add New Parent Category</p>
          </div>
        </div>
      </div>
        <form className="flex items-center">
          <label className="mr-2">Parent Categories</label>
          <div className="flex flex-col relative">
            <div className="flex items-center p-1 gap-x-1 rounded-lg border border-solid border-[#9D9D9D]">
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
              <input
                className="py-1 px-1 outline-0"
                value={searchQuery}
                placeholder="Search parent categories"
                onChange={handleInputChange}
                type="text"
              />
            </div>
            {/* Dropdown */}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute max-h-60 top-[100%] left-0 w-full mt-1  bg-white border border-solid border-[#9D9D9D] rounded-md overflow-y-scroll search-scrollbar shadow-md">
                <ul>
                  {searchResults.map((result) => (
                         <li
                         key={result._id}
                        onClick={() => {
                            handleClick(result._id)

                        }}
                       
                         // Apply the highlighted-item class based on hover state
                         className='p-2 hover:bg-gray-300 font-light text-xs'
                       >{result.category_name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>
      </div>
      <section>
        <div className="max-w-6xl mx-auto overflow-hidden rounded-t-xl my-5">
          <table className="table min-w-full border  border-solid">
            <thead className="bg-[#e5f2f4]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Sl no.
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Image
                </th>
           
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Parent Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Description
                </th>

                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {parentCategories &&
                parentCategories.map((categories, index) => (
                  <CategoriesRow
                    key={categories._id}
                    id={categories._id}
                    srNo={index + 1}
                    img={categories?.category_img}
                    parentName={categories.category_name}
                    description={categories.category_desc}
                    status={categories.status}
                  />
                ))}
            </tbody>
          </table>
          {parentCategories.length === 0 ? (
            <div className="w-full  flex justify-center items-center ">
              <p className=" text-3xl font-bold text-gray-400">
                No record available
              </p>
            </div>
          ) : null}
        </div>
        <div className="flex justify-end items-center py-5">
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </section>
      {parentModal && (
        <ParentModal visible={parentModal} onClose={handleClose} />
      )}
    </div>
  );
};
export default ParentCategories;
