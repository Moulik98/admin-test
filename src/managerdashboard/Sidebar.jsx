import { useState } from "react";
import { Link } from "react-router-dom";
const SideBar = ({ menu }) => {

    const [open, setOpen] = useState(true);
    return (
        <div className="flex">
            <div
                className={` ${open ? "w-60" : "w-20 "} bg-dark-purple min-h-screen p-2  pt-8 relative duration-300 no-scrollbar`}
            >
                <div className={`absolute cursor-pointer -right-3 top-9 w-7 h-7 flex justify-center items-center  bg-[#F3F4F6] rounded-l-[4rem]
            rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>

                </div>

                <div className="flex justify-center gap-x-4 items-center">
                    <img
                        src="./assets/admin-panel/logo.png"
                        alt="logo"
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
                    />
                </div>
                <ul className="pt-6">
                    {menu.map((item, index) => (
                        <>
                            <li
                                key={index + index + index * 3}
                                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center justify-between mt-2
                                 ${index === 0 && "bg-light-white"
                                    } `}
                            >
                                <Link to={`${item.link}`} className="flex gap-x-4">
                                    {item.src}

                                    <span className={`${!open && "hidden"} origin-left duration-200`}>
                                        {item.title}
                                    </span>
                                </Link>
                            </li>

                        </>
                    ))}
                </ul>

            </div>

        </div>
    );
};
export default SideBar;
