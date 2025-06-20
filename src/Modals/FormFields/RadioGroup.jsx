import "../../CSS/AddModal.css";

const RadioGroup = ({ field, value, onChange }) => (
  <div className="radio-group">
    {field.options.map((option) => (
      <label key={option.value}>
        <input
          type="radio"
          name={field.name}
          value={option.value}
checked={String(value) === String(option.value)}
          onChange={onChange}
        />
        {option.label}
      </label>
    ))}
  </div>

);
export default RadioGroup;
