import React, { useState } from "react";

const DeclineReasonModal = ({ isOpen, onClose, onSubmit, id }) => {
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("access_token");

  const declineReasons = [
    "PAN number not properly visible.",
    "PAN document invalid.",
    "GST number not properly visible.",
    "GST document invalid."
  ];

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
    <div className={`modal ${isOpen ? "open" : ""} fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center`}>
      <div className="modal-content bg-white p-4 w-1/2 h-2/3 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Choose Decline Reasons</h2>
        {declineReasons.map((reason, index) => (
          <label key={index} className="flex items-center mb-2">
            <input
              type="checkbox"
              value={reason}
              checked={selectedReasons.includes(reason)}
              onChange={() => handleCheckboxChange(reason)}
              className="mr-2"
            />
            {reason}
          </label>
        ))}
        <h2 className="text-2xl font-bold my-4">Enter a Message</h2>
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
