import React, { useEffect, useState } from "react";
import BrandFormRows from "../Modals/FormFields/BrandFormRow";

const BrandForm = ({
  fields = [],
  initialData = {},
  onSubmit,
  onCancel,
  submitLabel = "Submit",
}) => {
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const initData = { ...initialData };

    fields.forEach((field) => {
      if (!(field.name in initData)) {
        initData[field.name] =
          field.defaultValue ?? (field.type === "radio" ? field.options?.[0]?.value : "");
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

    if (lowerName.includes("name")) {
      newValue = newValue.replace(/[^A-Za-z\s]/g, "");
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

  const validate = () => {
    for (const field of fields) {
      const val = formData[field.name];
      const key = field.name.toLowerCase();
      if (field.required && (val === undefined || val === "")) {
        alert(`Please fill in the required field: ${field.label}`);
        return false;
      }
      if (key.includes("name") && val && !/^[A-Za-z\s]+$/.test(val)) {
        alert("Brand name must contain only letters and spaces.");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filtered = Object.entries(formData).filter(
      ([key]) => !["brand_id", "_id", "id", "created_at", "updated_at"].includes(key)
    );
    const hasRealInput = filtered.some(
      ([_, val]) => val !== undefined && String(val).trim() !== ""
    );

    if (!hasRealInput) {
      console.warn("Submission blocked: No valid data entered.");
      return;
    }

    setSubmitting(true);

    if (!validate()) {
      setSubmitting(false);
      return;
    }

    await onSubmit(formData);
    setSubmitting(false);
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <BrandFormRows
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

export default BrandForm;
