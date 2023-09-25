import React, { useState, useEffect } from "react";
import SubCategoriesRow from "./SubCategoriesRow";
import SubCategoriesModal from "./SubModal";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
const SubCategories = () => {
  // state for modal
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const [childModal, setChildModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropDown] = useState(false);
  // For Closing Modal
  const handleClose = () => {
    setChildModal(false);
  };
  let [childCategories, setChildCategories] = useState([]);

  const subData = async() => {
    const response = await fetch(`${process.env.REACT_APP_URL}/v1/categories/get-populated?filter[category_type][$eq]=sub&page=${currentPage}&limit=${pageSize}&sort=-createdAt`)
    if(response.ok){
      const data = await response.json();
      setChildCategories(data.categoryList);
      setData(data.categoryList);
      setTotalItems(data.totalCount)
      console.log(data.categoryList);
    }
  }
  useEffect(() => {
    subData();
  }, [SubCategoriesModal, currentPage, pageSize]);



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
         await subData();
      } else {
        // Fetch data based on the search query
        const response = await fetch(
          `${process.env.REACT_APP_URL}/v1/categories/category-search?search=${searchQuery}&category_type=sub`
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
      const response = await fetch (`${process.env.REACT_APP_URL}/v1/categories/get?filter[category_type][$eq]=sub&filter[_id][$eq]=${categoryId}`);
      if(response.ok){
        const data = await response.json();
        setChildCategories(data.categoryList);
        setShowDropDown(false);
      }
    }catch (error){
      console.error("Error fetching data")
    }
  }
  return (
    <div className="pr-6 py-10 text-xs font-semibold">
      {childModal && (
        <SubCategoriesModal visible={childModal} onClose={handleClose} />
      )}
      <div>
        <div className="flex items-center py-3">
          <a href="/category">
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
          <p className="text-2xl">Sub Categories</p>
        </div>
        <div className="flex px-4 text-[#0056fe] text-xs">
          Categories &gt; Sub Categories
        </div>
      </div>
      <div className="flex justify-end">
          <div className="flex flex-col">
            <div onClick={() => setChildModal(true)} className="flex items-center">
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
              <p className="text-xs">Add New Sub Category</p>
            </div>
          </div>
        </div>
    
        <div className="max-w-5xl mx-auto flex justify-end items-center my-4 relative">
        <form className="flex items-center">
          <label className="mr-2">Sub Categories</label>
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
                placeholder="Search categories"
                onChange={handleInputChange}
                type="text"
              />
            </div>
            {/* Dropdown */}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-[100%] left-0 w-full mt-1  bg-white border border-solid border-[#9D9D9D] rounded-lg shadow-md">
                <ul>
                  {searchResults.map((result) => (
                         <li
                         key={result._id}
                        onClick={() => {
                            handleClick(result._id)

                        }}
                       
                         // Apply the highlighted-item class based on hover state
                         className='p-2 hover:bg-gray-300 font-light text-xs'
                       >{result?.category_name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </form>
      </div>
      

      <section>
        <div className="max-w-5xl mx-auto overflow-hidden rounded-t-xl my-5">
          <table className="table min-w-full border  border-solid">
            <thead className="bg-[#e5f2f4]">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Sl no.
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                 Image
                </th>

                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Sub Category
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Parent Category
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Category ID
                </th>

                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {childCategories &&
                childCategories.map((categories, index) => (
                  <SubCategoriesRow
                    id={categories._id}
                    key={categories._id}
                    srNo={index + 1}
                    img={categories.category_img}
                    parent={categories?.category_name}
                    sub={categories.parent_category_id?.category_name}
                    categoriesId={categories.category_slug}
                    desc={categories.category_desc}
                    status={categories.status}
                  />
                ))}
            </tbody>
          </table>
        </div>
        <div className='flex justify-end items-center py-5'>
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </section>
      {childModal && (
        <SubCategoriesModal visible={childModal} onClose={handleClose} />
      )}
    </div>
  );
};

export default SubCategories;
