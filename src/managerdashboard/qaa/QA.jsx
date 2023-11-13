import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar";
import { QAList } from "../../constant";
import TableRow from "./TableRow";
import AttachmentModal from "./AttachmentModal"; // Import the TableRow component

const QA = () => {
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
      console.log(data.pendingSellers);
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
                {Array.isArray(pendingSellers) &&
                  pendingSellers.map((item) => {
                    const { seller} = item;
                    return (
                      <tr key={seller._id}>
                        <td className="px-4 py-2">{seller.fullname}</td>
                        <td className="px-4 py-2">{seller.email}</td>
                        <td className="px-4 py-2">{seller.store_name}</td>
                        <td className="px-4 py-2">
                          <div
                            className={`flex justify-center items-center rounded-full py-1 px-2 capitalize text-xs text-white ${
                              seller.isVerify === "approved "
                                ? "bg-indigo-500"
                                : "bg-indigo-900"
                            }`}
                          >
                            {seller.isVerify}
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex gap-1 justify-around">
                            <div
                              onClick={() => setViewAttachment(true)}
                              className="flex items-center cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                                />
                              </svg>
                              View Attachment
                            </div>
                          </div>
                        </td>
                        {viewAttachment && (
                          <AttachmentModal
                            visible={viewAttachment}
                            id={seller._id}
                            onClose={handleClose}
                          />
                        )}
                        {/* Include AttachmentModal component here if needed */}
                      </tr>
                    );
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
