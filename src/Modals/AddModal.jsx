import React, { useEffect, useState } from "react";
import "./../CSS/AddModal.css";
import FormRows from "./FormFields/FormRows";
import { toast } from "react-toastify";


const AddModal = ({ isOpen, onClose, onSubmit, title, fields = [], size = "default" }) => {
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const initialData = fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || (field.type === "radio" ? field.options?.[0]?.value : "");
      return acc;
    }, {});
    setFormData(initialData);
  }, [fields]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const lowerName = name.toLowerCase();
    let newValue = value;

    if (lowerName.includes("name") && !lowerName.includes("username")) {
      newValue = newValue.replace(/[^A-Za-z\s]/g, "");
    }

    if (["phone", "mobile", "contact"].some((key) => lowerName.includes(key))) {
      newValue = newValue.replace(/\D/g, "").slice(0, 10);
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

  // Validation checks
  for (const field of fields) {
    if (field.required && !formData[field.name]) {
      alert(`Please fill in the required field: ${field.label}`);
      setSubmitting(false);
      return;
    }
  }

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

if (result.success || result.status === "true") {
  onSubmit(result.data || formData);
  onClose(); // ✅ Close the modal automatically
  window.location.reload(); // ✅ Reload to show the new user
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
          <FormRows fields={fields} formData={formData} handleChange={handleChange} />
          <div className="modal-actions">
            <button type="button" className="btn-close" onClick={onClose}>Close</button>
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
