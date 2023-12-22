import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from "../user/User";
import TableRow from "./TableRow";
import Sellerdetails from "./Sellerdetails";
import { getToken } from "../../hook/getToken";

const ApproveSellerList = () => {
  const [data, setData] = useState(null);
  // Add a new state for search results
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropDown] = useState(false);

  const sellerData = async () => {
    try {
      const url = `${process.env.REACT_APP_URL}/v1/verifySeller/getData?isVerify=approved`;
      const response = await fetch(url);
      const jsonData = await response.json();
      setData(jsonData.data);
      console.log(jsonData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    sellerData();
  }, []);

  // Handle change in search
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);

  };

  useEffect(() => {
    // Define a function to fetch data from the API
    const fetchData = async () => {
      try {
        // If the searchQuery is empty, fetch all data
        if (!searchQuery) {
          await sellerData();
        } else {
          // Fetch data based on the search query
          const response = await fetch(
            `${process.env.REACT_APP_URL}/v1/verifySeller/getData?isVerify=approved&search=${searchQuery}`
          );

          if (response.ok) {
            const data = await response.json();

            // Assuming the API returns an array of category objects
            setSearchResults(data);
            setData(data.data)
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


  const handleRefresh = () => {
    sellerData();
  };

  const [sellerType, setSellerType] = useState('');
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const filterData = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_URL}/v1/verifySeller/getData?isVerify=approved&search=${sellerType}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    filterData();
  }, [sellerType]);
  return (
    <main>
      <div className="pr-7">
        <section>
          <div className="max-w-6xl mx-auto flex justify-between py-5">
            <Link to="/" className="text-3xl text-gray-900 font-semibold">
              Approved Seller List
            </Link>
            <div className="flex gap-x-10">
              <User />
            </div>
          </div>
        </section>
        <div className="flex justify-between">
          <div className="">
            <label>
              Select Seller Type:
              <select
                value={sellerType}
                onChange={(e) => setSellerType(e.target.value)}
                className="border border-gray-400 rounded-md leading-4"
              >
                <option value="">--Select</option>
                <option value="business">Business</option>
                <option value="startup">Startup</option>
              </select>
            </label>
          </div>
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
             
            </div>
          </form>
        </div>
        <section>
          <div
            className="flex flex-col mt-10 
                    shadow-[0px_0px_16.9227px_rgba(0,0,0,0.1)] rounded-lg"
          >
            <div class="relative overflow-x-auto p-5">
              <table class="w-full text-left ">
                <thead class=" text-xs  uppercase text-gray-900 font-semibold border-b border-solid border-gray-200 ">
                  <tr>
                    <th scope="col" class=" px-4 py-3">
                      SL No
                    </th>
                    <th scope="col" class=" px-4 py-3">
                      Seller Name
                    </th>
                    <th scope="col" class=" px-4 py-3">
                      Seller Code
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Selller Email
                    </th>
                    <th scope="col" class=" px-4 py-3">
                      Business Type
                    </th>
                    <th scope="col" class=" px-4 py-3">
                      Store Name
                    </th>
                    <th scope="col" class=" px-4 py-3">
                      CM Name
                    </th>
                    <th scope="col" class="text-left px-4 py-3 ">
                      CM ID
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
                  {Array.isArray(data) &&
                    data?.map((item, index) => (
                      <TableRow
                        key={index}
                        data={item}
                        index={index}
                        onDelete={handleRefresh}
                      >
                        <Sellerdetails _id={item._id} />
                      </TableRow>
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

export default ApproveSellerList;
