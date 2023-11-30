import React, { useState, useEffect } from "react";
import _debounce from 'lodash/debounce';
import { Link } from "react-router-dom";
import AssignedStaffs from "./AssignedStaffs";

const DesignationList = () => {
  const [staffs, setStaffs] = useState([]);
  const fetchStaffList = async (url) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        url,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setStaffs(data.nonAdmins);
      }
    } catch (error) {
      console.error("Error fetching staff list:", error);
    }
  };

  useEffect(() => {
    const url = `${process.env.REACT_APP_URL}/v1/category-manager/getCmList`;
    fetchStaffList(url);
  }, []);


  console.log("staffs >>>", staffs);
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = async (e) => {
    setSearchTerm(e.target.value);
  };

  const debouncedFetchStaffList = _debounce(async (term) => {
    const url = `${process.env.REACT_APP_URL}/v1/category-manager/getCmList?search=${term}`;
    await fetchStaffList(url);
  }, 100); // Change the debounce delay as needed (e.g., 300ms)

  useEffect(() => {
    debouncedFetchStaffList(searchTerm);
  }, [searchTerm]);

  return (
    <div className="">
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
          <p className="text-2xl">Staff List</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex justify-between  my-4 relative">
        <div className="flex justify-end my-4 ">
          <div className="flex flex-col">
            <Link to="/manage-staff">
              <div
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

                <p className="text-xs">Add Staff Members</p>

              </div>
            </Link>
          </div>
        </div>
        <form onSubmit={e => e.preventDefault()} className="flex items-center">
          <label className="mr-2">Search Staff</label>
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
                placeholder="Search Staff Members"
                type="text"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        </form>
      </div>
      <section>
        <div class="max-w-6xl relative overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
              <tr>
                <th scope="col" class="px-2 py-3">
                  Sl No
                </th>
                <th scope="col" class="px-2 py-3">
                  Employee ID
                </th>
                <th scope="col" class="px-2 py-3">
                  Name
                </th>

                <th scope="col" class="px-2 py-3">
                  Contact No
                </th>
                <th scope="col" class="px-2 py-3">
                  Email
                </th>
                <th scope="col" class="px-2 py-3">
                  Roles
                </th>
                <th scope="col" class="px-2 py-3">
                  Username
                </th>
                <th scope="col" class="px-2 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {staffs?.map((item, index) => (
                <AssignedStaffs key={item._id} data={item} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DesignationList;
