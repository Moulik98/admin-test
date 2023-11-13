import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ManageStaff = () => {

  const navigate = useNavigate();
 
const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  userName: "",
  password: "",
  confirmPassword: "",
  roles: "",
});

const [designations, setDesignations] = useState([]);
const token = localStorage.getItem("access_token");

useEffect(() => {
  // Fetch designations from the API
  const fetchDesignations = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/v1/designaiton/getAllDesignations`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setDesignations(data);
        console.log(data); // Move the log statement here
       
      } else {
        toast.error("Failed to fetch designations. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  // Call the fetchDesignations function once on component mount
  fetchDesignations();
}, []); // Empty dependency array to run the effect only once on component mount


// Function to handle form input changes
const handleInputChange = (e) => {
  const { name, value } = e.target;


  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

// Function to handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  // Perform any validation or submit data to the server here
  console.log("Form Data Submitted:", formData);

    // Check if the username contains spaces
    if (formData.userName.includes(" ")) {
      toast.error("Username cannot contain spaces.");
      return; // Prevent further execution of the function
    }

  const response = await fetch(
    `${process.env.REACT_APP_URL}/v1/category-manager/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }
  );

  const data = await response.json();
  if (response.ok) {
    navigate('/designation-list')
    toast.success(data.message);
    setFormData({
      name: "",
      email: "",
      phone : "",
      userName: "",
      password: "",
      confirmPassword:"",
      roles: "",
    });
   
  } else {
    toast.error(data.message);
  }
  // Reset the form after submission if needed

};

  return (
    <div className="max-w-7xl ">
      <div className="flex justify-start py-8 border-b">
        <h1 className="text-3xl font-bold ">Create Staff Member</h1>
      </div>

      <div className=" ">
        <form className="py-8" onSubmit={handleSubmit}>
          <div className="flex w-4/5 flex-col justify-center items-center gap-8">
            <div className=" w-3/5 flex flex-row gap-4">
              <label className="w-2/5 text-right">
                <span>Name:</span>
              </label>

              <input
                className="w-3/5  border rounded-md px-4 py-1"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="w-3/5 flex flex-row gap-4">
              <label className="w-2/5 text-right">
                <span>Email:</span>
              </label>
              <input
                className="w-3/5  border rounded-md px-4 py-1"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-3/5 flex flex-row gap-4  ">
              <label className="w-2/5 text-right">
                <span>Phone:</span>
              </label>
              <input
                className="w-3/5  border rounded-md px-4 py-1"
                type="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="w-3/5 flex flex-row gap-4">
              <label className="w-2/5 text-right">
                <span>Username:</span>
              </label>
              <input
                className="w-3/5  border rounded-md  px-4 py-1"
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-3/5 flex flex-row gap-4">
              <label className="w-2/5 text-right">
                <span>Password:</span>
              </label>
              <input
                className="w-3/5  border rounded-md  px-4 py-1"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-3/5 flex flex-row gap-4">
              <label className="w-2/5 text-right">
                <span>Confirm Password:</span>
              </label>
              <input
                className="w-3/5  border rounded-md  px-4 py-1"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="w-3/5 flex flex-row gap-4">
              <label className="w-2/5 text-right">
                <span>Designation:</span>
              </label>
              <select
                className="w-3/5  border rounded-md px-4 py-1"
                name="roles"
                value={formData.roles}
                onChange={handleInputChange}
                required
              >
                <option className="text-center" value="" disabled>
                  Select Designation
                </option>
                {designations.map((designation) => (
                  <option
                    key={designation._id}
                    value={designation.designation_short}
                  >
                    {designation.designation_name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-md"
            >
             Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageStaff;
