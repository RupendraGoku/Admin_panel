// src/Modals/DeleteModal.jsx
import React from "react";
import "../CSS/AddModal.css";

const DeleteModal = ({ isOpen, onClose, onDelete, title = "Delete Confirmation", data }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal delete-modal">
        <h3>{title}</h3>
        <p>Are you sure you want to delete <strong>{data?.name}</strong>?</p>
        <div className="modal-actions">
          <button className="delete-btn" onClick={() => onDelete(data)}>Yes, Delete</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
