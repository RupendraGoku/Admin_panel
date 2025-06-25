import { useEffect, useState, useContext } from "react";
import "./../CSS/AddModal.css";
import BrandFormRows from "../Modals/FormFields/BrandFormRow";
import { ApiServiceContext } from "../context/Context";

const BrandAddModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  fields = [],
  size = "default",
}) => {
  const { apiEndpoints, type } = useContext(ApiServiceContext);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const initialData = fields.reduce((acc, field) => {
      acc[field.name] =
        field.defaultValue || (field.type === "radio" ? field.options?.[0]?.value : "");
      return acc;
    }, {});
    setFormData(initialData);
  }, [fields]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const field of fields) {
      if (field.required && !formData[field.name]) {
        alert(`Please fill in the required field: ${field.label}`);
        return;
      }
    }

    try {
      const apiUrl = apiEndpoints["brand"]["insert"];

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success || result.status === "true") {
        onSubmit(result.data || formData);
        onClose();
      } else {
        alert(result.message || "Failed to add brand.");
      }
    } catch (error) {
      console.error("Add brand error:", error);
      alert("Something went wrong while adding the brand.");
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
          <BrandFormRows
            fields={fields}
            formData={formData}
            handleChange={handleChange}
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

export default BrandAddModal;
