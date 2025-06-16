import React, { useEffect, useState } from "react";
import "../CSS/AddModal.css";

const EditModal = ({ isOpen, onClose, onSubmit, title, fields = [], data }) => {
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (data) {
      const filled = fields.reduce((acc, field) => {
        acc[field.name] = data[field.name] ?? (field.type === "radio" ? field.options?.[0] : "");
        return acc;
      }, {});
      setFormData(filled);
    }
  }, [data, fields]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("https://myworkstatus.in/ecom/api/user_update.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        onSubmit();  // Refresh data in parent
        onClose();   // Close modal
      } else {
        alert(result.message || "Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Something went wrong while updating the user.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const renderInputGroup = (field) => (
    <div
      className={`input-group ${field.fullWidth ? "full-width" : ""} ${field.className || ""}`}
      key={field.name}
    >
      <label htmlFor={field.name} className={field.required ? "required" : ""}>
        {field.label}
      </label>

      {field.type === "textarea" ? (
        <textarea
          id={field.name}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          placeholder={field.placeholder || ""}
          rows="3"
        />
      ) : field.type === "radio" && field.options ? (
        <div className="radio-group">
          {field.options.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name={field.name}
                value={option}
                checked={formData[field.name] === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>
      ) : field.type === "select" && field.options ? (
        <select
          id={field.name}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          required={field.required}
        >
          {field.options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={field.name}
          type={field.type || "text"}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          placeholder={field.placeholder || ""}
          required={field.required}
        />
      )}
    </div>
  );

  const renderFieldsInRows = () => {
    const rows = [];
    let currentRow = [];

    fields.forEach((field, index) => {
      if (field.fullWidth) {
        if (currentRow.length > 0) {
          rows.push(
            <div className="input-row" key={`row-${index}-partial`}>
              {currentRow.map(renderInputGroup)}
            </div>
          );
          currentRow = [];
        }
        rows.push(
          <div className="input-row" key={`row-${index}-full`}>
            {renderInputGroup(field)}
          </div>
        );
      } else {
        currentRow.push(field);
        if (currentRow.length === 2) {
          rows.push(
            <div className="input-row" key={`row-${index}`}>
              {currentRow.map(renderInputGroup)}
            </div>
          );
          currentRow = [];
        }
      }
    });

    if (currentRow.length > 0) {
      rows.push(
        <div className="input-row" key="row-final">
          {currentRow.map(renderInputGroup)}
        </div>
      );
    }

    return rows;
  };

  return (
    <div className="modal-overlay">
      <div className={`modal-container ${title?.includes("Product") || title?.includes("Category") ? "large" : "small"}`}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          {renderFieldsInRows()}

          <div className="modal-actions">
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? "Updating..." : "Update"}
            </button>
            <button type="button" className="btn-close" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
