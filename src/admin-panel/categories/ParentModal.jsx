import React, { useEffect, useState } from "react";
import slugify from "./Slugify";
import toast from "react-hot-toast";

export const ParentModal = ({ visible, onClose, id, modalName }) => {
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedFile(reader.result);
      setFileInputState(e.target.value);
    };
  };
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const updateParent = async (url, requestBody) => {
    try {
      const response = await fetch(url, requestBody);
      const data = await response.json();
      if (response.ok) {
        if (modalName === "edit") {
          toast.success("Updated Successfully");
        } else {
          toast.success("Added Successfully");
        }
        SetFormData({
          category_name: "",
          category_desc: "",
          category_img: "",
        });
        onClose();
      
        console.log(data);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      setIsFormSubmited(false);
      alert(error);
      console.log(error);
    }
  };

  const [formData, SetFormData] = useState({
    category_name: "",
    category_desc: "",
    category_img: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetFormData((preValue) => {
      return { ...preValue, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    const access_token = localStorage.getItem("access_token");

    e.preventDefault();
    let slug = slugify(formData.category_name);
    const data =
      modalName === "edit"
        ? {
            category_desc: formData.category_desc,
            category_type: "parent",
            category_img: selectedFile,
          }
        : {
            category_name: formData.category_name,
            category_slug: slug,
            category_desc: formData.category_desc,
            category_type: "parent",
            category_img: selectedFile,
          };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(data),
    };

    if (modalName === "edit") {
      updateParent(
        `${process.env.REACT_APP_URL}/v1/categories/edit/${id}`,
        requestOptions
      );
    } else {
      updateParent(
        `${process.env.REACT_APP_URL}/v1/categories/add?filter[category_type][$eq]=parent`,
        requestOptions
      );
    }
  };
  // const [view, setView] = useState([])
  useEffect(() => {
    if (modalName === "view" || modalName === "edit") {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_URL}/v1/categories/get/${id}`
          );
          if (response.ok) {
            const data = await response.json();
            SetFormData(data.category);
            console.log(data.category);
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

  if (visible);
  return (
    <div className=" fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="w-1/2 mx-auto bg-white rounded py-5 px-10">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
            setIsFormSubmited(true);
          }}
          className="flex flex-col"
        >
          <div className="flex gap-5">
            <div className="w-1/2 flex flex-col">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase">
                parent category name
              </p>
              <input
                onChange={handleChange}
                name="category_name"
                disabled={modalName === "view" || modalName === "edit"}
                value={formData.category_name}
                className="h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
                maxLength={80}
              />
            </div>
            <div className="w-1/2 flex flex-col">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase ">
                category id
              </p>
              <input
                disabled
                placeholder={
                  formData.category_name && slugify(formData.category_name)
                }
                className=" h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
              />
            </div>
          </div>
          <p className="w-fit text-sm text-gray-900  py-1 uppercase ">
            Description
          </p>
          <textarea
            onChange={(e) => handleChange(e)}
            name="category_desc"
            value={formData.category_desc}
            disabled={modalName === "view"}
            className="h-24 my-5 px-4 py-2 outline-0 border border-solid border-gray-200 resize-none rounded-md"
            type="text"
            maxLength={160}
          />
               <div className='flex gap-x-10'>
                    <div className=''>
                        <img className='w-44 aspect-square'
                            src={formData.category_img} />
                    </div>
                    </div>
          <div className="w-1/2 flex flex-col">
            <p className="w-fit text-xs text-gray-900  py-1 uppercase ">
              Category image
            </p>
            <div>
              <input
                onChange={handleFileInputChange}
                disabled={modalName === "view"}
                type="file"
                className="border mt-6 p-1"
              />
            </div>
          </div>

          <div className="flex gap-x-5 justify-center my-5">
            <div
              onClick={() => onClose()}
              className="py-2 px-4 bg-white text-red-600 rounded-sm"
            >
              Cancel
            </div>
            {modalName === "view" ? null : (
              <div
                className={`${
                  (isFormSubmited ||
                    formData.category_desc === "" ||
                    formData.category_name === "") &&
                  "cursor-not-allowed"
                }`}
              >
                {modalName === "edit" ? (
                  <button
                    className={`py-2 px-10 bg-[#00388c] text-white rounded-lg uppercase ${
                      (isFormSubmited ||
                        formData.category_desc === "" ||
                        formData.category_name === "") &&
                      " pointer-events-none"
                    }`}
                    type="submit"
                  >
                    update
                  </button>
                ) : (
                  <button
                    className={`py-2 px-10 bg-[#00388c] text-white rounded-lg uppercase ${
                      (isFormSubmited ||
                        formData.category_desc === "" ||
                        formData.category_name === "") &&
                      " pointer-events-none"
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
