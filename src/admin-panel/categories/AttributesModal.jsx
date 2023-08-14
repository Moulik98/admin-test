import React, { useEffect, useState, useRef } from "react";


const AttributesModal = ({ visible, onClose, id, modalName }) => {
  // const [categoriesName, setCategoriesName] = useState("");
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const dataListRef = useRef(null);

  const handleSelect = (event) => {
    const selectedOption = Array.from(dataListRef?.current.options).find(
      (option) => option.value === event.target.value
    );
    setSelectedOptionId(selectedOption?.dataset.id);
  };

  const slugify=(text)=>{
    return text
      .toString()                     // Convert input to string
      .toLowerCase()                  // Convert to lowercase
      .replace(/\s+/g, '_')           // Replace whitespace with underscore
      .replace(/[^\w\-]+/g, '')       // Remove non-word characters (except underscore)
      .replace(/\-\-+/g, '_')         // Replace multiple underscores with single underscore
      .replace(/^-+|-+$/g, '');       // Remove leading/trailing underscores
  }

  const updateData = (url, requestOptions) => {
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          onClose();
          console.log(data);
        }
      })
      .catch((error) => console.log(error));
  };

  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  const [parentList, SetParentList] = useState([]);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/v1/attribute-groups/get?page=1&limit=100`
    )
      .then((res) => res.json())
      .then((data) => {
        SetParentList(data.attributeList);
        console.log(data.attributeList);
      });
  }, []);

  const [formData, SetFormData] = useState({
    subGroup: "",
    attributeName: "",
    description: "",
    attribute_group_name: "",
    input_type: "",
    attribute_name_chinese:""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetFormData((preValue) => {
      return { ...preValue, [name]: value };
    });
  };

  const groupName = (string) => {
    return string
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s_' "]+/g, "_") // Replace spaces, underscores, and apostrophes with hyphens
      .replace(/[^\w-]+/g, "") // Remove all non-word characters except hyphens
      .replace(/--+/g, "_"); // Replace multiple hyphens with a single hyphen
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let slug = slugify(formData.attributeName);
    let atslug = groupName(formData.attribute_group_name);

    const data =
      modalName === "edit"
        ? {
            attribute_desc: formData.description,
          }
        : {
            attribute_slug: slug,
            attribute_name: formData.attributeName,
            attribute_group_name: formData.attribute_group_name,
            attribute_group_slug: atslug,
            attribute_desc: formData.description,
            input_type: formData.input_type,
            attribute_name_chinese:  formData.attribute_name_chinese
          };
    console.log(data);

    const access_token = localStorage.getItem("access_token");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(data),
    };

    if (modalName === "edit") {
      updateData(
        `${process.env.REACT_APP_URL}/v1/attributes/edit/${id}`,
        requestOptions
      );
    } else {
      updateData(
        `${process.env.REACT_APP_URL}/v1/attributes/add`,
        requestOptions
      );
    }
    SetFormData({
      attributeName: "",
      description: "",
      input_type: "",
      attribute_name_chinese:""

    });

    onClose();
  };

  const [view, setView] = useState([]);

  useEffect(() => {
    if (modalName === "view" || modalName === "edit") {
      fetch(`${process.env.REACT_APP_URL}/v1/attributes/get/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setView(data.attribute);
          console.log(data);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  }, [id, modalName]);

  if (visible);
  return (
    <div className=" fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="w-1/2 mx-auto bg-white rounded py-5 px-10">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex gap-5">
            <div className="w-1/2 flex flex-col">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase">
                Select Sub-Group
              </p>
              <input
                autocomplete="off"
                list="parentList"
                name="attribute_group_name"
                placeholder={view && view.attribute_group_name}
                disabled={modalName === "view" || modalName === "edit"}
                onChange={(e) => {
                  handleSelect(e);
                  handleChange(e);
                }}
                value={formData.group_name}
                className="h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
              />
              <datalist
                id="parentList"
                ref={dataListRef}
                class="bg-white mt-2 absolute z-10"
              >
                {parentList.map((list) => (
                  <option
                    data-id={list?._id}
                    key={list?._id}
                    value={list?.group_name}
                    class="p-2 cursor-pointer hover:bg-gray-100"
                  ></option>
                ))}
              </datalist>
            </div>
            <div className="w-1/2 flex flex-col">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase">
                Attribute Name
              </p>
              <input
                name="attributeName"
                placeholder={view && view.attribute_name}
                onChange={handleChange}
                disabled={modalName === "view" || modalName === "edit"}
                value={formData.attributeName}
                className="h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
              />
            </div>
          </div>
          <div className="flex gap-5">
            <div className="w-1/2 flex flex-col">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase">
                Attribute type
              </p>
              <select
                name="input_type"
                value={formData.input_type}
                onChange={handleChange}
                required
                className="h-10 my-5 px-4 mt-5 outline-0 border border-solid border-gray-200 rounded-md"
                disabled={modalName === "view" || modalName === "edit"}
              >
                <option
                  value=""
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  --Select
                </option>
                <option value="number">Number</option>
                <option value="text">Text</option>
                <option value="date">Date</option>
                <option value="checkbox">Checkbox</option>
                <option value="array">Array</option>
              </select>
            </div>
            <div className="w-1/2 flex flex-col">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase ">
                Attribute Id
              </p>
              <input
                placeholder={
                  (formData.attributeName && slugify(formData.attributeName+"_"+formData.attribute_group_name)) ||
                  (view && view.attribute_slug)
                }
                disabled
                className=" h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-col">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase">
                Attribute Chinese Name
              </p>
              <input
                name="attribute_name_chinese"
                placeholder={view && view.attribute_name_chinese}
                onChange={handleChange}
                disabled={modalName === "view" || modalName === "edit"}
                value={formData.attribute_name_chinese}
                className="h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
              />
            </div>

          <p className="w-fit text-sm text-gray-900  py-1 uppercase ">
            Description
          </p>
          <textarea
            onChange={handleChange}
            value={formData.description}
            name="description"
            placeholder={view && view.attribute_desc}
            disabled={modalName === "view"}
            className="h-24 my-5 px-4 outline-0 border border-solid border-gray-200 resize-none rounded-md"
            type="text"
          />

          <div className="flex gap-x-5 justify-center my-5">
            <div
              onClick={() => onClose()}
              className="py-2 px-4 bg-white text-red-600 rounded-sm"
            >
              Cancel
            </div>

            {modalName === "view" ? null : (
              <button
                className="py-2 px-10 bg-[#00388c] text-white rounded-lg uppercase"
                type="submit"
              >
                add new
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttributesModal;
