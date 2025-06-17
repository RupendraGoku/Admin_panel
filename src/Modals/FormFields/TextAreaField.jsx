import "../../CSS/AddModal.css";

const TextAreaField = ({ field, value, onChange }) => (
  <textarea
    name={field.name}
    value={value}
    onChange={onChange}
    placeholder={field.placeholder || ""}
    required={field.required}
    rows="3"
  />
);
export default TextAreaField;
