import React, { useEffect, useState, useRef } from "react";
import slugify from "./Slugify";
import { useNavigate } from "react-router-dom";
const ChildCategoriesModal = (props) => {
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const { visible, onClose, id, modalName } = props;
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const navigate = useNavigate();
  // function for posting data to endpoint

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedFile(reader.result);
      setFileInputState(e.target.value);
    };
  };

  const updateData = async (
    url,
    requestBody,
    parentName,
    subCategoryName,
    childCategoryName
  ) => {
    try {
      const response = await fetch(url, requestBody);
      console.log(response);
      if (response.ok) {
        setIsFormSubmited(false);
        const data = await response.json();
        console.log(data);
        if (modalName === "edit") {
          alert("Updated Successfuly");
        } else {
          alert("Added Successfuly");
        }
        // Prepare data to be sent to the next page
        const attributeData = {
          parentName: parentName,
          subCategory: subCategoryName,
          childCategoryName: childCategoryName,
          id: data.added_entry._id,
        };

        const queryString = new URLSearchParams(attributeData).toString();

        // Redirect to the next page with the data in the query string
        window.location.href = `attribute?${queryString}`;
      }
    } catch (error) {
      setIsFormSubmited(false);
      alert(error);
      console.log(error);
    }
  };

  // State for selected parentlistid
  const [selectedParentId, setSelectedParentId] = useState("");
  // State for selected parentlistid
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
  const parentListRef = useRef(null);
  const subCategoryListRef = useRef(null);

  const handleSelect = (e) => {
    if (parentListRef.current) {
      const selectedOption = Array.from(parentListRef.current.options).find(
        (option) => option.value === e.target.value
      );
      if (selectedOption && selectedOption.dataset) {
        setSelectedParentId(selectedOption.dataset.id);
      }
    }
    if (subCategoryListRef.current) {
      const selectedOption = Array.from(
        subCategoryListRef.current.options
      ).find((option) => option.value === e.target.value);
      if (selectedOption && selectedOption.dataset) {
        setSelectedSubCategoryId(selectedOption.dataset.id);
      }
    }
  };

  // State for parentlist data
  const [parentList, SetParentList] = useState([]);

  useEffect(() => {
    if (modalName !== "edit") {
      fetch(
        `${process.env.REACT_APP_URL}/v1/categories/get-populated?filter[category_type][$eq]=parent&limit=500`
      )
        .then((res) => res.json())
        .then((data) => {
          SetParentList(data.categoryList);
        });
    }
  }, [modalName]);

  // State for Sub Category list
  const [subCategoryList, setSubCategoryList] = useState([]);

  useEffect(() => {
    if (modalName !== "edit") {
      if (selectedParentId) {
        fetch(
          `${process.env.REACT_APP_URL}/v1/categories/get?filter[parent_category_id][$eq]=${selectedParentId}&filter[category_type][$eq]=sub`
        )
          .then((res) => res.json())
          .then((data) => {
            setSubCategoryList(data.categoryList);
            console.log(data.categoryList);
          });
      } else {
        setSubCategoryList([]);
      }
    }
  }, [selectedParentId, modalName]);

  const [childData, setChildData] = useState([]);
  // feting data of child attribute by id for edit

  useEffect(() => {
    if (modalName === "edit" || modalName === "view") {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_URL}/v1/categories/get-populated/${id}`
          );
          const data = await response.json();

          setChildData(data.category);
          console.log(data.category);
          setFormData({
            parent_category: data?.category?.parent_category_id?.category_name,
            sub_category: data?.category?.sub_category_id?.category_name,
            category_name: data?.category?.category_name,
            category_desc: data?.category?.category_desc,
          });
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [modalName, id]);

  // state for form data
  const [formData, setFormData] = useState({
    parent_category: "",
    sub_category: "",
    category_name: "",
    category_desc: "",
    category_img: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((preValue) => {
      return { ...preValue, [name]: value };
    });
  };
  // Handling Form Submission
  const handleSubmit = (e) => {
    const access_token = localStorage.getItem("access_token");
    e.preventDefault();
    // Add child category to backend
    let slug = slugify(formData.category_name);
    let parentName = formData.parent_category;
    let subCategoryName = formData.sub_category;
    let childCategoryName = formData.category_name;


    const data =
      modalName === "edit"
        ? {
            category_desc: formData.category_desc,
            _id: id,
            category_type: "child",
            category_img: selectedFile,
          }
        : {
            category_name: formData.category_name,
            category_slug: slug,
            category_desc: formData.category_desc,
            parent_category_id: selectedParentId,
            sub_category_id: selectedSubCategoryId,
            category_type: "child",
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

    if (modalName !== "edit" && selectedSubCategoryId) {
      updateData(
        `${process.env.REACT_APP_URL}/v1/categories/add`,
        requestOptions,
        parentName,
        subCategoryName,
        childCategoryName,
        selectedParentId
      );
    }
    if (modalName !== "edit" && selectedParentId && !selectedSubCategoryId) {
      const attributeData = {
        parentName: parentName,
        subCategory: subCategoryName,
        childCategoryName: childCategoryName,
        id: selectedParentId,
      };

      const queryString = new URLSearchParams(attributeData).toString();

      // Redirect to the next page with the data in the query string
      navigate(`/category/attribute?${queryString}`);
    }

    if (modalName === "edit") {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_URL}/v1/categories/edit/${id}`,
            requestOptions
          );

          if (response.ok) {
            alert("Updated Successfully");
            const data = await response.json();
            console.log(data);
            const attributeData = {
              parentName: childData?.parent_category_id?.category_name,
              subCategory: childData?.sub_category_id?.category_name,
              childCategoryName: childData?.category_name,
              id: childData?._id,
              modalName: "edit",
            };
            const queryString = new URLSearchParams(attributeData).toString();
            // Redirect to the next page with the data in the query string
            navigate(`/category/attribute?${queryString}`);
          }
        } catch (error) {
          alert(error);
          console.log(error);
        }
      };
      fetchData();
    }
  };
  // console.log('selectedParentId', selectedParentId);
  // console.log('selectedSubId', selectedSubCategoryId);
  // console.log(id);
  if (visible)
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
                  Selected Parent Categories
                </p>
                <input
                  onChange={(e) => {
                    handleSelect(e);
                    handleChange(e);
                  }}
                  name="parent_category"
                  value={formData.parent_category}
                  disabled={modalName === "edit" || modalName === "view"}
                  autoComplete="off"
                  list="parentList"
                  className="h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                  type="text"
                />
                <datalist
                  ref={parentListRef}
                  id="parentList"
                  className="bg-white mt-2 absolute z-10"
                >
                  {parentList.map((list) => (
                    <option
                      key={list._id}
                      value={list.category_name}
                      data-id={list._id}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {list.category_name}
                    </option>
                  ))}
                </datalist>
              </div>
              <div className="w-1/2 flex flex-col">
                <p className="w-fit text-sm text-gray-900  py-1 uppercase ">
                  Select Sub-Categories
                </p>
                <input
                  onChange={(e) => {
                    handleSelect(e);
                    handleChange(e);
                  }}
                  list="sub-category-list"
                  name="sub_category"
                  value={formData.sub_category}
                  disabled={subCategoryList.length === 0}
                  autoComplete="off"
                  className=" h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                  type="text"
                />
                <datalist
                  ref={subCategoryListRef}
                  id="sub-category-list"
                  className="bg-white mt-2 absolute z-10"
                >
                  {subCategoryList &&
                    subCategoryList.map((list) => (
                      <option
                        key={list._id}
                        value={list.category_name}
                        data-id={list._id}
                        class="p-2 cursor-pointer hover:bg-gray-100"
                      ></option>
                    ))}
                </datalist>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-1/2 flex flex-col">
                <p className="w-fit text-sm text-gray-900  py-1 uppercase">
                  Child Category Name
                </p>
                <input
                  onChange={handleChange}
                  name="category_name"
                  value={formData.category_name}
                  autoComplete="off"
                  disabled={subCategoryList.length === 0}
                  className="h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                  type="text"
                  maxLength={80}
                />
              </div>
              <div className="w-1/2 flex flex-col">
                <p className="w-fit text-sm text-gray-900  py-1 uppercase ">
                  Child Category Id
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
              Category Desc
            </p>
            <textarea
            maxLength={160}
              onChange={handleChange}
              name="category_desc"
              value={formData.category_desc}
              disabled={
                modalName === "edit" ? false : subCategoryList.length === 0
              }
              className="h-24 my-5 px-4 py-2 outline-0 border border-solid border-gray-200 resize-none rounded-md"
              type="text"
            />
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
                className="py-2 px-4 bg-red-600 text-white rounded-sm"
              >
                Cancel
              </div>

              {modalName !== "view" && (
                <div
                  className={`${
                    (isFormSubmited ||
                      formData.category_name === "" ||
                      formData.category_desc === "") &&
                    "cursor-not-allowed"
                  }`}
                >
                  <button
                    className={`py-2 px-10 bg-[#00388c] text-white rounded-sm uppercase ${
                      (isFormSubmited ||
                        formData.category_name === "" ||
                        formData.category_desc === "") &&
                      "pointer-events-none"
                    }`}
                    type="submit"
                  >
                    Next Step
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
};

export default ChildCategoriesModal;
