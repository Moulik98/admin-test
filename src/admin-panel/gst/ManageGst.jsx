import React, { useEffect } from "react";
import { useState } from "react";
import AddGstModal from "./AddGstModal";
import ManageGstRow from "./ManageGstRow";

const ManageGst = () => {
  const [gstModal, setGstModal] = useState(false);
  const [gstdata, setGstData] = useState([]);

  const fetchGstData = async() => {
    try{
      const response = await fetch(`${process.env.REACT_APP_URL}/v1/manage-gst/get-gst-records`)
      const data = await response.json();
        if(response.ok){
          setGstData(data.response);
        }
    }catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    fetchGstData();
  },[])

  console.log("GST data >>",gstdata);

  const handleClose = () => {
    setGstModal(false);
  }
  return (
    <div className="pr-6 py-10 text-sm font-semibold">
      <div>
        <div className="flex items-left py-3">
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
          <p className="text-2xl">Manage GST</p>
        </div>
        <div className="flex px-4 text-[#0056fe] tex-xs"></div>
      </div>

      <div className="max-w-6xl mx-auto flex justify-between mt-5">
        <div className="flex justify-start my-4">
          <div className="flex-col">
            <div className="flex ">
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
              <p onClick={() => {
                setGstModal(true)
              }}>Add GST</p>
              {gstModal && (
                <AddGstModal visible={gstModal} onClose={handleClose} />
              )}
            </div>
          </div>
        </div>
        <form className="flex items-center">
          <label className="mr-2">Child Categories</label>
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
                className="w-60 py-1 px-1 outline-0 -z-10"
                placeholder="Search child/sub/parent categories"
                type="text"
              />
            </div>
          </div>
        </form>
      </div>

      <section>
        <div className="max-w-6xl mx-auto overflow-x-scroll rounded-t-xl my-5">
          <table className="table min-w-full border  border-solid">
            <thead className="bg-[#e5f2f4]">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-sm font-medium text-gray-900"
                >
                  Sl no.
                </th>

                <th
                  scope="col"
                  className="px-4 py-2 text-left text-sm font-medium text-gray-900"
                >
                  Sub- Category
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-sm font-medium text-gray-900"
                >
                  GST %
                </th>

                <th
                  scope="col"
                  className="px-4 py-2 text-left text-sm font-medium text-gray-900"
                >
                  Start Date
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-sm font-medium text-gray-900"
                >
                  End Date
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-sm font-medium text-gray-900"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {gstdata.map((items, index) => (
                <ManageGstRow
                  key={items._id}
                  id={items._id}
                  srNo={index + 1}
                  category={items.category_name}
                  percent={items.gst_per}
                  startdate={items.start_date}
                  enddate={items.end_date}

                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ManageGst;
