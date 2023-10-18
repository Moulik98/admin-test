import React, { useState, useEffect } from "react";
import AttributesRow from "./AttributesRow";
import AttributesModal from "./AttributesModal";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";

const AddAttributes = () => {

  // state for modal
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [childModal, setChildModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  let [childCategories, setChildCategories] = useState([]);
  // For Closing Modal
  const handleClose = () => {
    setChildModal(false);
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/v1/attributes/get?page=${currentPage}&pageSize=${pageSize}&sort=-createdAt`
    )
      .then((res) => res.json())
      .then((data) => {
        setChildCategories(data?.attributeList);
        setData(data?.attributeList);
        setTotalItems(data?.totalCount);
        console.log(data)

      });
  }, [currentPage, pageSize]);



  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  childCategories = data.filter((item) =>
    item.attribute_group_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItem = childCategories.length > 0 ? childCategories[0] : null;

  return (
    <div className=" py-10 text-xs font-semibold pr-5">
      {childModal && (
        <AttributesModal visible={childModal} onClose={handleClose} />
      )}
      <div>
        <div className="flex items-center py-3">
          <Link to="/category/attributes">
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
          <p className="text-2xl">Attributes</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5">
        <div className="flex gap-x-5">
          <div className="flex">
            {/* // Search 1 */}
            <form className="flex items-center">
              <label className="mr-2 text-xs">Sub-Group</label>
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
                  value={searchTerm}
                  onChange={handleSearch}
                  type="text"
                />
                {currentItem && <p>{currentItem.name}</p>}
              </div>
            </form>
          </div>
        </div>
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
          <p>Add New Attribute</p>
        </div>
      </div>

      <section>
        <div className="w-full overflow-x-scroll rounded-t-xl my-5">
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
                  Attributes
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Sub-Group
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Attributes Id
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
              {childCategories.map((categories, index) => (
                <AttributesRow
                  id={categories._id}
                  key={categories._id}
                  srNo={index + 1}
                  parent={categories.attribute_name}
                  sub={categories.attribute_group_name}
                  categoriesId={categories.attribute_slug}
                  desc={categories.attribute_desc}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Pagination setCurrentPage={setCurrentPage} totalItems={totalItems} pageSize={pageSize} currentPage={currentPage} />
    </div>
  );
};

export default AddAttributes;
