import React from "react";

const DeclineReasonModal = ({ isOpen, onClose, onSubmit, onChange }) => {
  return (
    <div className={`modal ${isOpen ? "open" : ""}  fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center`}>
      <div className="modal-content">
        <h2>Enter Decline Reason</h2>
        <textarea
          onChange={onChange}
          rows="4"
          placeholder="Enter your decline reason"
        ></textarea>
        <div className="modal-actions">
          <button onClick={onSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeclineReasonModal;
