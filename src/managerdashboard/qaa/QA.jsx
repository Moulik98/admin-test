import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar";
import { QAList } from "../../constant";
import TableRow from "./TableRow";
import LogOutModal from "../Logout";

const QA = () => {
  const [pendingSellers, setPendingSellers] = useState([]);
  const token = localStorage.getItem("access_token");
  const [showLogoutModal, setShowLogoutModal] = useState(false);


  const fetchPendingSellers = async () => {
    const url =
      process.env.REACT_APP_URL +
      "/v1/qa-approver/onborded-sellers?isVerify=approved";
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

  const handleLogout = () => {
    setShowLogoutModal(true);
  };
  const handleModalClose = () => {
    setShowLogoutModal(false);
  };

  return (
    <main className="max-w-full text-xs flex">
      <div className="sidebar bg-[#00388c] h-screen w-fit sticky top-0">
        <SideBar menu={QAList} />
      </div>
      <div className="max-w-full grow mx-8">
        <section className="flex flex-row justify-between py-5 items-center">
          <div>
            <h1 className="text-2xl md:text-3xl text-[#383E50] font-semibold leading-10">
              Approved Seller List
            </h1>
          </div>
          <div className="flex items-center" onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>

          </div>
          <LogOutModal visible={showLogoutModal} onClose={handleModalClose} />
        </section>
        <section className="flex flex-col border">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-300">
                <tr>
                  <th className="px-4 py-2">Sl.No</th>
                  <th className="px-4 py-2">Seller Name</th>
                  <th className="px-4 py-2">Onboard Date</th>
                  <th className="px-4 py-2">Seller Code</th>
                  <th className="px-4 py-2">Store Name</th>
                  <th className="px-4 py-2">Business Type</th>
                  <th className="px-4 py-2">Category Manager</th>
                  <th className="px-4 py-2">Verification Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(pendingSellers) &&
                  pendingSellers?.map((item, index) => {
                    return <TableRow key={item._id} data={item} index={index} />;
                  })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default QA;
