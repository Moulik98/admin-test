import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar";
import Loader from "../Loader";
import toast from "react-hot-toast";
import { QAList } from "../../constant";

const inputFields = [
  {
    id: "currentPassword",
    label: "Current Password",
    isDisabled: false,
    name: "currentPassword",
    type: "password",
  },
  {
    id: "newPassword",
    label: "New Password",
    isDisabled: false,
    name: "newPassword",
    type: "password",
  },
  {
    id: "confirmPassword",
    label: "Confirm Password",
    isDisabled: false,
    name: "confirmPassword",
    type: "password",
  },
];

const Qapassword = () => {
  const [isMutating, setIsMutating] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Fetch data or perform any other initialization logic here
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };
  const token = localStorage.getItem("access_token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const url = process.env.REACT_APP_URL + "/v1/category-manager/changePassword";
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include any authorization headers if needed
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        }),
      });

      console.log(JSON.stringify({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      }))
      console.log(token)

      const data = await response.json();
      if (response.ok) {
        setIsMutating(false);
        toast.success(data.message);
      } else {
        setIsMutating(false);
        toast.error(data.error || "Failed to change password");
      }

      console.log("change password response", data);
    } catch (error) {
      console.error("Error changing password:", error);
      setIsMutating(false);
    }
  };

  return (
    <main className="max-w-full flex">
      <div className="sidebar bg-[#00388c] h-screen w-fit sticky top-0">
        <SideBar menu={QAList} />
      </div>
      <div className="flex items-top justify-center">
        <form className="grow p-12" onSubmit={(e) => handleSubmit(e)}>
          <h1 className="text-xl flex text-left font-bold mb-6">
            Change Password
          </h1>
          <div className="gap-4">
            {inputFields.map((field, index) => (
              <div key={field.id + index} className="flex w-full flex-col">
                <label className="text-sm flex text-left text-gray-500 py-2">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  className="w-full py-2 px-3 rounded border border-solid border-gray-300 text-gray-800 text-sm"
                  name={field.name}
                  disabled={field.isDisabled}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="py-2 px-6 rounded bg-blue-500 text-white"
            >
              {isMutating ? <Loader /> : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Qapassword;
