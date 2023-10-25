import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

    
const StaffModal = ({ id,visible,onClose ,modalName}) => {
    const [formData, setFormData] = useState({
      designation_name: "",
      designation_short: "",
    });
    
    const [isFormSubmited, setIsFormSubmited] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
        const token = localStorage.getItem("access_token")
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/v1/designaiton/addDesignaiton`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );
  
        if (response.ok) {
          toast.success("Designation added successfully!");
          // You can add additional logic here after a successful request
        } else {
          toast.error("Failed to add designation. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again later.");
      }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      useEffect(() => {
        const token = localStorage.getItem("access_token")
        if (modalName === "view" || modalName === "edit") {
          const fetchData = async () => {
            try {
              const response = await fetch(
                `${process.env.REACT_APP_URL}/v1/designaiton/getAllDesignations/${id}`,{
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              if (response.ok) {
                const data = await response.json();
                setFormData(data);
                console.log(data);
              } else {
                throw new Error("Unable to fetch category data");
              }
            } catch (error) {
              console.log(error);
            }
          };
    
          fetchData();
        }
      }, [modalName, id]);
    

  return (
    <div className={`fixed z-10 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center ${visible ? "" : "hidden"}`}>
      <div className="w-1/3 mx-auto bg-white rounded py-5 px-10">
        <form className="flex flex-col" onSubmit={handleSubmit} >
          <div className="flex gap-5">
      
          </div>
      
          <div className="flex flex-col w-full justify-start">
            <p className="text-sm text-start text-gray-900 py-1 uppercase ">
              Role/Designation Name
            </p>
            <input
              className="border p-1"
              type="text"
              name="designation_name"
              value={formData.designation_name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-full justify-start">
            <p className="text-sm text-start text-gray-900 py-1 uppercase ">
              Role/Designation Shortform
            </p>
            <input
              className="border p-1"
              type="text"
              name="designation_short"
              onChange={handleChange}
              value={formData.designation_short}
            />
          </div>

          <div className="flex gap-x-5 justify-center my-5">
            <div className="py-2 px-10 bg-red-500 text-white rounded-sm"
            onClick={() => onClose()}
           >
              Cancel
            </div>

            {modalName === "view" ? null : (
              <div
                className={`${(isFormSubmited ||
                    formData.designation_name === "" ||
                    formData.designation_short=== "") &&
                  "cursor-not-allowed"
                  }`}
              >
                {modalName === "edit" ? (
                  <button
                    className={`py-2 px-10 bg-[#00388c] text-white rounded-sm uppercase ${(isFormSubmited ||
                        formData.designation_name === "" ||
                        formData.designation_short === "") &&
                      " pointer-events-none"
                      }`}
                    type="submit"
                  >
                    update
                  </button>
                ) : (
                  <button
                    className={`py-2 px-10 bg-[#00388c] text-white rounded-sm uppercase ${(isFormSubmited ||
                        formData.designation_name === "" ||
                        formData.designation_short === "" )

                      }`}
                    type="submit"
                  >
                    add new
                  </button>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffModal;
