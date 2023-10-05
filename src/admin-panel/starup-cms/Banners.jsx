import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../user/User'
import UploadIcon from './UploadIcon'
const Banners = () => {
    const [isClicked, setIsClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [main_img, setMain_img] = useState("");
    const [img_2, setImg_2] = useState("");
    const [img_3, setImg_3] = useState("");
    const [img_4, setImg_4] = useState("");
    const [img_5, setImg_5] = useState("");
    const [img_6, setImg_6] = useState("");
    const [img_7, setImg_7] = useState("");
    const [img_8, setImg_8] = useState("");

    const [main_img_preview, setMain_img_preview] = useState(null);
    const [img_2_preview, setImg_2_preview] = useState(null);
    const [img_3_preview, setImg_3_preview] = useState(null);
    const [img_4_preview, setImg_4_preview] = useState(null);
    const [img_5_preview, setImg_5_preview] = useState(null);
    const [img_6_preview, setImg_6_preview] = useState(null);
    const [img_7_preview, setImg_7_preview] = useState(null);
    const [img_8_preview, setImg_8_preview] = useState(null);

    const handleInputChange = (event) => {
        const { name, files } = event.target;
        const file = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            switch (name) {
                case "main_img":
                    setMain_img(reader.result);
                    setMain_img_preview(URL.createObjectURL(file));
                    break;
                case "img_2":
                    setImg_2(reader.result);
                    setImg_2_preview(URL.createObjectURL(file));
                    break;
                case "img_3":
                    setImg_3(reader.result);
                    setImg_3_preview(URL.createObjectURL(file));
                    break;
                case "img_4":
                    setImg_4(reader.result);
                    setImg_4_preview(URL.createObjectURL(file));
                    break;
                case "img_5":
                    setImg_5(reader.result);
                    setImg_5_preview(URL.createObjectURL(file));
                    break;
                case "img_6":
                    setImg_6(reader.result);
                    setImg_6_preview(URL.createObjectURL(file));
                    break;
                case "img_7":
                    setImg_7(reader.result);
                    setImg_7_preview(URL.createObjectURL(file));
                    break;
                case "img_8":
                    setImg_8(reader.result);
                    setImg_8_preview(URL.createObjectURL(file));
                    break;
                default:
                    break;
            }
        };
    };
    const handleSubmit = (event) => {
        event.preventDeafault()
        // setIsLoading(true)
        // console.log("hii");
        // event.preventDefault();
        // const data = {
        //     product_id: id,
        //     main_img,
        //     img_2,
        //     img_3,
        //     img_4,
        //     img_5,
        //     img_6,
        //     img_7,
        //     img_8,
        // };
        // console.log(data);
        // axios
        //     .post(`${process.env.REACT_APP_URL}/v1/product-images/add`, data, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${accessToken}`  // Replace YOUR_TOKEN_HERE with your actual Bearer token
        //         }
        //     })
        //     .then((response) => {
        //         if (response.status === 200) {
        //             alert('Image Uploaded Successfully')
        //             setIsLoading(false)
        //         }
        //         console.log(response);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         setIsLoading(false)
        //         alert(error)
        //     });
    };

    return (
        <main className='flex flex-col'>
            <section className='mr-7'>
                <div className='max-w-6xl mx-auto flex justify-between items-center py-5'>
                    <Link to='/review-rating' className='text-3xl text-gray-900 font-semibold'>Startup Banners</Link>
                    <div className='flex gap-x-10'>
                        <form className="flex items-center">
                            <div className="flex items-center px-2 py-1 gap-x-1 bg-gray-100 rounded-2xl ">
                                <div className=' bg-white rounded-full p-1'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    className="w-52 py-1 px-1 bg-gray-100 outline-0"
                                    //   value={searchTerm}
                                    //   onChange={handleSearch}
                                    type="text"
                                />

                            </div>
                        </form>
                        <User />
                    </div>
                </div>
            </section>
            <section className='w-full flex flex-wrap '>
                <div className="w-full mt-4 gap-4 ">
                    <form onSubmit={(e) => handleSubmit(e)} className="w-full">
                        <div className="w-full grid grid-cols-4 grid-flow-row gap-4 px-8 py-6">
                            <div className="relative">
                                <input
                                    type="file"
                                    name="main_img"
                                    id="main_img"
                                    onChange={handleInputChange}
                                    className="border bg-[#e2eced] border-gray-400 h-8 w-full rounded-md px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <div className="w-full h-40 bg-[#e2eced] flex items-center justify-center">
                                    <UploadIcon />

                                    {main_img_preview && (
                                        <img
                                            src={main_img_preview}
                                            alt="Main Image Preview"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type="file"
                                    name="img_2"
                                    id="img_2"
                                    onChange={handleInputChange}
                                    className="border bg-[#e2eced] border-gray-400 h-8 w-full rounded-md px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <div className="w-full h-40 bg-[#e2eced] flex items-center justify-center">
                                    <UploadIcon />

                                    {img_2_preview && (
                                        <img
                                            src={img_2_preview}
                                            alt="Main Image Preview"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type="file"
                                    name="img_3"
                                    id="img_3"
                                    onChange={handleInputChange}
                                    className="border bg-[#e2eced] border-gray-400 h-8 w-full rounded-md px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <div className="w-full h-40 bg-[#e2eced] flex items-center justify-center">
                                    <UploadIcon />

                                    {img_3_preview && (
                                        <img
                                            src={img_3_preview}
                                            alt="Main Image Preview"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type="file"
                                    name="img_4"
                                    id="img_4"
                                    onChange={handleInputChange}
                                    className="border bg-[#e2eced] border-gray-400 h-8 w-full rounded-md px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <div className="w-full h-40 bg-[#e2eced] flex items-center justify-center">
                                    <UploadIcon />

                                    {img_4_preview && (
                                        <img
                                            src={img_4_preview}
                                            alt="Main Image Preview"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type="file"
                                    name="img_5"
                                    id="img_5"
                                    onChange={handleInputChange}
                                    className="border bg-[#e2eced] border-gray-400 h-8 w-full rounded-md px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <div className="w-full h-40 bg-[#e2eced] flex items-center justify-center">
                                    <UploadIcon />

                                    {img_5_preview && (
                                        <img
                                            src={img_5_preview}
                                            alt="Main Image Preview"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type="file"
                                    name="img_6"
                                    id="img_6"
                                    onChange={handleInputChange}
                                    className="border bg-[#e2eced] border-gray-400 h-8 w-full rounded-md px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <div className="w-full h-40 bg-[#e2eced] flex items-center justify-center">
                                    <UploadIcon />

                                    {img_6_preview && (
                                        <img
                                            src={img_6_preview}
                                            alt="Main Image Preview"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type="file"
                                    name="img_7"
                                    id="img_7"
                                    onChange={handleInputChange}
                                    className="border bg-[#e2eced] border-gray-400 h-8 w-full rounded-md px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <div className="w-full h-40 bg-[#e2eced] flex items-center justify-center">
                                    <UploadIcon />

                                    {img_7_preview && (
                                        <img
                                            src={img_7_preview}
                                            alt="Main Image Preview"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type="file"
                                    name="img_8"
                                    id="img_8"
                                    onChange={handleInputChange}
                                    className="border bg-[#e2eced] border-gray-400 h-8 w-full rounded-md px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />

                                <div className="w-full h-40 bg-[#e2eced] flex items-center justify-center">
                                    <UploadIcon />

                                    {img_8_preview && (
                                        <img
                                            src={img_8_preview}
                                            alt="Main Image Preview"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    )}
                                </div>
                            </div>

                        </div>

                        <div className="flex justify-end max-w-5xl  mx-10">                                                 <button
                            className="text-white text-xs  font-normal border border-solid border-[#E3ECED] shadow-[0px,1px,2px,#B5B5B5] rounded-sm py-2 px-6 bg-[#008296] inline-block "
                            type="submit"
                        >

                            Save
                        </button>

                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default Banners