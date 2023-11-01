import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import DesignationTable from './DesignationTable';
import toast from "react-hot-toast";
import StaffModal from "./StaffModal";

const ManageRoles = () => {
  const [designations, setDesignations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("access_token");

  const handleClose = () => {
    setShowModal(false);
    console.log(showModal);
  };
console.log("Show Modal >>>",showModal);

  useEffect(() => {
    // Fetch designations from the API
    const fetchDesignations = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/v1/designaiton/getAllDesignations`,
          {
            headers : {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          setDesignations(data);
        } else {
          console.error("Failed to fetch designations")
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again later.");
      }
    };

    fetchDesignations();
  }, []); // Empty dependency array to run the effect only once on component mount
  console.log(designations);


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
          <div className="flex items-center " onClick={() => setShowModal(true)}>      
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
          
            <p className="text-xs">Add Roles/Designation</p>
            {showModal && (
               <StaffModal visible={showModal} onClose={handleClose} />
            )}
           
          </div>
        </div>
      </div>
      <form className="flex items-center">
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
            />
          </div>
        </div>
      </form>
    </div>
    <section>
      <div class="relative overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
            <tr>
              <th scope="col" class="px-2 py-3">
                Designation Name
              </th>
              <th scope="col" class="px-2 py-3">
                Short Form
              </th>
              <th scope="col" class="px-2 py-3">
                Created At
              </th>
              <th scope="col" class="px-2 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          {designations?.map((item) => (
                <DesignationTable key={item._id} id={item._id} data={item} status={item.isActive}/>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  </div>
  );
};

export default ManageRoles;
