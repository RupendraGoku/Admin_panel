import React from "react";
import "../CSS/AddModal.css";
import CategoryForm from "./CategoryForm";

const CategoryEditModal = ({
  isOpen,
  onClose,
  onSubmit,
  title = "Edit Category",
  fields = [],
  initialData = {},
  size = "default",
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-container ${size === "large" ? "large" : "small"}`}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <CategoryForm
          fields={fields}
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onClose}
          submitLabel="Update & Save"
        />
      </div>
    </div>
  );
};

export default CategoryEditModal;
