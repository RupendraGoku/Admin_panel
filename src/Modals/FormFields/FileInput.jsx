import "../../CSS/AddModal.css";

const FileInput = ({ field, onChange }) => (
  <input
    type="file"
    name={field.name}
    onChange={onChange}
    required={field.required}
    accept={field.accept}
    multiple={field.multiple}
  />
);
export default FileInput;
