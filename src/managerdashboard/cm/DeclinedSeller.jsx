import React from 'react'
import SideBar from "../Sidebar";
import {categoryManagerMenu } from "../../constant";

const DeclinedSeller = () => {
    return (
        <div className="max-w-full flex">
            <div className="sidebar bg-[#00388c] h-screen w-fit sticky top-0">
                <SideBar menu={categoryManagerMenu} />
            </div>
            <div className="flex flex-col w-full mx-4">
            <h4 className='text-left text-xl text-[#383E50] font-medium py-2'>List of CMs</h4>
            <table className="w-full text-left text-xs">
                <thead className="bg-gray-100 text-xs font-medium uppercase text-[#666666]">
                    <tr>
                        <th scope="col" className="px-4 py-2">
                            Sl. NO
                        </th>
                        <th scope="col" className="px-4 py-2">
                            EmpCode
                        </th>

                        <th scope="col" className="px-4 py-2">
                            CM (username)
                        </th>

                        <th scope="col" className="px-4 py-2">
                            Contact No
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Mail Id
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Actions (View Details)
                        </th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
            </div>
        </div>
    )
}

export default DeclinedSeller