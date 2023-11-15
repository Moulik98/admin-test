import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar";
import Loader from "../Loader";
import toast from "react-hot-toast";
import { QAList } from "../../constant";

const inputFields = [
  {
    id: "YUJDdfdruefndiyijhcihufb",
    label: "EmpID",
    isDisabled: true,
    name: "empId",
  },
  {
    id: "dfdruef450ndiyijhcihufb",
    label: "Designation",
    isDisabled: true,
    name: "designation",
  },
  {
    id: "fdruefndiy8457ijhcihufb",
    label: "Full Name",
    isDisabled: false,
    name: "name",
  },
  {
    id: "fdruefndiy8457ijhcihufb",
    label: "Email",
    isDisabled: false,
    name: "email",
  },
  {
    id: "fdruefndiy8457ijhcihufb",
    label: "Phone Number",
    isDisabled: false,
    name: "phone",
  },
  {
    id: "fdruefndiy645ijhcihufb",
    label: "UserName",
    isDisabled: true,
    name: "userName",
  },
  {
    id: "fdruefndiy645ijhcihufb",
    label: "Password",
    isDisabled: false,
    name: "password",
    type: "password",
  },
  {
    id: "fdruefndiy645ijhcihufb",
    label: "Confirm Password",
    isDisabled: false,
    name: "confirmPassword",
    type: "password",
  },
];

const QaProfile = () => {
  const [cminfo, setCMInfo] = useState();
  const [isMutating, setIsMutating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    userName: "",
  });
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("access_token");

  const CategotyManager = async () => {
    const url = process.env.REACT_APP_URL + "/v1/category-manager/me";
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setCMInfo(data.sellerDetails);
      setFormData({
        name: data.sellerDetails.name,
        phone: data.sellerDetails.phone,
        email: data.sellerDetails.email,
        userName: data.sellerDetails.userName,
      });
    } else {
      console.error("Failed to fetch Data");
    }
  };

  useEffect(() => {
    CategotyManager();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleImageClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = image
      ? { ...formData, image }
      : { ...formData };

    const url =
      process.env.REACT_APP_URL + "/v1/category-manager/editStaffProfile";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFormData),
      });

      const data = await response.json();
      if (response.ok) {
        setIsMutating(false);
        toast.success(data.message);
      } else {
        setIsMutating(false);
      }

      console.log("store details response", data);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsMutating(false);
    }
  };

  return (
    <main className="max-w-full flex">
    <div className="sidebar bg-[#00388c] h-screen w-fit sticky top-0">
      <SideBar menu={QAList} />
    </div>
    <div className="flex items-top justify-center">
      <div className="ml-48 mt-28" onClick={handleImageClick}>
        <div className="rounded-full w-32 h-32 object-cover border border-dashed border-gray-300 cursor-pointer">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Selected Profile Image"
              className="rounded-full w-32 h-32 object-cover"
            />
          ) : (
            <span className="text-gray-500 flex items-center justify-center h-full">
              {image === null ? "Click to add image" : "Select Profile Image"}
            </span>
          )}
        </div>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
      <form
        className="  grow p-8 "
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-xl flex text-left font-bold mb-6">
          QA Approver Profile
        </h1>
        <div className="grid grid-cols-2 gap-8">
        {inputFields.map((field, index) => (
              <div key={field.id + index} className="flex w-full flex-col ">
                <label className="text-sm flex text-left text-gray-500 py-2">
                  {field.label}
                </label>
                <input
                  type="text"
                  className="w-full py-2 px-3 rounded border border-solid border-gray-300 text-gray-800 text-sm"
                  name={field.name}
                  disabled={field.isDisabled}
                  value={`${formData[field.name]}`}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            ))}
          {/* <div className="flex flex-col mb-4">
            <label
              className="text-sm flex text-left text-gray-500 py-2 cursor-pointer"
              onClick={handleImageClick}
            >
              Profile Image
            </label>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div> */}
        </div>
        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="py-2 px-6 rounded bg-blue-500 text-white"
          >
            {isMutating ? <Loader /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  </main>
  );
};

export default QaProfile;
