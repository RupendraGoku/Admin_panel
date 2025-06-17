import "../../CSS/AddModal.css";

const SelectField = ({ field, value, onChange }) => (
  <select
    name={field.name}
    value={value}
    onChange={onChange}
    required={field.required}
  >
    {field.options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);
export default SelectField;
