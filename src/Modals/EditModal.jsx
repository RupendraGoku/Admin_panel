// Components/Modals/EditModal.jsx
import React from "react";
import "../CSS/AddModal.css";
import UserForm from "./UserForm.jsx";

const EditModal = ({ isOpen, onClose, onSubmit, title, fields = [], initialData = {}, size = "default" }) => {
  if (!isOpen) return null;

  const handleEdit = async (formData) => {
    try {
      const response = await fetch("https://myworkstatus.in/ecom/api/user_update.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (result.status === "true") {
        onSubmit(formData);
        onClose();
      } else {
        alert(result.message || "Update failed.");
      }
    } catch (error) {
      console.error("Edit user error:", error);
      alert("Something went wrong while updating the user.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className={`modal-container ${size === "large" ? "large" : "small"}`}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <UserForm
          fields={fields}
          initialData={initialData}
          onSubmit={handleEdit}
          onCancel={onClose}
          submitLabel="Update User"
        />
      </div>
    </div>
  );
};

export default EditModal;
