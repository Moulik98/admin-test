import { useState } from "react";
import Menus from "./Menus";
import { Link } from "react-router-dom";
const SideBar = () => {
    const [Menu, setMenus] = useState(Menus)
    const [open, setOpen] = useState(true);
      

    const setSubMenuOpen = (index) => {
        setMenus((prevMenus) =>
            prevMenus.map((menu, i) => {
                if (i === index) {
                    return { ...menu, isOpen: !menu.isOpen };
                }
                return menu;
            })
        );
    };
    console.log("Menu >>>>",Menu)
    return (
        <div className="flex">
            <div
                className={` ${open ? "w-60" : "w-20 "
                    } bg-dark-purple min-h-screen p-2  pt-8 relative duration-300 no-scrollbar`}
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
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                            }`}
                    />
                </div>
                <ul className="pt-6">
                    {Menu.map((Menu, index) => (
                        <>
                            <li
                                key={index + index + index * 3}
                                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center justify-between mt-2
                                 ${index === 0 && "bg-light-white"
                                    } `}
                            >
                                <Link to={`/${Menu.link}`} className="flex gap-x-4">
                                    <img className="w-5 h-5" src={Menu.src} alt={Menu.title} />
                                    <span className={`${!open && "hidden"} origin-left duration-200`}>
                                        {Menu.title}
                                    </span>
                                </Link>

                                {(Menu.subMenus && open) && (
                                    <div onClick={() => setSubMenuOpen(index)} className={`${Menu.isOpen && 'rotate-180'}`} >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>

                                    </div>
                                )}
                            </li>
                            {Menu.subMenus && Menu.isOpen && open && (
                                <ul>
                                    {Menu.subMenus.map((subMenuItem, index) => (
                                        <li
                                            key={subMenuItem.link}
                                            className="flex  px-5 cursor-pointer text-center text-sm text-gray-200 py-1"
                                        >
                                            <Link to={`${subMenuItem.link}`} className={`flex gap-x-2 ${!open && "hidden"} origin-left duration-200`}>
                                                {/* <img src={`../assets/admin-panel/${subMenuItem.src}.png`} /> */}
                                                <span>
                                                    {subMenuItem.title}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    ))}
                </ul>

            </div>
            {/* <div className="h-screen flex-1 p-7">
                <h1 className="text-2xl font-semibold ">Home Page</h1>
            </div> */}
        </div>
    );
};
export default SideBar;
