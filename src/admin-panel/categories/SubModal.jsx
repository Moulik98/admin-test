import React, { useEffect, useState, useRef } from "react";
import slugify from "./Slugify";
import toast from "react-hot-toast";


const SubCategoriesModal = ({ visible, onClose, id, modalName }) => {

  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [categoriesName, setCategoriesName] = useState("");
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const dataListRef = useRef(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedFile(reader.result);
      setFileInputState(e.target.value);
    };
  };

  const handleSelect = (event) => {
    const selectedOption = Array.from(dataListRef.current.options).find(
      (option) => option.value === event.target.value
    );
    setSelectedOptionId(selectedOption.dataset.id);
  };

  const updateData = async (url, requestOptions) => {
    const response = await fetch(url,requestOptions)
    const data = await response.json();
    console.log("Data >>>",data);
    if(response.ok){
      toast.success([data.message]);
      onClose();
    }else{
      toast.error([data.message]);
    }
  }

  const [parentList, SetParentList] = useState([]);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_URL}/v1/categories/get-populated?filter[category_type][$eq]=parent&limit=100`
    )
      .then((res) => res.json())
      .then((data) => {
        SetParentList(data.categoryList);
        console.log(data);
      });
  }, []);

  const [formData, SetFormData] = useState({
    parentName: "",
    subName: "",
    description: "",
    category_img: "",
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    SetFormData((preValue) => {
      return { ...preValue, [name]: value }
    })
  }

  const handleSubmit = (e) => {
    const access_token = localStorage.getItem("access_token");
    e.preventDefault()
    let slug = slugify(formData.subName)

    const data = modalName === 'edit' ? {
      category_desc: formData.description,
      category_type: "sub",
      category_img: selectedFile,
    }
      :
      {
        category_name: formData.subName,
        category_slug: slug,
        category_desc: formData.description,
        category_type: "sub",
        parent_category_id: selectedOptionId,
        category_img: selectedFile,
      }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',Authorization: `Bearer ${access_token}` },
      body: JSON.stringify(data)
    };
    if (modalName === 'edit') {
      updateData(`${process.env.REACT_APP_URL}/v1/categories/edit/${id}`, requestOptions)
    }
    else {
      updateData(`${process.env.REACT_APP_URL}/v1/categories/add?filter[category_type][$eq]=sub`, requestOptions)
    }
    SetFormData({
      subName: "",
      description: "",
      category_img: "",
    })

  
  }


  const [view, setView] = useState([])
  
    useEffect(() => {
      if (modalName === 'view' || modalName === 'edit') {
      fetch(`${process.env.REACT_APP_URL}/v1/categories/get-populated/${id}`)
        .then(res => res.json())
        .then(data => {
          setView(data.category);
          console.log(data.category);
        });
      }
    }, [modalName,id]);
  
  



  if (visible);
  return (
    <div className=" fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="w-1/2 mx-auto bg-white rounded py-5 px-10">
        <form className="flex flex-col"
          onSubmit={handleSubmit}>
          <div className="flex gap-5">
            <div className="w-1/2 flex flex-col">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase">
                Selected Parent Categories
              </p>
              <input
                list="parentList"
                name="parentName"
                autoComplete="off"
                placeholder={view && view.parent_category_id?.category_name}
                disabled={modalName === 'view' || modalName === 'edit'}
                onChange={(e) => {
                  handleSelect(e);
                  handleChange(e);
                }}
                value={formData.parentName}
                className="h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
              />
              <datalist id="parentList" ref={dataListRef} class="bg-white mt-2 absolute z-10">
                {parentList.map((list) => (
                  <option
                    data-id={list._id}
                    key={list._id}
                    value={list.category_name}
                    class="p-2 cursor-pointer hover:bg-gray-100"
                  ></option>
                ))}
              </datalist>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="w-1/2 flex flex-col">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase">
                Sub Category Name
              </p>
              <input
              max={80}
                name="subName"
                placeholder={view && view.category_name}
                onChange={handleChange}
                disabled={modalName === 'view' || modalName === 'edit'}
                value={formData.subName}
                className="h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
              />
            </div>
            <div className="w-1/2 flex flex-col">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase ">
                Sub Category Id
              </p>
              <input
                placeholder={(formData.subName && slugify(formData.subName) || view && view.category_slug)}
                disabled
                className=" h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
              />
            </div>
          </div>

          <p className="w-fit text-sm text-gray-900 py-1 uppercase ">
            Description
          </p>
          <textarea
          maxLength={160}
           placeholder={view && view.category_desc}
            onChange={handleChange}
            value={formData.description}
            name="description"
            // placeholder={view && view.category_desc}
            disabled={modalName === 'view'}
            className="h-24 my-5 px-4 outline-0 py-2 border border-solid border-gray-200 resize-none rounded-md"
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
              className="py-2 px-10 bg-red-500 text-white rounded-sm"
            >
              Cancel
            </div>

            {
              modalName === 'view' ? null : <button
                className="py-2 px-10 bg-[#00388c] text-white rounded-sm uppercase"
                type="submit"
              >
                add new
              </button>
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubCategoriesModal;
