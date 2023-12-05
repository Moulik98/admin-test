import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar";
import Loader from "../Loader";
import toast from "react-hot-toast";
import { categoryManagerMenu, categoryMenu } from "../../constant";
import { Link } from "react-router-dom";

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
  }
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
    try {
      const url = process.env.REACT_APP_URL + "/v1/category-manager/me";
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setCMInfo(data.sellerDetails);
        setFormData({
          designation: data.sellerDetails.roles[0],
          empId: data.sellerDetails.emp_id,
          name: data.sellerDetails.name,
          phone: data.sellerDetails.phone,
          email: data.sellerDetails.email,
          userName: data.sellerDetails.userName,
        });

        if (data.sellerDetails.image) {
          setImage(data.sellerDetails.image);
        } else {
          console.error("Image URL not found in the response");
        }
      } else {
        console.error("Failed to fetch Data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    CategotyManager();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  // Helper function to convert image to base64
  const convertImageToBase64 = (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64Image = reader.result.split(",")[1];
        resolve(`data:image/jpeg;base64,${base64Image}`);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(image);
    });
  };

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64Image = reader.result;
        setImage(selectedImage);
      };

      reader.readAsDataURL(selectedImage);
    }
  };

  const handleImageClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let base64Image = null;
    if (image) {
      base64Image = await convertImageToBase64(image);
    }

    const updatedFormData = base64Image
      ? { ...formData, image: base64Image }
      : { ...formData };

    const url = process.env.REACT_APP_URL + "/v1/category-manager/editStaffProfile";

    try {
      setIsMutating(true); // Set loading state to true
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
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsMutating(false); // Set loading state back to false
    }
  };

  return (
    <main className="max-w-full flex">
      <div className="sidebar bg-[#00388c] h-screen w-fit sticky top-0">
        <SideBar menu={categoryMenu} />
      </div>
      <div className="flex flex-col">
      <p className="text-2xl flex justify-start p-4 ">CH Profile Update</p>
      <div className="flex items-top justify-center">
        <div className="ml-40 mt-28" onClick={handleImageClick}>
        
          <div className="rounded-full w-48 h-48 object-cover border border-dashed border-gray-300 cursor-pointer">
            {image ? (
              <img
                src={image}
                alt="Selected Profile Image"
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 flex items-center justify-center h-full">
                {image === null ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="none"
                    viewBox="0 0 24 24"
                    id="profile"
                  >
                    <circle cx="12" cy="12" r="11" fill="#000" opacity=".4"></circle>
                    <path
                      fill="#000"
                      fillRule="evenodd"
                      d="M12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11ZM10 13C8.34315 13 7 14.3431 7 16C7 17.6569 8.34315 19 10 19H14C15.6569 19 17 17.6569 17 16C17 14.3431 15.6569 13 14 13H10Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  "Select Profile Image"
                )}
              </span>
            )}
          </div>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <form className="grow p-12" onSubmit={(e) => handleSubmit(e)}>
          <div className="grid grid-cols-2 gap-4">
            {inputFields.map((field, index) => (
              <div key={field.id + index} className="flex w-full flex-col">
                <label className="text-sm flex text-left text-gray-500 py-2">
                  {field.label}
                </label>
                <input
                  type="text"
                  className="w-full py-2 px-3 rounded border border-solid border-gray-300 text-gray-800 text-sm"
                  name={field?.name}
                  disabled={field.isDisabled}
                  value={formData[field?.name]}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            ))}
            <Link className="flex justify-start text-sm text-blue-600" to="/category-head-password-change">
              <button>Change Password</button>
            </Link>
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
      </div>
    </main>
  );
};

export default QaProfile;
