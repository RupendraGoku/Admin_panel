import React, { useState, useEffect } from "react";
import "../CSS/AddModal.css";

const AddModal = ({ isOpen, onClose, onSubmit, title, fields = [], size = "default" }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initialData = fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || (field.type === "radio" ? field.options?.[0] : "");
      return acc;
    }, {});
    setFormData(initialData);
  }, [fields]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? (e.target.multiple ? files : files[0]) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  const renderInputGroup = (field) => (
    <div
      className={`input-group ${field.fullWidth ? "full-width" : ""} ${field.className || ""}`}
      key={field.name}
    >
      <label className={field.required ? "required" : ""}>
        {field.label}
      </label>

      {["text", "email", "number", "password"].includes(field.type) && (
        <input
          type={field.type}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          placeholder={field.placeholder || ""}
          required={field.required}
        />
      )}

      {field.type === "file" && (
        <input
          type="file"
          name={field.name}
          onChange={handleChange}
          required={field.required}
          accept={field.accept}
          multiple={field.multiple}
        />
      )}

      {field.type === "radio" && (
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
      )}

      {field.type === "select" && (
        <select
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          required={field.required}
        >
          {field.options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {field.type === "textarea" && (
        <textarea
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          placeholder={field.placeholder || ""}
          required={field.required}
          rows="3"
        />
      )}
    </div>
  );

  // ✅ Smart layout handling: full-width fields break row, others grouped in 2s
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
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          {renderFieldsInRows()}
          <div className="modal-actions">
            <button type="button" className="btn-close" onClick={onClose}>
              Close
            </button>
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
