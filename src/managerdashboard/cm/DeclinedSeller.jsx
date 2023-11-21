import React, { useState,useEffect } from 'react'
import SideBar from "../Sidebar";
import {categoryManagerMenu } from "../../constant";
import TableRow from './TableRow';

const DeclinedSeller = () => {

    const [declinedsellers, setDeclinedSelllers] = useState([])
    const token = localStorage.getItem("access_token")
    const fetchDeclinedSellers = async () => {
        const url =
          process.env.REACT_APP_URL +
          "/v1/category-manager/decline/Onboard-Seller";
          console.log("Url",url)
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("Response Data >>>",data);
        if (response.ok) {
          setDeclinedSelllers(data.pendingSeller);
        } else {
          console.error("Failed to fetch pending sellers");
        }
      };
      console.log("Pending Sellers declined",declinedsellers)
    
      useEffect(() => {
        fetchDeclinedSellers();
      }, []);
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
                            Seller Declined
                        </th>

                        <th scope="col" className="px-4 py-2">
                             Seller Code 
                        </th>

                        <th scope="col" className="px-4 py-2">
                            Contact No
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Mail Id
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Business Type
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Store Name
                        </th>
                        <th scope="col" className="px-4 py-2">
                            Actions (View Details)
                        </th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(declinedsellers) &&
                  declinedsellers.map((item, index) => {
                    return <TableRow key={item._id} data={item} index={index} />;
                  })}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default DeclinedSeller