import React, { useEffect, useState } from "react";
import FormRows from "./FormFields/FormRows";

const UserForm = ({
  fields = [],
  initialData = {},
  onSubmit,
  onCancel,
  submitLabel = "Submit",
}) => {
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const initData = {
      ...initialData,
    };

    fields.forEach((field) => {
      if (!(field.name in initData)) {
        initData[field.name] =
          field.defaultValue ??
          (field.type === "radio" ? field.options?.[0]?.value : "");
      }
    });

   setFormData(
  Object.fromEntries(
    Object.entries(initData).map(([k, v]) => [k, typeof v === "number" ? String(v) : v])
  )
);

  }, [fields, initialData]);

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
      type === "checkbox" ? checked : type === "file" ? e.target.multiple ? files  : files[0]  : newValue;
    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const validate = () => {
    for (const field of fields) {
      const val = formData[field.name];
      const key = field.name.toLowerCase();
      if (field.required && (val === undefined || val === "")) {
        alert(`Please fill in the required field: ${field.label}`);
        return false;
      }
      if (
        key.includes("name") &&
        !key.includes("username") &&
        val &&
        !/^[A-Za-z\s]+$/.test(val)
      ) {
        alert("Name fields must contain only letters and spaces.");
        return false;
      }
      if (
        ["phone", "mobile", "contact"].some((k) => key.includes(k)) &&
        val &&
        !/^\d{10}$/.test(val)
      ) {
        alert("Phone number must be exactly 10 digits.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filtered = Object.entries(formData).filter(
      ([key]) => !["user_id", "_id", "id", "created_at", "updated_at"].includes(key)
    );
    const hasRealInput = filtered.some(
      ([_, val]) => val !== undefined && String(val).trim() !== ""
    );
    console.log("Attempting submit. Form data:", formData);
    if (!hasRealInput) {
      console.warn("Submission blocked: No valid user-entered data.");
      return;
    }
    setSubmitting(true);
    if (!validate()) {
      setSubmitting(false);
      return;
    }
    console.log("Submitting form data to parent:", formData);
    await onSubmit(formData);
    setSubmitting(false);
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <FormRows
        fields={fields}
        formData={formData}
        handleChange={handleChange}
      />
      <div className="modal-actions">
        <button type="button" className="btn-close" onClick={onCancel}>
          Close
        </button>
        <button type="submit" className="btn-submit" disabled={submitting}>
          {submitting ? "Submitting..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
