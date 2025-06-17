import InputField from "./InputField";
import FileInput from "./FileInput";
import RadioGroup from "./RadioGroup";
import SelectField from "./SelectField";
import TextAreaField from "./TextAreaField";
import "../../CSS/AddModal.css";

const InputGroup = ({ field, value, onChange }) => {
  return (
    <div className={`input-group ${field.fullWidth ? "full-width" : ""} ${field.className || ""}`}>
      <label className={field.required ? "required" : ""}>{field.label}</label>

      {["text", "email", "number", "password"].includes(field.type) && (
        <InputField field={field} value={value} onChange={onChange} />
      )}
      {field.type === "file" && <FileInput field={field} onChange={onChange} />}
      {field.type === "radio" && <RadioGroup field={field} value={value} onChange={onChange} />}
      {field.type === "select" && <SelectField field={field} value={value} onChange={onChange} />}
      {field.type === "textarea" && <TextAreaField field={field} value={value} onChange={onChange} />}
    </div>
  );
};

export default InputGroup;
