import React, { useEffect, useState } from "react";
import "./../CSS/AddModal.css";
import FormRows from "./FormFields/FormRows";

const AddModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  fields = [],
  size = "default",
  existingUsers = [],
}) => {
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

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

    // Check for duplicates
    let error = "";

    if (name === "user_email") {
      if (existingUsers.some((u) => u.user_email.toLowerCase() === finalValue.toLowerCase())) {
        error = "Email already registered";
      }
    }

    if (name === "user_phone") {
      if (existingUsers.some((u) => u.user_phone === finalValue)) {
        error = "Phone already registered";
      }
    }

    if (name === "user_username") {
      if (existingUsers.some((u) => u.user_username.toLowerCase() === finalValue.toLowerCase())) {
        error = "Username already taken";
      }
    }

    setValidationErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Basic required field check
    for (const field of fields) {
      if (field.required && !formData[field.name]) {
        alert(`Please fill in the required field: ${field.label}`);
        setSubmitting(false);
        return;
      }
    }

    // Validation check
    for (const key in validationErrors) {
      if (validationErrors[key]) {
        alert("Please enter new data.");
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
        const submittedData = result.data || formData;

        const hasValidData = Object.values(submittedData).some(
          (val) => val !== undefined && String(val).trim() !== ""
        );

        if (hasValidData && submittedData.user_name?.trim() !== "") {
          onSubmit(submittedData);
        } else {
          console.warn("Skipping blank record submit");
        }

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
          <FormRows
            fields={fields}
            formData={formData}
            handleChange={handleChange}
            validationErrors={validationErrors}
          />
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
