import React, { useEffect, useState } from "react";
const DeclineReasonModal = ({ isOpen, onClose, onSubmit, id }) => {
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [message, setMessage] = useState("");
  const [declineReasons, setDeclineReasons] = useState([]);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchDeclineReasons = async () => {
      try {
        const url = `${process.env.REACT_APP_URL}/v1/cancellation-reason/get/?reason_for=seller&isActive=true`;
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('decline reasons', data);
        if (response.ok) {
          setDeclineReasons(data.data);
        } else {
          throw new Error("Failed to fetch decline reasons");
        }
      } catch (error) {
        console.error("Error fetching decline reasons:", error);
      }
    };
    fetchDeclineReasons();
  }, []);
  console.log(declineReasons, 'decline reasons');

  const handleCheckboxChange = (reason) => {
    if (selectedReasons.includes(reason)) {
      setSelectedReasons(selectedReasons.filter((item) => item !== reason));
    } else {
      setSelectedReasons([...selectedReasons, reason]);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const url = `${process.env.REACT_APP_URL}/v1/qa-approver/decline-seller/${id}`;

      const payload = {
        reasons: selectedReasons,
        emailContent: message
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      };

      const response = await fetch(url, requestOptions);

      if (response.ok) {
        const responseData = await response.json();
        onSubmit(); // Call the parent component's callback function
        onClose(); // Close the modal
        console.log("Decline request successful:", responseData);
      } else {
        throw new Error("Decline request failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
      // You can handle errors here by showing an error message to the user
      // Example: set an error state and display it in the UI
    }
  };



  return (
    <div>
      <div className="modal-content bg-white p-4 h-2/3 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Choose Decline Reasons</h2>
        <div className="grid grid-cols-2 gap-2">
          {declineReasons?.map((reason, index) => (
            <label key={index} className="flex items-center">
              <input
                type="checkbox"
                value={reason.cancellation_reasons}
                checked={selectedReasons.includes(reason.cancellation_reasons)}
                onChange={() => handleCheckboxChange(reason.cancellation_reasons)}
                className="mr-2"
              />
              {reason.cancellation_reasons}
            </label>
          ))}
        </div>
        <h2 className="text-xl font-bold my-4">Enter a Message</h2>
        <textarea
          onChange={handleTextareaChange}
          rows="4"
          maxLength={180}
          className="w-full p-2 border rounded-md"
          placeholder="Enter your message"
          value={message}
        ></textarea>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 py-2 px-4 mr-2 rounded-lg">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default DeclineReasonModal;
