import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from "../user/User";
import TableRow from "./TableRow";
import Sellerdetails from "./Sellerdetails";

const ApproveSellerList = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const url =
        `${process.env.REACT_APP_URL}/v1/verifySeller/getApprovedData`;
      const response = await fetch(url);
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };
  return (
    <mian>
      <div className="pr-7">
        <section>
          <div className="max-w-6xl mx-auto flex justify-between py-5">
            <Link to="/" className="text-3xl text-gray-900 font-semibold">
              Approved Seller List
            </Link>
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
                    //   value={searchTerm}
                    //   onChange={handleSearch}
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
            <div class="relative overflow-x-auto p-5">
              <table class="w-full text-left ">
                <thead class=" text-xs  uppercase text-gray-900 font-semibold border-b border-solid border-gray-200 ">
                  <tr>
                    <th scope="col" class=" px-4 py-3">
                      Seller Name
                    </th>
                    <th
                      scope="col"
                      class="px-4 py-3"
                    >
                      Selller Email
                    </th>
                    <th scope="col" class=" px-4 py-3">
                      Business Type
                    </th>
                    <th scope="col" class=" px-4 py-3">
                      Store Name
                    </th>
                    <th scope="col" class="text-left px-4 py-3 ">
                      Seller ID
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
                    data.map((item, index) => (
                      <TableRow
                        key={index}
                        data={item}
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
    </mian>
  );
};

export default ApproveSellerList;
