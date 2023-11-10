import React, { useState, useEffect } from "react";
import ManageStats from "./ManagerStats";
import OnboardedSellers from "./OnboardedSellers";
import SideBar from "../Sidebar";
import { QAList } from "../../constant";

const QA = () => {
  const [approvedSellers, setApprovedSellers] = useState();
  const [pendingSellers, setPendingSellers] = useState();
  const [approvedcount, setApprovedCount] = useState();
  const [pendingCount, setPendingCount] = useState();
  const token = localStorage.getItem("access_token");

  const fetchData = async () => {
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
      setPendingCount(data.count);
    } else {
      console.error("Failed to fetch");
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);
  console.log("Pending List >>", pendingSellers);
  console.log("Approved Sellers", approvedcount);
  console.log("Approved List >>", approvedSellers);
  return (
    <main className="max-w-full flex">
      <div className="sidebar bg-[#00388c] h-screen w-fit sticky top-0">
        <SideBar menu={QAList} />
      </div>
      <div className="max-w-full grow mx-8">
        <section className="flex flex-row justify-between py-5 items-center">
          <div>
            <h1 className=" text-2xl md:text-3xl text-[#383E50] font-semibold leading-10">
              Dashboard
            </h1>
            <p className="text-sm leading-6 font-normal">
              Whole data about your business here
            </p>
          </div>
         
        </section>
        <section className="flex flex-col">
          {/* <div className="">
            <ManageStats
              approvednumber={approvedcount}
              pendingnumber={pendingCount}
            />
          </div> */}
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

export default QA;
