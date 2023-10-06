import React, { useEffect } from "react";
import { useState } from "react";
import AddGstModal from "./AddGstModal";
import ManageGstRow from "./ManageGstRow";
import Pagination from "../../Pagination";

const ManageGst = () => {
  const [gstModal, setGstModal] = useState(false);
  const [gstdata, setGstData] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const access_token = localStorage.getItem("access_token");

  const fetchSubCategories = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/v1/manage-gst/get-category-list?category_type=sub`
    );
    if (response.ok) {
      const data = await response.json();
      setSubCategories(data.response);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

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

  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    category_id: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Request Body",formData);
 
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/v1/manage-gst/search-gst-records`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Handle the response data if needed
        setGstData(data.response);
        console.log("Search result:", data);
      } else {
        console.error("Error searching GST records");
      }
    } catch (error) {
      console.error(error);
    }
  };




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
        <form className="flex items-center gap-2" onSubmit={handleFormSubmit}>
        <select className="border-2 rounded px-2 py-2" name="category_id"  onChange={handleInputChange}>
          <option value="">All Categories</option>
          {subCategories.map((category, index) => (
            <option key={index} value={category._id}>
              {category.category_name}
            </option>
          ))}
        </select>

        <label className="w-1/10 flex justify-start text-xs text-indigo-900 font-bold ">
              Start Date *
            </label>
            <input
              required
              className="grow py-1 px-3 border border-solid border-gray-200 rounded-md"
              type="date"
              name="start_date"
              onChange={handleInputChange}
            />
               <label className="w-1/10 flex justify-start text-xs text-indigo-900 font-bold ">
              End Date *
            </label>
            <input
              required
              className="grow py-1 px-3 border border-solid border-gray-200 rounded-md"
              type="date"
              name="end_date"
              onChange={handleInputChange}
            />
    
    
          <div className="flex flex-col relative">
            <div className="flex items-center p-2 gap-x-1 rounded-lg border border-solid border-[#9D9D9D] bg-blue-700">
              <button className=" " type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="transparent"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              </button>
           
           
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
        <Pagination
            // currentPage={currentPage}
            // totalItems={totalItems}
            // pageSize={pageSize}
            // setCurrentPage={setCurrentPage}
          />
      </section>
    </div>
  );
};

export default ManageGst;
