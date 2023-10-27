"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const SignupForm = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [access_token, setToken] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("access_token");
      console.log("add-product", accessToken);
      setToken(accessToken);
    }
  }, []);
  const [data, setData] = useState({
    sellerType: "business",
    fullname: "",
    email: "",
    phone: "",
    password: "",
    store_name: "",
    gst_number: "",
    pan_number: "",
  });

  const [gstCertificate, setGstCertificate] = useState(null);
  const [panCard, setPanCard] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((preValue) => {
      return { ...preValue, [name]: value };
    });
  };

  const handleGstCertificateChange = (event) => {
    console.log(event.target.files[0]);
    setGstCertificate(event.target.files[0]);
  };

  const handlePanCardChange = (event) => {
    console.log(event.target.files[0]);
    setPanCard(event.target.files[0]);
  };

  async function Signup(url, formData, accessToken) {
      console.log("url", url);
      console.log("formData", formData);
      console.log("access token", accessToken);
      setResponseMessage('')
      try {
          const response = await fetch(url, {
              method: "POST",
              body: formData,
              headers: {
                  Authorization: `Bearer ${accessToken}`,
              },
          });
          console.log(response);
          const responseData = await response.json();
          console.log(responseData);
          if (response.ok) {
              // Removing items from localStorage
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              localStorage.removeItem('userId');
            toast.success("Registration successful",responseData.message);
          } else {
              setResponseMessage(responseData.message)
          }
          // Process the response data as needed
      } catch (error) {
          console.error(error);
          // Handle the error and display an error message to the user
      }
  }

  const [validationMessage, setValidationMessage] = useState({
      password: '',
      confirmPassword: '',
      gstNumber: '',
      panNumber: ''
  })

  const handleSubmit = (event) => {
      event.preventDefault();
      const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;
      const gstRegx = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
      const panRegx = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

      const isValidPassword = passwordRegx.test(data.password);
      const isValidGst = gstRegx.test(data.gst_number);
      const isValidPan = panRegx.test(data.pan_number);

      if (!isValidPassword) {
          setValidationMessage((preValue) => ({
              ...preValue,
              password: 'Password is weak '
          }));
      } else {
          setValidationMessage((preValue) => ({
              ...preValue,
              password: ''
          }));
      }
      if (!isValidGst) {
          setValidationMessage((preValue) => ({
              ...preValue,
              gstNumber: 'Invalid GST number.'
          }));
      } else {
          setValidationMessage((preValue) => ({
              ...preValue,
              gstNumber: ''
          }));
      }
      if (!isValidPan) {
          setValidationMessage((preValue) => ({
              ...preValue,
              panNumber: 'Invalid PAN number.'
          }));
      } else {
          setValidationMessage((preValue) => ({
              ...preValue,
              panNumber: ''
          }));
      }

      const formData = new FormData();
      formData.append("sellerType", data.sellerType);
      formData.append("fullname", data.fullname);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("store_name", data.store_name);
      formData.append("gst_number", data.gst_number);
      formData.append("pan_number", data.pan_number);
      formData.append("panImageUrl", panCard);
      formData.append("gstImageUrl", gstCertificate);

      console.log('formData', formData);
      return;
      const url = process.env.REACT_APP_URL + 'v1/category-manager/sellerCompleteSignupByCm'; // Fixed the URL by adding a slash before the endpoint
      console.log(url);
      if (isValidPassword && isValidGst && isValidPan) {
          Signup(url, formData, access_token);
          console.log('signup', access_token);
      }
  };

  return (
    <div className="flex w-full max-w-screen-2xl mx-auto">
      {/* left part */}

      <div className="bg-gradient-to-b from-[#0573e3] to-[#031d7a]  w-7/12  min-h-screen flex justify-center items-center">
        <div className="">
          <h1 className="text-white  text-5xl font-semibold ">
            21 Genx Seller Portal
          </h1>
          <p className="text-white py-4 text-xl">
            The most robust and functional seller panel
          </p>
        </div>
      </div>

      {/* right part */}
      <div className="flex items-center justify-center w-6/12 pb-3">
        <form className=" mx-auto  " onSubmit={handleSubmit}>
          <div>
            <h1 className="text-4xl font-bold text-center">Hello!</h1>
            <h3 className="text-2xl font-semibold pb-4 pt-3 text-center">
              Sign Up to Get Started
            </h3>
          </div>

          <div class="flex items-center pb-4 justify-center">
            <div class="mr-4 flex items-center">
              <input
                className="h-4 w-4 text-indigo-600"
                defaultChecked
                type="radio"
                id="radio1"
                name="sellerType"
                value="business"
                onChange={handleChange}
              />
              <label for="radio1" class="ml-2 text-gray-700">
                Established Business
              </label>
            </div>
            <div className="flex items-center">
              <input
                className="h-4 w-4 text-indigo-600"
                type="radio"
                id="radio2"
                name="sellerType"
                value="startup"
                onChange={handleChange}
              />
              <label for="radio2" class="ml-2 text-gray-700">
                Startup
              </label>
            </div>
          </div>

          <div className="mb-2">
            <p className=" flex gap-2 shadow appearance-none border rounded-full w-full py-2 px-3 text-[#c2c2c2] leading-tight focus:outline-none focus:shadow-outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>

              <input
                className="w-full text-black outline-0"
                id="name"
                type="text"
                placeholder="Full Name"
                name="fullname"
                value={data.fullname}
                onChange={handleChange}
                required
              />
            </p>
          </div>
          <div className="mb-2">
            <p className=" flex gap-2 shadow appearance-none border rounded-full w-full py-2 px-3 text-[#c2c2c2] leading-tight focus:outline-none focus:shadow-outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-[#c2c2c2]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>

              <input
                className="w-full text-black outline-0"
                id="email"
                type="email"
                placeholder="Email Address"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
              />
            </p>
          </div>
          <div className="mb-2">
            <p className=" flex gap-2 shadow appearance-none border rounded-full w-full py-2 px-3 text-[#c2c2c2] leading-tight focus:outline-none focus:shadow-outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>

              <input
                className="w-full text-black outline-0"
                id="phone"
                type="phone"
                placeholder="Phone Number"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                required
              />
            </p>
          </div>
          <div className="mb-2 flex flex-col">
            <p className="flex gap-2 shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-[#c2c2c2]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>

              <input
                className="outline-0 grow"
                id="password"
                type={`${showPassword ? "textx" : "password"}`}
                placeholder="password"
                name="password"
                required
                value={data.password}
                onChange={handleChange}
              />
              {showPassword ? (
                <div onClick={() => setShowPassword((preValue) => !preValue)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                </div>
              ) : (
                <div onClick={() => setShowPassword((preValue) => !preValue)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              )}
            </p>
            {/* {validationMessage.password ? (
              <p className="text-red-500 max-w-sm">
                {validationMessage.password}
              </p>
            ) : null} */}
          </div>
          <div className="mb-2">
            <p className=" flex gap-2 shadow appearance-none border rounded-full w-full py-2 px-3 text-[#c2c2c2] leading-tight focus:outline-none focus:shadow-outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>

              <input
                className="w-full text-black outline-0"
                id="store"
                type="text"
                name="store_name"
                placeholder="Store Name"
                value={data.store_name}
                onChange={handleChange}
                required
              />
            </p>
          </div>

          <div className="mb-2 flex flex-col">
            <p className="flex gap-2 shadow appearance-none border rounded-full w-full py-2 px-3 text-[#c2c2c2] mb-3 leading-tight focus:outline-none focus:shadow-outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                />
              </svg>

              <input
                className=" w-full text-black outline-0"
                id="gst"
                type="text"
                placeholder="GST Number"
                name="gst_number"
                value={data.gst_number}
                onChange={handleChange}
                required
              />
            </p>
          </div>
          <div className="mb-2 flex flex-col">
            <p className="flex gap-2 shadow appearance-none border rounded-full w-full py-2 px-3 text-[#c2c2c2] mb-3 leading-tight focus:outline-none focus:shadow-outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                id="card"
                fill="none"
                stroke="currentColor"
                className="h-6 w-6 text-gray-300"
              >
                <path d="M14.9683,4.2461H5.0317a2.503,2.503,0,0,0-2.5,2.5v6.5078a2.503,2.503,0,0,0,2.5,2.5h9.9366a2.503,2.503,0,0,0,2.5-2.5V6.7461A2.503,2.503,0,0,0,14.9683,4.2461Zm-9.9366,1h9.9366a1.5016,1.5016,0,0,1,1.5,1.5v.6558H3.5317V6.7461A1.5016,1.5016,0,0,1,5.0317,5.2461Zm9.9366,9.5078H5.0317a1.5016,1.5016,0,0,1-1.5-1.5V8.4019H16.4683v4.852A1.5016,1.5016,0,0,1,14.9683,14.7539Zm.1333-2.3384a.5.5,0,0,1-.5.5H13.4028a.5.5,0,0,1,0-1h1.1988A.5.5,0,0,1,15.1016,12.4155Z"></path>
              </svg>

              <input
                className=" w-full text-black outline-0"
                id="gst"
                type="text"
                placeholder="PAN Number"
                name="pan_number"
                value={data.pan_number}
                onChange={handleChange}
                required
              />
            </p>
          </div>
          <div className="flex gap-2 py-auto text-xs w-80">
            <div className="">ATTACHMENTS-</div>
            <div>
              <div className=" flex">
                <div className="w-2/3 uppercase ">Upload gst certificate*</div>
                <input
                  accept="application/pdf"
                  type="file"
                  className="custom-file-input  h-8 border-2 border-white  pl-1"
                  title="upload"
                  required
                  onChange={handleGstCertificateChange}
                //   value={gstImage}
                />
              </div>

              <div className="flex justify-center">
                <div className="w-2/3 uppercase pt-1">Upload pan card</div>
                <input
                  required
                  accept="application/pdf"
                  type="file"
                  className="custom-file-input  h-8 border-2 border-white  pl-1"
                  onChange={handlePanCardChange}
                //   value={panImage}
                />
              </div>
            </div>
          </div>

          <button
            className="bg-blue-500 w-full hover:bg-blue-700 text-white  py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>

          <div></div>
        </form>
      </div>
    </div>
  );
};
export default SignupForm;
