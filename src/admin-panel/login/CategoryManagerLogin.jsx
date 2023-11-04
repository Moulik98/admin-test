import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CategoryManagerLogin = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });

  const redirect = (role) => {
    switch (role) {
      case 'CM':
        navigate('/category-manager-dashboard')
        break;
      case 'CH':
        navigate('/category-head-dashboard')
        break;
      case 'PM':
        navigate('/product-manager-dashboard')
        break;
      case 'DMM':
        navigate('/digitalmarketing-manager-dashboard')
        break;
      case 'QAA':
        navigate('/qaapprover-dashboard')
        break;
      default:
        console.log('Unknown Role');
    }

  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessage('')
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = `${process.env.REACT_APP_URL}/v1/category-manager/cm-signin`;
    console.log(formData);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.message) {
        setMessage(data.message)
      }
      console.log('data', data)
      if (response.ok) {
        const token = data.access_token
        localStorage.setItem("access_token", token);
        const role = data.roles[0]
        if (role) {
          redirect(role)
        }
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during authentication', error);
    }
  };


  return (
    <div className="flex w-full max-w-screen-2xl mx-auto">
      {/* left part */}

      <div className="bg-gradient-to-b from-[#0573e3] to-[#031d7a]  w-7/12  h-screen flex justify-center items-center">
        <div className="">
          <h1 className="text-white  text-5xl font-semibold ">
            21 Genx Admin Portal
          </h1>
          <p className="text-white py-4 text-xl">
            The most robust and functional admin panel
          </p>
        </div>
      </div>

      {/* right part */}
      <div className="flex items-center justify-center w-5/12">
        <form className=" mx-auto w-72 " onSubmit={handleSubmit}>
          <div>
            <h1 className="text-4xl font-bold">Hello Again!</h1>
            <h3 className="text-2xl font-semibold pb-8 pt-3">Welcome Back</h3>
          </div>
          <div className="mb-4">
            <p className=" flex gap-2 shadow appearance-none border rounded-full w-full py-3 px-3 text-[#c2c2c2] leading-tight focus:outline-none focus:shadow-outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-[#c2c2c2]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>

              <input
                className="text-black outline-0"
                name="userName"
                type="text"
                placeholder="User Name"
                value={formData.userName}
                onChange={handleInputChange}
              />
            </p>
          </div>
          <div className="mb-2">
            <p className="flex gap-2 shadow appearance-none border rounded-full w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-[#c2c2c2]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>

              <input
                className="outline-0"
                name="password"
                type="password"
                placeholder="password "
                value={formData.password}
                onChange={handleInputChange}

              />
            </p>
          </div>
          <div className="flex flex-col">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white  py-3 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log In
            </button>

          </div>
          <p className="text-red-500 text-sm">{message}</p>
        </form>

      </div>
    </div>
  );
};
