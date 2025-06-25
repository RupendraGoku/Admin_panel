import React from "react";
import "../CSS/AddModal.css";
import CategoryForm from "../Modals/CategoryForm";

const CategoryAddModal = ({
  isOpen,
  onClose,
  onSubmit,
  title = "Add Category",
  fields = [],
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
          onSubmit={onSubmit}
          onCancel={onClose}
          submitLabel="Submit"
        />
      </div>
    </div>
  );
};

export default CategoryAddModal;
