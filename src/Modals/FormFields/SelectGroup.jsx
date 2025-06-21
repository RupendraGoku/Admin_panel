import React from "react";
import "../../CSS/Selectgroup.css";

const SelectGroup = ({ field, value, onChange, error }) => {
  return (
    <div className="input-group">
<label className={field.required ? "required" : ""}>{field.label}</label>
      <select
        name={field.name}
        value={value}
        onChange={onChange}
        required={field.required}
      >
        {field.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <div className="input-error">{error}</div>}
    </div>
  );
};

export default SelectGroup;
