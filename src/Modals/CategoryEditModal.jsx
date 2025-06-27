import React, { useContext } from "react";
import "../CSS/BrandModal.css"; // Consider renaming to AddModal.css if reused across components
import CategoryForm from "./CategoryForm";
import { ApiServiceContext } from "../context/Context";

const CategoryEditModal = ({
  isOpen,
  onClose,
  onSubmit,
  title = "Edit Category",
  fields = [],
  initialData = {},
  size = "default",
}) => {
  const { apiEndpoints } = useContext(ApiServiceContext);

  if (!isOpen) return null;

  const handleEdit = async (formData) => {
    try {
      const apiUrl = apiEndpoints["category"]["update"];

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, category_id: initialData.category_id }),
      });

      const result = await response.json();

      if (result.status === "true" || result.success) {
        onSubmit(formData);
        onClose();
        window.location.reload();
      } else {
        alert(result.message || "Update failed.");
      }
    } catch (error) {
      console.error("Edit category error:", error);
      alert("Something went wrong while updating the category.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className={`modal-container ${size === "large" ? "large" : "small"}`}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <CategoryForm
          fields={[
            ...fields,
            {
              label: "Status",
              name: "status",
              type: "select",
              required: true,
               fullWidth: true, // ✅ Must be present
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
        />
      </div>
    </div>
  );
};

export default CategoryEditModal;
