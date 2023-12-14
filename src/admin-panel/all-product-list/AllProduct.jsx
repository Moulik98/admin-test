import React, { useState, useEffect, useRef } from "react";
import AllProductRow from "./AllProductRow";
import "./products.css";
import { User } from "../user/User";
import Pagination from "../../Pagination";
const AllProduct = () => {
  // const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const [products, setProducts] = useState([]);
  const parentListRef = useRef(null);
  const subCategoryListRef = useRef(null);
  const childCatListRef = useRef(null);
  const countryRef = useRef(null);
  const sellerRef = useRef(null);
  const awardRef = useRef(null);
  const approvalRef = useRef(null);
  const reviewRef = useRef(null);
  const [sellerName, setSellerName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [awardsName, setAwardsName] = useState("");
  const [approval, setApproval] = useState("");
  const [review, setReview] = useState("");
  const [parent, setParent] = useState("");
  const [sub, setSub] = useState("");
  const [child, setChild] = useState("");
  // const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSellerChange = (event) => {
    setSellerName(event.target.value); // Update the state with the new value
  };
  console.log(sellerName);

  const handleCountryChange = (event) => {
    setCountryName(event.target.value); // Update the state with the new value
  };
  console.log(countryName);

  const handleAwardsChange = (event) => {
    setAwardsName(event.target.value); // Update the state with the new value
  };
  console.log(awardsName);

  const handleApprovalChange = (event) => {
    setApproval(event.target.value); // Update the state with the new value
  };
  console.log(approval);

  const handleReviewChange = (event) => {
    setReview(event.target.value); // Update the state with the new value
  };
  console.log(review);

  const handleParentChange = (event) => {
    setParent(event.target.value); // Update the state with the new value
  };
  console.log(parent);


  const handleSubChange = (event) => {
    setSub(event.target.value); // Update the state with the new value
  };
  console.log(sub);

  const handleChildChange = (event) => {
    setChild(event.target.value); // Update the state with the new value
  };
  console.log(child);

  const [parentList, SetParentList] = useState([]);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/v1/categories/get?filter[category_type][$eq]=parent&limit=500`
    )
      .then((res) => res.json())
      .then((data) => {
        SetParentList(data?.categoryList);
      });
  }, []);

  const [subCategoryList, SetSubCategoryList] = useState([]);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/v1/categories/get?filter[category_type][$eq]=sub&limit=500`
    )
      .then((res) => res.json())
      .then((data) => {
        SetSubCategoryList(data?.categoryList);
      });
  }, []);

  const [childCatList, SetChildCatList] = useState([]);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/v1/categories/get?filter[category_type][$eq]=child&limit=500`
    )
      .then((res) => res.json())
      .then((data) => {
        SetChildCatList(data?.categoryList);
      });
  }, []);

  const [country, SetCountry] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/v1/country/all-country`)
      .then((res) => res.json())
      .then((data) => {
        SetCountry(data?.data);
      });
  }, []);

  const [seller, SetSeller] = useState([]);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/v1/verifySeller/getSellerName`
    )
      .then((res) => res.json())
      .then((data) => {
        SetSeller(data);
      });
  }, []);

  const [award, SetAward] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/v1/award/all-awards`)
      .then((res) => res.json())
      .then((data) => {
        SetAward(data?.data);
      });
  }, []);

  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    country: true,
    awards: true,
    parent: true,
    sub: true,
    child: true,
  });

  const handleTogglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  const handleOptionToggle = (option) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [option]: !prevState[option],
    }));
  };



  useEffect(() => {
    const baseUrl = `${process.env.REACT_APP_URL}/v1/products/get-products-list/name?page=${currentPage}&limit=${pageSize}`;
    // console.log(baseUrl);
    const handleApiError = (error) => {
      console.error('API Error:', error);
      // Perform any necessary error handling, such as showing an error message to the user
    };

    setIsLoading(true); // Set loading state to true

    fetch(baseUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setTotalItems(data.totalCount);
        setProducts(data?.productList);
        console.log('data?productList', data?.productList);
      })
      .catch((error) => {
        handleApiError(error);
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false
      });
  }, [currentPage, pageSize]); // Empty dependency array to fetch the initial product list only once

  useEffect(() => {
    const filterParams = {
      'filter[approval_status][$eq]': approval,
      'filter[review_status][$eq]': review,
      award: awardsName,
      seller: sellerName,
      country: countryName,
      parent_category: parent,
      sub_category: sub,
      child_category: child,
    };

    const queryParams = Object.keys(filterParams)
      .filter((key) => filterParams[key] !== '')
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(filterParams[key])}`);

    const queryString = queryParams.join('&');

    const baseUrl = `${process.env.REACT_APP_URL}/v1/products/get-products-list/name`;

    const filteredUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;

    setIsLoading(true); // Set loading state to true

    fetch(filteredUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data?.productList);
        console.log(data);
      })
      .catch((error) => {
        // handleApiError(error);
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false
      });
  }, [approval, review, awardsName, sellerName, countryName, parent, sub, child]);

  return (
    <div className=" py-10 text-xs w-full pr-5">
      {/* {childModal && (
        <AwardListModal visible={childModal} onClose={handleClose} />
      )} */}

      <div className="flex items-center justify-between py-3">
        <p className="text-2xl">All Products List</p>
        <User />
      </div>
      <div className="py-3 flex items-center">
        <div className="mr-3 text-sm">Filter By:</div>
        <div className="flex flex-col pl-2">
          <div className="flex items-center">
            <div className="flex items-center">
              <p className="w-fit text-xs text-gray-900  py-1">Supplier Name</p>
              <input
                list="sellerList"
                name="sellerName"
                autoComplete="off"
                className="h-7 w-32 my-3 px-4 mx-3 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
                value={sellerName}
                onChange={handleSellerChange}
              />
              <datalist
                ref={sellerRef}
                id="sellerList"
                className="bg-white mt-2 absolute z-10"
              >
                {seller.map((list) => (
                  <option
                    key={list?._id}
                    value={list?.fullname}
                    data-id={list?._id}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {list?.fullname}
                  </option>
                ))}
              </datalist>
            </div>
            <div className="flex items-center">
              <p className="w-fit text-xs text-gray-900  py-1">Country</p>
              <input
                list="countryList"
                name="countryName"
                autoComplete="off"
                className="h-7 my-3 w-32 px-4 mx-3 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
                value={countryName}
                onChange={handleCountryChange}
              />
              <datalist
                ref={countryRef}
                id="countryList"
                className="bg-white mt-2 absolute z-10"
              >
                {country.map((list) => (
                  <option
                    key={list?._id}
                    value={list?.country_name}
                    data-id={list?._id}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {list?.country_name}
                  </option>
                ))}
              </datalist>
            </div>
            <div className="flex items-center">
              <p className="w-fit text-xs text-gray-900  py-1">Awards</p>
              <input
                list="awardList"
                name="awardName"
                autoComplete="off"
                className="h-7 my-3 w-32 px-4 mx-3 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
                value={awardsName}
                onChange={handleAwardsChange}
              />
              <datalist
                ref={awardRef}
                id="awardList"
                className="bg-white mt-2 absolute z-10"
              >
                {award.map((list) => (
                  <option
                    key={list?._id}
                    value={list?.award_name}
                    data-id={list?._id}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {list?.award_name}
                  </option>
                ))}
              </datalist>
            </div>
            <div className="flex items-center">
              <p className="w-fit text-xs text-gray-900  py-1">Approval</p>
              <input
                list="approvalList"
                name="approvalName"
                autoComplete="off"
                className="h-7 my-3 w-32 px-4 mx-3 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
                value={approval}
                onChange={handleApprovalChange}
              />
            </div>
            <datalist id="approvalList" ref={approvalRef}>
              <option value="pending"></option>
              <option value="declined"></option>
              <option value="approved"></option>
            </datalist>
            <div className="flex items-center">
              <p className="w-fit text-xs text-gray-900  py-1">Review</p>
              <input
                list="reviewList"
                name="parentName"
                autoComplete="off"
                className="h-7 my-3 w-32 px-4 mx-3 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
                value={review}
                onChange={handleReviewChange}
              />
              <datalist id="reviewList" ref={reviewRef}>
                <option value="review"></option>
                <option value="reviewed"></option>
              </datalist>
            </div>
          </div>
          <div className="flex items-center">
            <div className="pr-6">Categories :</div>
            <div className="flex items-center">
              <p className="w-fit text-xs text-gray-900  py-1">
                Parent Category
              </p>
              <input
                list="parentList"
                name="parentName"
                autoComplete="off"
                className="h-7 my-3 w-32 px-4 mx-3 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
                value={parent}
                onChange={handleParentChange}
              />

              <datalist
                ref={parentListRef}
                id="parentList"
                className="bg-white mt-2 absolute z-10"
              >
                {parentList.map((list) => (
                  <option
                    key={list?._id}
                    value={list?.category_name}
                    data-id={list?._id}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {list?.category_name}
                  </option>
                ))}
              </datalist>
            </div>
            <div className="flex items-center">
              <p className="w-fit text-xs text-gray-900  py-1">Sub Category</p>
              <input
                list="subCategory"
                name="subCategory"
                autoComplete="off"
                className="h-7 my-3 px-4 w-32 mx-3 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
                value={sub}
                onChange={handleSubChange}
              />
              <datalist
                ref={subCategoryListRef}
                id="subCategory"
                className="bg-white mt-2 absolute z-10"
              >
                {subCategoryList &&
                  subCategoryList.map((list) => (
                    <option
                      key={list?._id}
                      value={list?.category_name}
                      data-id={list?._id}
                      class="p-2 cursor-pointer hover:bg-gray-100"
                    ></option>
                  ))}
              </datalist>
            </div>
            <div className="flex items-center">
              <p className="w-fit text-xs text-gray-900  py-1">
                Child Category
              </p>
              <input
                list="childCatList"
                name="childCatName"
                autoComplete="off"
                className="h-7 my-3 px-4 mx-3 w-32 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
                value={child}
                onChange={handleChildChange}
              />
              <datalist
                ref={childCatListRef}
                id="childCatList"
                className="bg-white mt-2 absolute z-10"
              >
                {childCatList &&
                  childCatList.map((list) => (
                    <option
                      key={list?._id}
                      value={list?.category_name}
                      data-id={list?._id}
                      class="p-2 cursor-pointer hover:bg-gray-100"
                    ></option>
                  ))}
              </datalist>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="border flex p-2 gap-3 bg-slate-100">


          <div className=" relative">
            {/* SVG */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
              onClick={handleTogglePopup}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>

            {/* Pop-up */}
            {popupVisible && (
              <div className="popup absolute top-4 right-4 bg-white shadow-md p-2 mt-2">
                {/* Country */}
                <label className="flex">
                  <input
                    type="checkbox"
                    checked={selectedOptions.country}
                    onChange={() => handleOptionToggle("country")}
                    className="mr-2"
                  />
                  Country
                </label>

                {/* Awards */}
                <label className="flex">
                  <input
                    type="checkbox"
                    checked={selectedOptions.awards}
                    onChange={() => handleOptionToggle("awards")}
                    className="mr-2"
                  />
                  Awards
                </label>

                {/* Parent */}
                <label className="flex">
                  <input
                    type="checkbox"
                    checked={selectedOptions.parent}
                    onChange={() => handleOptionToggle("parent")}
                    className="mr-2"
                  />
                  Parent
                </label>

                {/* Sub */}
                <label className="flex">
                  <input
                    type="checkbox"
                    checked={selectedOptions.sub}
                    onChange={() => handleOptionToggle("sub")}
                    className="mr-2"
                  />
                  Sub
                </label>

                {/* Child */}
                <label className="flex">
                  <input
                    type="checkbox"
                    checked={selectedOptions.child}
                    onChange={() => handleOptionToggle("child")}
                    className="mr-2"
                  />
                  Child
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      <section>
        <div className="my-2 rounded-xl overflow-x-scroll ">
          <table className="table min-w-full border border-solid">
            <thead className="bg-[#e5f2f4]">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  sl. No
                </th>

                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-center text-xs font-normal text-gray-900"
                >
                  Name
                </th>

                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Seller Name
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  <div
                    className={`${selectedOptions?.parent ? "block" : "hidden"}`}
                  >
                    Parent Category
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  <div
                    className={`${selectedOptions?.sub ? "block" : "hidden"}`}
                  >
                    Sub Category
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  <div
                    className={`${selectedOptions?.child ? "block" : "hidden"}`}
                  >
                    Child Category
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  <div
                    className={`${selectedOptions?.country ? "block" : "hidden"
                      }`}
                  >
                    Country
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  <div
                    className={`${selectedOptions?.awards ? "block" : "hidden"}`}
                  >
                    Awards
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Review
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Approval
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  A+ Content
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.map((e, index) => (
                <AllProductRow
                  id={e?._id}
                  variationId={e?.variation_group_id}
                  key={e?._id}
                  slNo={index + 1}
                  img={e?.product_images[0]?.main_img}
                  name={e?.item_name}
                  sellerName={e?.seller[0]?.fullname}
                  parentCategory={e?.parent_category[0]?.category_name}
                  subCategory={e?.sub_category[0]?.category_name}
                  childCategory={e?.child_category[0]?.category_name}
                  country={e?.country[0]?.country_name}
                  award={e?.awards[0]?.image}
                  review={e?.review_status}
                  approved={e?.approval_status}
                  selectedOptions={selectedOptions}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <div className='flex justify-end items-center py-5'>
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AllProduct;
