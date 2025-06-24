import React from "react";
import "../CSS/AddModal.css";
import UserForm from "./UserForm.jsx";
import { useContext } from "react";
import { ApiServiceContext } from "../context/Context";

const EditModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  fields = [],
  initialData = {},
  size = "default",
  existingUsers = [], // ✅ NEW
}) => {
  const { apiEndpoints,type } = useContext(ApiServiceContext)
  if (!isOpen) return null;

  const handleEdit = async (formData) => {
    try {
      const apiUrl = apiEndpoints[type]['update'];
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, user_id: initialData.user_id }),
      });
      const result = await response.json();

      if (result.status === "true") {
        onSubmit(formData);
        onClose();
        window.location.reload();
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
          fields={[
            ...fields,
            {
              label: "Status",
              name: "user_status",
              type: "select",
              required: true,
              options: [
                { value: "1", label: "Active" },
                { value: "0", label: "Deactive" },
              ],
            },
          ]}
          initialData={initialData}
          onSubmit={handleEdit}
          onCancel={onClose}
          submitLabel="Update & Save"
          existingUsers={existingUsers} // ✅ NEW
          currentUserId={initialData.user_id} // ✅ NEW
        />
      </div>
    </div>
  );
};

export default EditModal;
