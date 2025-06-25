import React, { useState, useEffect } from "react";
import CategoryFormRows from "../Modals/FormFields/CategoryFormRow";

const CategoryForm = ({
  fields,
  initialData = {},
  onSubmit,
  onCancel,
  submitLabel = "Submit",
}) => {
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // useEffect that tracks stable stringified versions to avoid infinite loop
  useEffect(() => {
    const init = {};
    fields.forEach((field) => {
      init[field.name] = initialData[field.name] || field.defaultValue || "";
    });
    setFormData(init);
  }, [JSON.stringify(fields), JSON.stringify(initialData)]); // ✅ safe dependencies

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const isEdit = !!initialData?.category_id;
    const apiUrl = isEdit
      ? "https://myworkstatus.in/ecom/api/product_category_update.php"
      : "https://myworkstatus.in/ecom/api/product_category_insert.php";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...(isEdit ? { category_id: initialData.category_id } : {}),
        }),
      });

      const result = await response.json();
      if (result.success || result.status === "true") {
        onSubmit(formData);
        onCancel();
      } else {
        alert(result.message || "Failed to save category.");
      }
    } catch (error) {
      console.error("Category form error:", error);
      alert("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <CategoryFormRows
        fields={fields}
        formData={formData}
        handleChange={handleChange}
      />
      <div className="modal-actions">
        <button type="button" className="btn-close" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-submit" disabled={submitting}>
          {submitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
