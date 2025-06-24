
import React, { useState, useContext } from "react";
import "../CSS/AddModal.css";
import { toast } from "react-toastify";
import { ApiServiceContext } from "../context/Context";

const DeleteModal = ({
  isOpen,
  onClose,
  onDelete, // this will be called after success
  title = "Delete Confirmation",
  data
}) => {
  const [deleting, setDeleting] = useState(false);
  const { apiEndpoints ,type} = useContext(ApiServiceContext);

  // Define ID and display key based on type
  const idKey = type === "brand" ? "brand_id" : "user_id";
  const nameKey = type === "brand" ? "brand_name" : "user_name";

  if (!isOpen || !data?.[idKey]) return null;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const apiUrl = apiEndpoints[type]['delete'];

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [idKey]: data[idKey] }), // Send correct ID
      });

      const result = await response.json();

      if (result.success || result.status === "true") {
        toast.success(`${type === "brand" ? "Brand" : "User"} deleted successfully.`);
        onDelete();
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(result.message || `Failed to delete ${type === "brand" ? "brand" : "user"}.`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong while deleting.");
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
          <strong>{data[nameKey] || (type === "brand" ? "this brand" : "this user")}</strong>?
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
