import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar";
import { QAList } from "../../constant";
import TableRow from "./TableRow";
import AttachmentModal from "./AttachmentModal"; // Import the TableRow component

const PendingSeller = () => {
  const [pendingSellers, setPendingSellers] = useState([]);
  const [viewAttachment, setViewAttachment] = useState(false);
  const token = localStorage.getItem("access_token");

  const handleClose = (value) => {
    if (value === "close") {
      setViewAttachment(false);
    }
    if (value === "verify") {
      setViewAttachment(false);
    }
  };

  const fetchPendingSellers = async () => {
    const url =
      process.env.REACT_APP_URL +
      "/v1/qa-approver/onborded-sellers?isVerify=pending" && "/v1/qa-approver/onborded-sellers?isVerify=decline"
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setPendingSellers(data.pendingSellers);
    } else {
      console.error("Failed to fetch pending sellers");
    }
  };

  useEffect(() => {
    fetchPendingSellers();
  }, []);

  return (
    <main className="max-w-full text-xs flex">
      <div className="sidebar bg-[#00388c] h-screen w-fit sticky top-0">
        <SideBar menu={QAList} />
      </div>
      <div className="max-w-full grow mx-8">
        <section className="flex flex-row justify-between py-5 items-center">
          <div>
            <h1 className="text-2xl md:text-3xl text-[#383E50] font-semibold leading-10">
              QA Approver Dashboard
            </h1>
          </div>
        </section>
        <section className="flex flex-col border">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-300">
                <tr>
                  <th className="px-4 py-2">Full Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Store Name</th>
                  <th className="px-4 py-2">Category Manager</th>
                  <th className="px-4 py-2">Verification Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(pendingSellers) &&
                  pendingSellers.map((item) => {
                    const { seller } = item;
                    return <TableRow data={item} />;
                  })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PendingSeller;
