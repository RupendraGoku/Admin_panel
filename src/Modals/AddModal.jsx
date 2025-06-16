import React, { useState, useEffect } from "react";
import "../CSS/AddModal.css";

const AddModal = ({ isOpen, onClose, onSubmit, title, fields = [], size = "default" }) => {
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const initialData = fields.reduce((acc, field) => {
acc[field.name] = field.defaultValue || (field.type === "radio" ? field.options?.[0].value : "");
      return acc;
    }, {});
    setFormData(initialData);
  }, [fields]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const lowerName = name.toLowerCase();
    let newValue = value;

    // Restrict typing for specific fields
    if (lowerName.includes("name") && !lowerName.includes("username")) {
      newValue = newValue.replace(/[^A-Za-z\s]/g, ""); // Only letters and spaces
    }

    if (["phone", "mobile", "contact"].some((key) => lowerName.includes(key))) {
      newValue = newValue.replace(/\D/g, "").slice(0, 10); // Only digits, max 10
    }

    const finalValue =
      type === "checkbox"
        ? checked
        : type === "file"
        ? e.target.multiple
          ? files
          : files[0]
        : newValue;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Check required fields
    for (const field of fields) {
      if (field.required && !formData[field.name]) {
        alert(`Please fill in the required field: ${field.label}`);
        setSubmitting(false);
        return;
      }
    }

    // Additional validation before submitting
    for (const key in formData) {
      const value = formData[key];
      const lowerKey = key.toLowerCase();

      if (lowerKey.includes("name") && !lowerKey.includes("username") && !/^[A-Za-z\s]+$/.test(value)) {
        alert("Name fields must contain only letters and spaces.");
        setSubmitting(false);
        return;
      }

      if (["phone", "mobile", "contact"].some((k) => lowerKey.includes(k)) && !/^\d{10}$/.test(value)) {
        alert("Phone number must contain exactly 10 digits.");
        setSubmitting(false);
        return;
      }
    }

    try {
      const response = await fetch("https://myworkstatus.in/ecom/api/user_insert.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        onSubmit(result.data || formData);
        onClose();
      } else {
        alert(result.message || "Failed to add user.");
      }
    } catch (error) {
      console.error("Add user error:", error);
      alert("Something went wrong while adding the user.");
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
      <label className={field.required ? "required" : ""}>{field.label}</label>

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
  <label key={option.value}>
    <input
      type="radio"
      name={field.name}
      value={option.value}
      checked={formData[field.name] === option.value}
      onChange={handleChange}
    />
    {option.label}
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
      <div className={`modal-container ${size === "large" ? "large" : "small"}`}>
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
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
