import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddGstModal = ({ visible,onClose }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [formData, setFormData] = useState({
    category_id: "",
    gst_per: "",
    start_date: "",
  });

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

  console.log("Sub Categories", subCategories);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/v1/manage-gst/add-gst`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        // Handle success or redirect as needed
      } else {
        toast.error(data.message);
        // Handle errors or show an error message to the user
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network or other errors here
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center ${visible ? "" : "hidden"}`}>
      <div className="w-1/3 mx-auto bg-white rounded py-5 px-10">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex gap-5">
            <div className="w-full flex flex-col">
              <p className="w-fit text-sm text-gray-900 py-1 uppercase ">
                Select Sub Category
              </p>
              <select
                className="border border-1 p-1"
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
              >
                <option value="">Select...</option>
                {subCategories.map((category) => (
                  <option
                    className="text-black"
                    key={category._id}
                    value={category._id}
                  >
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col w-full justify-start">
            <p className="text-sm text-start text-gray-900 py-1 uppercase ">
              GST %
            </p>
            <input
              className="border p-1"
              type="number"
              name="gst_per"
              value={formData.gst_per}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full flex flex-col justify-start gap-4 my-2">
            <label className="w-1/3 flex justify-start text-xs text-indigo-900 font-bold ">
              Start Date *
            </label>
            <input
              required
              className="grow py-1 px-3 border border-solid border-gray-200 rounded-md"
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex gap-x-5 justify-center my-5">
            <div className="py-2 px-10 bg-red-500 text-white rounded-sm"
            onClick={() => onClose()}>
              Cancel
            </div>

            <button
              className="py-2 px-10 bg-[#00388c] text-white rounded-sm uppercase"
              type="submit"
            >
              add new
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGstModal;
