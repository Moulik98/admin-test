import React, { useEffect, useState } from "react";
import { getToken } from "../../hook/getToken";

const AttachmentModal = ({ onClose, visible, id }) => {
  const [attachMent, SetAttachMent] = useState({
    name: "",
    seller_id: "",
    store_name: "",
    gst_number: "",
    pan_number: "",
  });
  const token = getToken();

  async function fetchAttachment() {
    try {
      // Replace with your actual bearer token
      const url = `${process.env.REACT_APP_URL}/v1/distributorship/view?page=1&limit=10/${id}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        SetAttachMent(data.data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  useEffect(() => {
    fetchAttachment();
  }, []);

 

  const handleClosePdf = (e) => {
    console.log("hii");
    if (e.target.id === "container") {
    }

    // if (visible && Array.isArray(attachMent) && attachMent.length > 0) {
    return (
      <div
        id="container"
        onClick={handleClosePdf}
        className=" fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      >
        <div className="w-1/2 flex flex-col mx-auto bg-white rounded ">
          <div className="flex justify-between items-center p-5 border border-solid border-gray-300">
            <h1 className="text-base font-semibold text-[#143250]">
              Attachments
            </h1>
            <div onClick={() => onClose("close")} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          {/* {attachMent.map((attachment) => ( */}
          <div className="flex flex-col p-5">
            <div className="flex justify-between">
              <div className="w-2/5 flex justify-between">
                <div className="w-1/2 flex justify-between">
                  <h1 className=" text-base  font-semibold text-[#143250]">
                    Seller Code
                  </h1>
                  :
                </div>
                <p className="text-sm text-right font-normal mx-1">
                  {attachMent.seller_code}
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-2/5 flex justify-between">
                <div className="w-1/2 flex justify-between">
                  <h1 className=" text-base  font-semibold text-[#143250]">
                    Seller Name
                  </h1>
                  :
                </div>
                <p className="text-sm text-right font-normal mx-1">
                  {attachMent.fullname}
                </p>
              </div>
              <div className="w-2/5 flex justify-between">
                <div className="w-1/2 flex justify-between">
                  <h1 className=" text-base  font-semibold text-[#143250]">
                    CM
                  </h1>
                  :
                </div>
                <p className="text-sm text-right font-normal mx-1">
                  {attachMent.name}
                </p>
              </div>
            </div>
            {/* 2nd row */}
            <div className="flex justify-between">
              <div className="w-2/5 flex justify-between">
                <div className="w-1/2 flex justify-between">
                  <h1 className=" text-base  font-semibold text-[#143250]">
                    Store Name
                  </h1>
                  :
                </div>
                <p className="text-sm text-right font-normal mx-1">
                  {attachMent.store_name}
                </p>
              </div>
              <div className="w-2/5 flex justify-between">
                <div className="w-1/2 flex justify-between">
                  <h1 className=" text-base uppercase  font-semibold text-[#143250]">
                    Gst
                  </h1>
                  :
                </div>
                <p className="text-sm text-right font-normal mx-1">
                  {attachMent.gst_number}
                </p>
              </div>
            </div>
            {/* 3rd row  */}
            <div className="flex justify-between">
              <div className="w-2/5 flex justify-between">
                <div className="w-1/2 flex justify-between">
                  <h1 className=" text-base font-semibold text-[#143250]">
                    Business Type
                  </h1>
                  :
                </div>
                <p className="text-sm text-right font-normal mx-1">
                  {attachMent.sellerType}
                </p>
              </div>
              <div className="w-2/5 flex justify-between">
                <div className="w-1/2 flex justify-between">
                  <h1 className=" text-base uppercase  font-semibold text-[#143250]">
                    Pan
                  </h1>
                  :
                </div>
                <p className="text-sm text-right font-normal mx-1">
                  {attachMent.pan_number}
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-2/5 flex justify-between">
                <div className="w-1/2 flex justify-between">
                  <h1 className=" text-base font-semibold text-[#143250]">
                    Bank Details
                  </h1>
                  :
                </div>
                <p className="text-sm text-right font-normal mx-1">
                  2036988956212
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default AttachmentModal;
