// src/Modals/EditModal.jsx
import React, { useEffect, useState } from "react";
import "../CSS/AddModal.css";


const EditModal = ({ isOpen, onClose, onSubmit, title, fields = [], data }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data) {
      const filled = fields.reduce((acc, field) => {
        acc[field.name] = data[field.name] || "";
        return acc;
      }, {});
      setFormData(filled);
    }
  }, [data, fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{title}</h3>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div className="form-group" key={field.name}>
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="modal-actions">
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
