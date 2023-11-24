import React, { useState, useEffect } from "react";
import MMStat from "./MMStat";
import MMSellers from "./MMSellers";
import SideBar from "../Sidebar";
import Layout from "../../Routing/Layout";
import { categoryManagerMenu, categoryMenu } from "../../constant";
import LogOutModal from "../Logout";

const MMDash = () => {
  const [approvedSellers, setApprovedSellers] = useState();
  const [pendingSellers, setPendingSellers] = useState();
  const [approvedcount, setApprovedCount] = useState()
  const [pendingCount, setPendingCount] = useState()
  const token = localStorage.getItem("access_token");

  const fetchData = async () => {
    const url =
      process.env.REACT_APP_URL +
      "/v1/category-manager/approved/Onboard-Seller";
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setApprovedSellers(data.approvedseller);
      setApprovedCount(data.count)
    } else {
      console.error("Failed to fetch");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchSellers = async () => {
    const url =
      process.env.REACT_APP_URL + "/v1/category-manager/pending/Onboard-Seller";
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setPendingSellers(data.pendingSeller);
      setPendingCount(data.count)
    } else {
      console.error("Failed to fetch");
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);


  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleLogout = () => {
      setShowLogoutModal(true);
  };
  const handleModalClose = () => {
      setShowLogoutModal(false);
  };
  return (
    <main className="max-w-full flex">
      <div className="sidebar bg-[#00388c] h-screen w-fit sticky top-0">
        <SideBar menu={categoryManagerMenu} />
      </div>
      <div className="max-w-full grow mx-4">
        <section className="flex flex-row justify-between py-5 items-center">
          <div>
            <h1 className=" text-2xl md:text-3xl text-[#383E50] font-semibold leading-10">
              Marketing Manager Dashboard
            </h1>
          </div>
          <div className="flex items-center" onClick={handleLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                        </div>
                        <LogOutModal visible={showLogoutModal} onClose={handleModalClose} />
        </section>
        <section className="flex flex-col">
          <div className="">
            <MMStat approvednumber={approvedcount} pendingnumber={pendingCount} />
          </div>
          <div className="">
            <MMSellers approvedSellers={approvedSellers} pendingSellers={pendingSellers} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default MMDash;
