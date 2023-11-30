import React, { useEffect, useState } from "react";
import PdfViewModal from "./PdfViewModal";
import DeclineReasonModal from "./DeclineReqModal";
const AttachmentModal = ({ onClose, visible, id }) => {
  const [pdfModal, setPdfModal] = useState(false);
  const [gstModal, setGstModal] = useState(false);
  const [attachMent, SetAttachMent] = useState([]);
  const [declineReason, setDeclineReason] = useState("");
  const [showDeclineReasonModal, setShowDeclineReasonModal] = useState(false);


  const token = localStorage.getItem("access_token");

  async function fetchAttachment() {
    try {
      // Replace with your actual bearer token
      const url = `${process.env.REACT_APP_URL}/v1/b2b-approval/get/${id}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      SetAttachMent(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchAttachment();
  }, []);

  async function makePutRequest(id) {
    try {
      const url = `${process.env.REACT_APP_URL}/v1/b2b-approval/approve_b2b/${id}`;

      const payload = {
        // Add your desired request body here
        id: id,
        status: true,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      };
      // console.log(JSON.stringify(payload))
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        const responseData = await response.json();
        onClose("verify");
        console.log("Post request successful:", responseData);
      } else {
        throw new Error("Post request failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async function makeDeclineRequest(id) {
    try {
      const url = `${process.env.REACT_APP_URL}/v1/verifySeller/isVerify`;

      const payload = {
        id: id,
        status: false,
      };

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      };
      console.log(JSON.stringify(payload));
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        onClose("decline");
        onClose("close"); // Notify the parent component of the decline action
      } else {
        throw new Error("PUT request for decline failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  const handleVerify = () => {
    makePutRequest(id);
  };

  const handleDecline = () => {
  
      setShowDeclineReasonModal(true);
    // Delay for 1 second (adjust as needed) // Show the decline reason modal
  };

  const submitDeclineReason = () => {
    if (declineReason) {
      makeDeclineRequest(id, declineReason); // Pass the decline reason to the decline request function
    }
  };
  const handleClosePdf = (e) => {
   
    if (e.target.id === "container") {
      setPdfModal(false);
      setGstModal(false);
    }
  };
  console.log(pdfModal);
  if (visible)
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
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col p-5">
            <div className="flex justify-between">
              <div className="w-2/5 flex justify-between ">
                <div className="w-1/2 flex justify-between">
                  <h1 className=" text-base  font-semibold text-[#143250]">
                    Vendor Name
                  </h1>
                  :
                </div>
                <p className="text-sm text-right  font-normal mx-1">
                  {attachMent?.personal_name}
                </p>
              </div>
              <div className="w-2/5 flex justify-between ">
                <div className="w-1/2 flex justify-between">
                  <h1 className=" text-base  font-semibold text-[#143250]">
                    Email
                  </h1>
                  :
                </div>
                <p className="text-sm text-right  font-normal mx-1">
                  {attachMent?.email}
                </p>
              </div>
            </div>
            {/* 2 row */}
            <div className="flex justify-between">
              <div className="w-2/5 flex justify-between ">
                <div className="w-1/2 flex justify-between">
                  <h1 className=" text-base  font-semibold text-[#143250]">
                    Store Name
                  </h1>
                  :
                </div>
                <p className="text-sm text-right  font-normal mx-1">
                  {attachMent?.business_name}
                </p>
              </div>
              <div className="w-2/5 flex justify-between ">
                <div className="w-1/2 flex justify-between">
                  <h1 className=" text-base uppercase  font-semibold text-[#143250]">
                    Gst
                  </h1>
                  :
                </div>
                <p className="text-sm text-right  font-normal mx-1">
                  {attachMent?.gst_id}
                </p>
              </div>
            </div>
            {/* 3 row  */}
            <div className="flex justify-between">
              <div className="w-2/5 flex justify-between ">
                <div className="w-1/2 flex justify-between">
                  <h1 className=" text-base uppercase  font-semibold text-[#143250]">
                    Pan
                  </h1>
                  :
                </div>
                <p className="text-sm text-right  font-normal mx-1">
                  {attachMent?.pan_id}
                </p>
              </div>
            </div>
          </div>
          {/* // preview section */}
          <div className="flex justify-around">
            <div
              onClick={() => setGstModal(true)}
              className=" w-2/5 flex justify-center items-center h-40 bg-gray-200 rounded"
            >
              <div className="w-full h-full p-2 cursor-pointer">
                <img
                  className="w-full h-full object-contain"
                  src="https://res.cloudinary.com/genx21/image/upload/v1694692016/zngnznqxvjtrpvn45jee.webp"
                  alt=""
                />
              </div>
              {gstModal && attachMent.gst_upload && (
                <PdfViewModal
                  CloseModal={handleClosePdf}
                  visible={gstModal}
                  url={attachMent.gst_upload}
                />
              )}
            </div>
            <div
              onClick={() => setPdfModal(true)}
              className=" w-2/5 flex justify-center items-center h-40 bg-gray-200 rounded"
            >
              <div className="w-full h-full p-2">
                <img
                  className="w-full h-full object-contain"
                  src="https://res.cloudinary.com/genx21/image/upload/v1694692016/zngnznqxvjtrpvn45jee.webp"
                  alt=""
                />
              </div>
              {pdfModal && attachMent.pan_upload && (
                <PdfViewModal
                  visible={pdfModal}
                  CloseModal={handleClosePdf}
                  url={attachMent.pan_upload}
                />
              )}
            </div>
          </div>
          <div className="flex justify-center gap-x-5 py-5">
            <button
              onClick={(e) => handleVerify(e)}
              className="flex justify-center items-center py-2 px-4 bg-[#28A745] text-white"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              Verify
            </button>
            <button
              onClick={handleDecline}
              className="flex justify-center items-center py-2 px-4 bg-[#DC3545] text-white"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Decline
            </button>

          </div>

          <div className={` ${showDeclineReasonModal ? 'show' : ''}`}>
        <DeclineReasonModal
          id={id}
          onClose={() => setShowDeclineReasonModal(false)}
          onSubmit={submitDeclineReason}
          onChange={(e) => setDeclineReason(e.target.value)}
        />
      </div>
        </div>
      </div>
    );
};

export default AttachmentModal;
