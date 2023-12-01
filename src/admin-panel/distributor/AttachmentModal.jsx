import React, { useEffect, useState } from "react";
import Description from "../../Description";
import { getToken } from "../../hook/getToken";

const AttachmentModal = ({ onClose, visible, id }) => {
  const [attachMent, SetAttachMent] = useState([]);

  console.log(id);

  const token = getToken();

  async function fetchAttachment() {
    try {
      const url = `${process.env.REACT_APP_URL}/v1/distributorship/view/${id}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      SetAttachMent(data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchAttachment();
  }, []);

  return (
    <div
      id="container"
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="flex flex-col mx-auto bg-white whitespace-nowrap rounded w-3/4 p-6 overflow-auto">
        <div className="flex justify-between items-center border-b border-solid border-gray-300 pb-3">
          <h1 className="text-base font-semibold text-[#143250]">Details</h1>
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

        <div className="flex flex-col p-5">
          <div className="flex justify-between py-2 gap-10 ">
            <div className="w-1/2 flex justify-between">
              <h1 className="text-base font-semibold text-[#143250]">
                Company Name:
              </h1>
              <p className="text-sm text-right font-normal mx-1">
                {attachMent?.company_name}
              </p>
            </div>
            <div className="w-1/2 flex justify-between">
              <h1 className="text-base font-semibold text-[#143250]">Name</h1>
              <p className="text-sm text-right font-normal mx-1">
                {attachMent?.name}
              </p>
            </div>
          </div>
          <div className="flex justify-between py-2 gap-10 ">
            <div className="w-1/2 flex justify-between">
              <h1 className="text-base font-semibold text-[#143250]">
                GST No:
              </h1>
              <p className="text-sm text-right font-normal mx-1">
                {attachMent?.gstn}
              </p>
            </div>
            <div className="w-1/2 flex justify-between">
              <h1 className="text-base font-semibold text-[#143250]">
                PAN No:
              </h1>
              <p className="text-sm text-right font-normal mx-1">
                {attachMent?.pan}
              </p>
            </div>
          </div>

          <div className="flex justify-between py-2 gap-5 ">
            <div className="flex">
              <h1 className="text-base font-semibold text-[#143250]">About:</h1>
              <div className="flex flex-wrap">
                <p className="text-sm text-left font-normal mx-1 whitespace-normal">
                  <Description description={attachMent?.about} />
                </p>
              </div>
            </div>
            <div className="w-1/2 flex justify-between">
              <h1 className="text-base font-semibold text-[#143250]">
                Address:
              </h1>
              <p className="text-sm text-right font-normal mx-1">
                <Description description={`${attachMent?.address}, pincode: ${attachMent?.pincode}, state: ${attachMent?.state}`}
 />
              </p>
            </div>
          </div>

          <div className="flex justify-between py-2 gap-5 ">
            <div className="w-1/2 flex justify-between">
              <h1 className="text-base font-semibold text-[#143250]">
                Mobile:
              </h1>
              <p className="text-sm text-right font-normal mx-1">
                <Description description={attachMent?.mobile} />
              </p>
            </div>
            <div className="w-1/2 flex justify-between">
              <h1 className="text-base font-semibold text-[#143250]">Email:</h1>
              <p className="text-sm text-right font-normal mx-1">
                <Description description={attachMent?.email} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttachmentModal;
