import React, { useState, useEffect } from "react";
import ManageStats from "./ManagerStats";
import OnboardedSellers from "./OnboardedSellers";
import SideBar from "../Sidebar";
import Layout from "../../Routing/Layout";
import { categoryManagerMenu, categoryMenu } from "../../constant";

import LogOutModal from "../Logout";
import CmStats from "./CmStats";

const ManagerDashboard = () => {
  const [approvedSellers, setApprovedSellers] = useState();
  const [pendingSellers, setPendingSellers] = useState();
  const [approvedcount, setApprovedCount] = useState();
  const [pendingCount, setPendingCount] = useState();
  const token = localStorage.getItem("access_token");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
      setApprovedCount(data.count);
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
      setPendingCount(data.count);
    } else {
      console.error("Failed to fetch");
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };
  const handleClose = () => {
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
              CM Dashboard
            </h1>
            <p className="text-sm leading-6 font-normal">
              Whole data about your business here
            </p>
          </div>
          <div className="flex gap-5">
            <div className="flex items-center" onClick={handleLogout}>
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
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </div>
            {showLogoutModal && (
              <LogOutModal visible={showLogoutModal} onClose={handleClose} />
            )}
            <a
              href={`/onboard-seller`}
              className="text-white flex gap-x-5 bg-[#556EE6] py-2 px-10 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M15.8859 10.5767C16.168 10.5767 16.4031 10.6785 16.5911 10.8823C16.7792 11.086 16.8732 11.3132 16.8732 11.5639V17.5816C16.8732 18.1458 16.6773 18.6237 16.2855 19.0155C15.8937 19.4073 15.4315 19.6031 14.8986 19.6031H2.86335C2.2992 19.6031 1.82123 19.4073 1.42946 19.0155C1.03768 18.6237 0.841797 18.1458 0.841797 17.5816V5.5463C0.841797 5.01349 1.03768 4.5512 1.42946 4.15942C1.82123 3.76765 2.2992 3.57176 2.86335 3.57176H8.881C9.13173 3.57176 9.35896 3.66579 9.56268 3.85384C9.76641 4.04189 9.86827 4.27696 9.86827 4.55903C9.86827 4.84111 9.76641 5.07617 9.56268 5.26423C9.35896 5.45228 9.13173 5.5463 8.881 5.5463H3.85062C3.56854 5.5463 3.33348 5.64816 3.14543 5.85189C2.95738 6.05561 2.86335 6.29851 2.86335 6.58059V16.8294C2.86335 17.0801 2.95738 17.3074 3.14543 17.5111C3.33348 17.7148 3.56854 17.8167 3.85062 17.8167H13.8644C14.1464 17.8167 14.3893 17.7148 14.5931 17.5111C14.7968 17.3074 14.8986 17.0801 14.8986 16.8294V11.5639C14.8986 11.3132 14.9927 11.086 15.1807 10.8823C15.3688 10.6785 15.6038 10.5767 15.8859 10.5767ZM18.8947 3.57176C19.1768 3.57176 19.4119 3.66579 19.5999 3.85384C19.788 4.04189 19.882 4.27696 19.882 4.55903C19.882 4.84111 19.788 5.07617 19.5999 5.26423C19.4119 5.45228 19.1768 5.5463 18.8947 5.5463H16.8732V7.56786C16.8732 7.84993 16.7792 8.085 16.5911 8.27305C16.4031 8.4611 16.168 8.55513 15.8859 8.55513C15.6038 8.55513 15.3688 8.4611 15.1807 8.27305C14.9927 8.085 14.8986 7.84993 14.8986 7.56786V5.5463H12.8771C12.595 5.5463 12.3599 5.45228 12.1719 5.26423C11.9838 5.07617 11.8898 4.84111 11.8898 4.55903C11.8898 4.27696 11.9838 4.04189 12.1719 3.85384C12.3599 3.66579 12.595 3.57176 12.8771 3.57176H14.8986V1.55021C14.8986 1.26813 14.9927 1.03307 15.1807 0.845016C15.3688 0.656965 15.6038 0.562939 15.8859 0.562939C16.168 0.562939 16.4031 0.656965 16.5911 0.845016C16.7792 1.03307 16.8732 1.26813 16.8732 1.55021V3.57176H18.8947ZM11.8898 7.56786C12.1406 7.56786 12.3678 7.66972 12.5715 7.87344C12.7752 8.07716 12.8771 8.31223 12.8771 8.57863C12.8771 8.84504 12.7752 9.0801 12.5715 9.28383C12.3678 9.48755 12.1406 9.58941 11.8898 9.58941H5.87217C5.5901 9.58941 5.3472 9.48755 5.14347 9.28383C4.93975 9.0801 4.83789 8.84504 4.83789 8.57863C4.83789 8.31223 4.93975 8.07716 5.14347 7.87344C5.3472 7.66972 5.5901 7.56786 5.87217 7.56786H11.8898ZM11.8898 10.5767C12.1406 10.5767 12.3678 10.6785 12.5715 10.8823C12.7752 11.086 12.8771 11.321 12.8771 11.5875C12.8771 11.8539 12.7752 12.0889 12.5715 12.2926C12.3678 12.4964 12.1406 12.5982 11.8898 12.5982H5.87217C5.5901 12.5982 5.3472 12.4964 5.14347 12.2926C4.93975 12.0889 4.83789 11.8539 4.83789 11.5875C4.83789 11.321 4.93975 11.086 5.14347 10.8823C5.3472 10.6785 5.5901 10.5767 5.87217 10.5767H11.8898ZM11.8898 13.5855C12.1406 13.5855 12.3678 13.6874 12.5715 13.8911C12.7752 14.0948 12.8771 14.3299 12.8771 14.5963C12.8771 14.8627 12.7752 15.0977 12.5715 15.3015C12.3678 15.5052 12.1406 15.6071 11.8898 15.6071H5.87217C5.5901 15.6071 5.3472 15.5052 5.14347 15.3015C4.93975 15.0977 4.83789 14.8627 4.83789 14.5963C4.83789 14.3299 4.93975 14.0948 5.14347 13.8911C5.3472 13.6874 5.5901 13.5855 5.87217 13.5855H11.8898Z"
                  fill="white"
                />
              </svg>
              Onboard Seller
            </a>
            <div className="flex items-center">
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
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                />
              </svg>
            </div>
          </div>
        </section>
        <CmStats />
        <section className="flex flex-col">
          <div className="">
            <OnboardedSellers
              approvedSellers={approvedSellers}
              pendingSellers={pendingSellers}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default ManagerDashboard;
