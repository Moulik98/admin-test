import React, { useEffect, useState } from "react";

const CountryListModal = ({ visible, onClose, id, modalName }) => {
  const [fileInputState, setFileInputState] = useState("");
  const [logo, setLogo] = useState();
  const [banner, setBanner] = useState();


  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (e.target.name === 'logoInput') {
        setLogo(reader.result);  // Update logo state
      } else if (e.target.name === 'bannerInput') {
        setBanner(reader.result);  // Update banner state
      }
    };
  };
  
  

  const updateData = (url, requestBody) => {
    fetch(url, requestBody)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          onClose();
          console.log(data);
        }
      })
      .catch((error) => console.log(error));
  };

  const [formData, SetFormData] = useState({
    country_name: "",
    image: "",
    banner:""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetFormData((preValue) => {
      return { ...preValue, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    const token= localStorage.getItem('access_token')
    e.preventDefault();
    const data = {
      country_name: formData.country_name,

      image: logo,
      banner : banner,
    };
    console.log(data);
    // modalName === "edit"
    //   ? {
    //       country_name: formData.country_name, 
    //       image: selectedFile,
    //     }
    //   : {
    //       country_name: formData.country_name,
    //       image: selectedFile,
    //     };
     
    const result = modalName === "edit" ? data : { ...data };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, },
      
      body: JSON.stringify(data),
    };

    if (modalName==='edit') {
      updateData(
        `${process.env.REACT_APP_URL}/v1/country/update/${id}`,
        requestOptions
      );
    } else {
      updateData(
        `${process.env.REACT_APP_URL}/v1/country/add`,
        requestOptions
      );
    }
    SetFormData({
      country_name: "",
      image: "",
      banner : "",
    });
  };
  const [view, setView] = useState([]);
  useEffect(() => {
    if (modalName === "view" || modalName === "edit") {
      fetch(
        `${process.env.REACT_APP_URL}/v1/country/single-country/${id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setView(data.result);
          SetFormData({
            country_name: data.result.country_name,
            image: "",
            banner : "",
          });
          console.log(data.data);
        });
    }
  }, []);
  
  if (visible)
  return (
    <div className=" fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className=" mx-auto bg-white rounded py-5 px-10">
        <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex gap-5">
            <div className="w-1/2">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase ">
                Country Name
              </p>
              <textarea
                onChange={(e) => handleChange(e)}
                name="country_name"
                value={formData.country_name}
                placeholder={view && view.country_name}
                disabled={modalName === "view"}
                className="h-10 w-full
             my-5 px-4 outline-0 border border-solid border-gray-200 resize-none rounded-md"
                type="text"
              />
            </div>
            <div className="">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase ">
                Logo
              </p>
              <div>
                <input
                  onChange={handleFileInputChange}
                  disabled={modalName === "view"}
                  type="file"
                  name="logoInput"
                  className="border mt-6 p-1"
                />
              </div>
            </div>
            <div className="">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase ">
                Banner
              </p>
              <div>
                <input
                  onChange={handleFileInputChange}
                  disabled={modalName === "view"}
                  type="file"
                  name="bannerInput"
                  className="border mt-6 p-1"
                />
              </div>
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

export default CountryListModal;
