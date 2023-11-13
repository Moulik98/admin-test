import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar";
import { QAList } from "../../constant";
import TableRow from "./TableRow"; // Import the TableRow component

const QA = () => {
  const [pendingSellers, setPendingSellers] = useState([]);
  const token = localStorage.getItem("access_token");

  const fetchPendingSellers = async () => {
    const url =
      process.env.REACT_APP_URL + "/v1/qa-approver/onborded-sellers?isVerify=approved";
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setPendingSellers(data.pendingSellers);
      console.log(data.pendingSellers)
    } else {
      console.error("Failed to fetch pending sellers");
    }
  };

  useEffect(() => {
    fetchPendingSellers();
  }, []);

  return (
    <main className="max-w-full flex">
      <div className="sidebar bg-[#00388c] h-screen w-fit sticky top-0">
        <SideBar menu={QAList} />
      </div>
      <div className="max-w-full grow mx-8">
        <section className="flex flex-row justify-between py-5 items-center">
          <div>
            <h1 className="text-2xl md:text-3xl text-[#383E50] font-semibold leading-10">
              Dashboard
            </h1>
            <p className="text-sm leading-6 font-normal">
              Whole data about your business here
            </p>
          </div>
        </section>
        <section className="flex flex-col">
          <div>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Full Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Store Name</th>
                  <th className="px-4 py-2">Verification Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingSellers.map((seller, index) => (
                  <TableRow key={index} data={seller} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default QA;
