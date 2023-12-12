import React, { useEffect, useState } from "react";
import PdfViewModal from "./PdfViewModal";
import DeclineReasonModal from "./DeclineReqModal";
import toast from "react-hot-toast";

const AttachmentModal = ({ onClose, visible, id }) => {
  const [pdfModal, setPdfModal] = useState(false);
  const [cm, SetCm] = useState(false);
  const [gstModal, setGstModal] = useState(false);
  const [attachMent, SetAttachMent] = useState({
    fullname: "",
    seller_id: "",
    store_name: "",
    gst_number: "",
    pan_number: "",
    gstImageUrl: "",
    panImageUrl: "",
  });
  const [declineReason, setDeclineReason] = useState("");
  const [showDeclineReasonModal, setShowDeclineReasonModal] = useState(false);

  const token = localStorage.getItem("access_token");

  async function fetchAttachment() {
    try {
      // Replace with your actual bearer token
      const url = `${process.env.REACT_APP_URL}/v1/qa-approver/get-seller-data/${id}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        SetAttachMent(data?.sellerInfo);
        SetCm(data?.cmAdmins[0]) // Assuming you are getting an array with a single item
        console.log(data);
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

  async function makePutRequest(id) {
    try {
      const url = `${process.env.REACT_APP_URL}/v1/qa-approver/approved-seller/${id}`;

      const payload = {
        id: id,
        status: true,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify(payload),
      };

      const response = await fetch(url, requestOptions);
      if (response.ok) {
        const responseData = await response.json();
        onClose("verify");
        console.log("Post request successful:", responseData);
      } else {
        throw Error("Post request failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async function makeDeclineRequest(id) {
    try {
      const url = `${process.env.REACT_APP_URL}/v1/qa-approver/decline-seller/${id}`;

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
        // body: JSON.stringify(payload),
      };

      const response = await fetch(url, requestOptions);
      if (response.ok) {
        const responseData = await response.json();
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
      toast.success('Verified Successfully')
  };

  const handleDecline = () => {
    setShowDeclineReasonModal(true); // Show the decline reason modal
  };

  const submitDeclineReason = () => {
    if (declineReason) {
      makeDeclineRequest(id, declineReason); // Pass the decline reason to the decline request function
    }
    toast.success('Reason Submitted Successfully')
  };

  const handleClosePdf = (e) => {
    console.log("hii");
    if (e.target.id === "container") {
      setPdfModal(false);
      setGstModal(false);
    }
  };

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
            <div  className="flex flex-col p-5">
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
                <div className="w-2/5 flex justify-between">
                  <div className="w-1/2 flex justify-between">
                    <h1 className=" text-base  font-semibold text-[#143250]">
                      Onboard Date
                    </h1>
                    :
                  </div>
                  <p className="text-sm text-right font-normal mx-1">
                  {new Date(attachMent.createdAt).toDateString()}
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
                  {cm && cm.name ? cm.name : "N/A"}
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
          {/* ))} */}
          {/* // preview section */}
          {/* {attachMent.map((attachment) => ( */}
            <div key={id} className="flex justify-around">
              <div
                onClick={() => setGstModal(true)}
                className="w-16 flex justify-center items-center h-16 bg-gray-200 rounded"
              >
                <div className="w-full h-full p-2 cursor-pointer">
                  <img
                    className="w-full h-full object-contain"
                    src="https://res.cloudinary.com/genx21/image/upload/v1694692016/zngnznqxvjtrpvn45jee.webp"
                    alt="image"
                  />
                </div>
                {gstModal && attachMent.gstImageUrl && (
                  <PdfViewModal
                    CloseModal={handleClosePdf}
                    visible={gstModal}
                    url={attachMent.gstImageUrl}
                  />
                )}
              </div>
              <div
                onClick={() => setPdfModal(true)}
                className="w-16 flex justify-center items-center h-16 bg-gray-200 rounded"
              >
                <div className="w-full h-full p-2">
                  <img
                    className="w-full h-full object-contain"
                    src='https://res.cloudinary.com/genx21/image/upload/v1694692016/zngnznqxvjtrpvn45jee.webp'
                    alt=""
                  />
                </div>
                {pdfModal && attachMent.panImageUrl && (
                  <PdfViewModal
                    visible={pdfModal}
                    CloseModal={handleClosePdf}
                    url={attachMent.panImageUrl}
                  />
                )}
              </div>
            </div>
          {/* ))} */}
          <div className="flex justify-center gap-x-5 py-5">
            <button
              onClick={handleVerify}
              className="flex justify-center items-center py-2 px-4 bg-[#28A745] text-white"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Decline
            </button>

            
          </div>
          {showDeclineReasonModal && (
              <DeclineReasonModal
                id={id}
                onClose={() => setShowDeclineReasonModal(false)}
                onSubmit={submitDeclineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
              />
            )}
        </div>
      </div>
    );
  }

  // return null; // Return null if not visible
// };

export default AttachmentModal;
