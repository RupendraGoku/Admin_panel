import React, { useContext } from "react";
import "../CSS/AddModal.css";
import BrandForm from "./BrandForm";
import { ApiServiceContext } from "../context/Context";

const BrandEditModal = ({
  isOpen,
  onClose,
  onSubmit,
  title = "Edit Brand",
  fields = [],
  initialData = {},
  size = "default",
}) => {
  const { apiEndpoints } = useContext(ApiServiceContext);

  if (!isOpen) return null;

  const handleEdit = async (formData) => {
    try {
      const apiUrl = apiEndpoints["brand"]["update"];

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, brand_id: initialData.brand_id }),
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
      console.error("Edit brand error:", error);
      alert("Something went wrong while updating the brand.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className={`modal-container ${size === "large" ? "large" : "small"}`}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <BrandForm
          fields={[
            ...fields,
            {
              label: "Status",
              name: "status",
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
          submitLabel="Edit Brand"
        />
      </div>
    </div>
  );
};

export default BrandEditModal;
