import React, { useState } from "react";
import "../CSS/AddModal.css";

const CategoryDeleteModal = ({
  isOpen,
  onClose,
  onDelete,
  title = "Delete Category",
  data,
}) => {
  const [deleting, setDeleting] = useState(false);

  if (!isOpen || !data?.pcat_id) return null;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch("https://myworkstatus.in/ecom/api/product_category_delete.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pcat_id: data.pcat_id }), // ✅ use correct field name
      });

      const result = await response.json();

      if (result.success || result.status === "true") {
        onDelete();
        onClose();
        setTimeout(() => window.location.reload(), 1000);
      } else {
        alert(result.message || "Failed to delete category.");
      }
    } catch (error) {
      console.error("Delete category error:", error);
      alert("Something went wrong while deleting the category.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal delete-modal">
        <h3>{title}</h3>
        <p>Are you sure you want to delete <strong>{data?.pcat_name || "this category"}</strong>?</p>
        <div className="modal-actions">
          <button className="btn delete-btn" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Yes, Delete"}
          </button>
          <button className="btn cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryDeleteModal;
