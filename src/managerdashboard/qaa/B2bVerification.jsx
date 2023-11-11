import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";
import { Link } from "react-router-dom";
import { User } from "../user/User";
const B2bVerification = () => {
  const [verificationList, SetVerificationList] = useState([]);
  // Add a new state for search results
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropDown] = useState(false);
  async function fetchSellerVerificationList() {
    try {
      const token = localStorage.getItem("access_token"); // Replace with your actual bearer token
      const url = `${process.env.REACT_APP_URL}/v1/b2b-approval/get?sort=desc`;

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      SetVerificationList(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSellerVerificationList();
  }, []);

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
            `${process.env.REACT_APP_URL}/v1/verifySeller/search?query=${searchQuery}`
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
  }, [searchQuery]);

  const handleSelect = async (sellerId) => {
    try {
      console.log("seller id", sellerId);
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `${process.env.REACT_APP_URL}/v1/b2b-approval/get/${sellerId}`,
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

        // Log the entire data object

        SetVerificationList(data); // Wrap the object in an array if needed
        setShowDropDown(false);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleRefresh = () => {
    fetchSellerVerificationList();
  };
  return (
    <main>
      <div className="pr-7">
        <section>
          <div className="max-w-6xl mx-auto flex justify-between py-5">
            <Link
              to="/b2buser"
              className="text-3xl text-gray-900 font-semibold"
            >
              B2b customer Verification
            </Link>
            <div className="flex gap-x-10">
              <User />
            </div>
          </div>
        </section>
        <div className="flex justify-end">
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
                            handleSelect(result._id);
                          }}
                          className="p-2 hover:bg-gray-300 font-light text-xs"
                        >
                          {result?.fullname}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
        {/* // Table Section */}
        <section>
          <div
            className="flex flex-col mt-10 
                    shadow-[0px_0px_16.9227px_rgba(0,0,0,0.1)] rounded-lg"
          >
            <div className="p-5 border-b border-solid border-gray-300">
              <h2 className="text-base font-semibold text-[#143250]">
                Allow Verification To Purchase Product :
              </h2>
            </div>
            <div class="relative overflow-x-auto p-5">
              <table class="w-full text-left text-xs">
                <thead class=" text-xs  uppercase text-gray-900 font-semibold border-b border-solid border-gray-200 ">
                  <tr>
                    <th scope="col" class=" px-4 py-3">
                      B2b User Name
                    </th>
                    <th
                      scope="col"
                      class=" 
                                        px-4 py-3"
                    >
                      B2b user Email
                    </th>
                    <th scope="col" class=" px-4 py-3">
                      Store Name
                    </th>
                    <th scope="col" class="text-center px-4 py-3 ">
                      Status
                    </th>
                    <th
                      scope="col"
                      class="text-center px-4
                                        mx-auto py-3"
                    >
                      Options
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {verificationList.map((item, index) => (
                    <TableRow
                      key={index}
                      data={item}
                      onDelete={handleRefresh}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default B2bVerification;
