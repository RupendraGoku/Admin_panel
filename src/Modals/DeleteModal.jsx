import React, { useState } from "react";
import "../CSS/AddModal.css";
// import "../CSS/EditDelete.css";

const DeleteModal = ({
  isOpen,
  onClose,
  onDelete, // this will be called after success
  title = "Delete Confirmation",
  data,
}) => {
  const [deleting, setDeleting] = useState(false);

  if (!isOpen || !data?.user_id) return null;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch("https://myworkstatus.in/ecom/api/user_delete.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: data.user_id }),
      });

      const result = await response.json();

      if (result.success) {
        onDelete(); // Refresh list
        onClose();  // Close modal
      } else {
        alert(result.message || "Failed to delete user.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal delete-modal">
        <h3>{title}</h3>
        <p>
          Are you sure you want to delete{" "}
          <strong>{data.user_name || "this user"}</strong>?
        </p>
        <div className="modal-actions">
          <button className="btn delete-btn" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Yes, Delete"}
          </button>
          <button className="btn cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
