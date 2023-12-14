import React, { useEffect, useState } from "react";
import Description from "../../Description";

const AttachmentModal = ({ onClose, visible, id }) => {
  const [attachMent, SetAttachMent] = useState([]);

  console.log(id);

  const token = localStorage.getItem("access_token");

  async function fetchAttachment() {
    try {
      const url = `${process.env.REACT_APP_URL}/v1/brand-registration/get-registration-data/admin/${id}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      SetAttachMent(data?.data);
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
      const url = `${process.env.REACT_APP_URL}/v1/brand-registration/active-brand/admin/${id}`;

      const payload = {
        status: "Approved",
      };

      const requestOptions = {
        method: "POST",
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
        onClose("verify");
        console.log("PUT request successful:", responseData);
      } else {
        throw new Error("PUT request failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async function makeDeclineRequest(id) {
    try {
      const url = `${process.env.REACT_APP_URL}/v1/brand-registration/active-brand/admin/${id}`;

      const payload = {
        status: "Decline",
      };

      const requestOptions = {
        method: "POST",
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
        onClose("close");
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
        <div className="flex ">
          <div className="flex justify-between w-1/2 items-center py-2 gap-10">
            <h2 className="text-base pl-8 font-semibold">Logo :</h2>
            <img
              src={attachMent?.brand_logo_url}
              alt="Brand Logo"
              width={100}
              height={100}
            />
          </div>

          <div className="px-4 py-2 gap-2">
            <h1 className="text-base font-semibold text-[#143250]">
              Trademark Certificate :
            </h1>
            <div className="flex">
              {Array.isArray(attachMent.product_image_url) ? (
                attachMent.product_image_url.map((url, index) => (
                  <img
                    className="w-12 h-16"
                    key={index}
                    src={url}
                    alt={`Product ${index}`}
                  />
                ))
              ) : (            
                <img
                  className="w-12 h-16"
                  src={attachMent?.product_image_url || 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fthumbnails%2F022%2F059%2F000%2Fsmall%2Fno-image-available-icon-vector.jpg&tbnid=GQf2TB5qj81_7M&vet=12ahUKEwjZxJ_3xY6DAxXZb2wGHXdWDukQMygDegQIARA6..i&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fno-image-available&docid=SJxz-cOxPHPFpM&w=200&h=200&q=no%20image&ved=2ahUKEwjZxJ_3xY6DAxXZb2wGHXdWDukQMygDegQIARA6'}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col p-5">
          <div className="flex justify-between py-2 gap-10 ">
            <div className="w-1/2 flex justify-between">
              <h1 className="text-base font-semibold text-[#143250]">
                Brand Name:
              </h1>
              <p className="text-sm text-right font-normal mx-1">
                {attachMent?.brand_name}
              </p>
            </div>
            <div className="w-1/2 flex justify-between">
              <h1 className="text-base font-semibold text-[#143250]">
                Case ID
              </h1>
              <p className="text-sm text-right font-normal mx-1">
                {attachMent?.case_id}
              </p>
            </div>
          </div>
          <div className="flex justify-between py-2 gap-10 ">
            <div className="w-1/2 flex justify-between">
              <h1 className="text-base font-semibold text-[#143250]">
                Trademark reg no:
              </h1>
              <p className="text-sm text-right font-normal mx-1">
                {attachMent?.trademark_reg_no}
              </p>
            </div>
            <div className="w-1/2 flex justify-between">
              <h1 className="text-base font-semibold text-[#143250]">
                Trademark Status:
              </h1>
              <p className="text-sm text-right font-normal mx-1">
                {attachMent?.trademark_status}
              </p>
            </div>
          </div>
          <div className="flex justify-between py-2 gap-10 ">
            <div className="w-1/2 flex justify-between">
              <h1 className="text-base font-semibold text-[#143250]">
                Vendor code:
              </h1>
              <p className="text-sm text-right font-normal mx-1">
                {attachMent?.vendor_code}
              </p>
            </div>
            <div className="w-1/2 flex justify-between">
              <h1 className="text-base font-semibold text-[#143250]">
                Trademark Type:
              </h1>
              <p className="text-sm text-right font-normal mx-1">
                {attachMent?.trademark_type}
              </p>
            </div>
          </div>
          <div className="flex justify-between py-2 gap-10 ">
            <div className="w-1/2 flex justify-between">
              <h1 className="text-base font-semibold text-[#143250]">
                Official Website URLs:
              </h1>
              <ul className="text-sm text-left overflow-x-hidden font-normal mx-1">
                {attachMent?.url_brands_official_website &&
                  attachMent.url_brands_official_website.map((url, index) => (
                    <li key={index}>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {url}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="w-1/2 flex justify-between">
              <h1 className="text-base font-semibold text-[#143250]">ASINs:</h1>
              <ul className="text-sm text-left overflow-x-hidden font-normal mx-1">
                {attachMent?.ASINs_no &&
                  attachMent.ASINs_no.map((asin, index) => (
                    <li key={index}>{asin}</li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-between py-2 gap-10 ">
            <div className="flex justify-between">
              <h1 className="text-base font-semibold text-[#143250]">
                Product Categories:
              </h1>
              <p className="text-sm text-right font-normal mx-1">
                {attachMent?.product_category_details &&
                  attachMent?.product_category_details.map((category, index) =>
                    index === 0
                      ? category.category_name
                      : `, ${category.category_name}`
                  )}
              </p>
            </div>
          </div>
          <div className="flex justify-between py-2 gap-10 ">
            <div className="w-1/2 flex justify-between">
              <h1 className="text-base font-semibold text-[#143250]">
                Trade Mark Office:
              </h1>
              <p className="text-sm text-right font-normal mx-1 overflow-x-clip ">
                {attachMent?.trademark_office}
              </p>
            </div>
            <div className="w-1/2 flex justify-between">
              <h1 className="text-base font-semibold text-[#143250]">
                {/* Trademark Type: */}
              </h1>
              <p className="text-sm text-right font-normal mx-1">
                {attachMent?.trademark_type}
              </p>
            </div>
          </div>
          <div className="flex justify-between py-2 gap-10 ">
            <div className="flex">
              <h1 className="text-base font-semibold text-[#143250]">
                Description:
              </h1>
              <div className="flex flex-wrap">
                <p className="text-sm text-left font-normal mx-1 whitespace-normal">
                  <Description description={attachMent?.brand_desc} />
                </p>
              </div>
            </div>
            <div className="w-1/2 flex justify-between">
              <h1 className="text-base font-semibold text-[#143250]">
                Seller Name:
              </h1>
              <p className="text-sm text-right font-normal mx-1">
                {attachMent?.seller?.fullname}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-x-5 py-5">
          <button
            onClick={(e) => handleVerify(e)}
            className="btn-verify p-2 bg-green-700 flex items-center justify-center"
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
            onClick={() => makeDeclineRequest(id)}
            className="btn-decline p-2 bg-red-700 flex items-center justify-center"
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
      </div>
    </div>
  );
};

export default AttachmentModal;
