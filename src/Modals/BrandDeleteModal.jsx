import React, { useState, useContext } from "react";
import "../CSS/AddModal.css";
import { toast } from "react-toastify";
import { ApiServiceContext } from "../context/Context";

const BrandDeleteModal = ({
  isOpen,
  onClose,
  onDelete,
  title = "Delete Brand",
  data,
}) => {
  const [deleting, setDeleting] = useState(false);
  const { apiEndpoints } = useContext(ApiServiceContext);

  if (!isOpen || !data?.brand_id) return null;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const apiUrl = apiEndpoints["brand"]["delete"];

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand_id: data.brand_id }),
      });

      const result = await response.json();

      if (result.success || result.status === "true") {
        toast.success("Brand deleted successfully.");
        onDelete();
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(result.message || "Failed to delete brand.");
      }
    } catch (error) {
      console.error("Delete brand error:", error);
      toast.error("Something went wrong while deleting the brand.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal delete-modal">
        <h3>{title}</h3>
        <p>
          Are you sure you want to delete <strong>{data.brand_name || "this brand"}</strong>?
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

export default BrandDeleteModal;
