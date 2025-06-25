import React from "react";

const CategoryFormRows = ({ fields = [], formData = {}, handleChange }) => {
  return (
    <>
      {fields.map((field, idx) => (
        <div className="form-row" key={idx}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type || "text"}
            name={field.name}
            id={field.name}
            placeholder={field.placeholder || field.label}
            value={formData[field.name] || ""}
            onChange={handleChange}
            required={field.required}
          />
        </div>
      ))}
    </>
  );
};

export default CategoryFormRows;
