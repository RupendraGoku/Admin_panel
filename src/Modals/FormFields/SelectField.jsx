import "../../CSS/AddModal.css";

const SelectField = ({ field, value, onChange }) => (
  <div className="select-field">
    <select
      name={field.name}
      value={value || ""}
      onChange={onChange}
      required={field.required}
    >
      <option value="">Select {field.label}</option>
      {field.options.map((option) =>
        typeof option === "object" ? (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ) : (
          <option key={option} value={option}>
            {option}
          </option>
        )
      )}
    </select>
  </div>
);

export default SelectField;
