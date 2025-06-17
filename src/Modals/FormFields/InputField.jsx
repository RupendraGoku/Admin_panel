import "../../CSS/AddModal.css";

const InputField = ({ field, value, onChange }) => {
  const getDefaultPlaceholder = () => {
    const name = field.name.toLowerCase();
    if (name.includes("name") && !name.includes("username")) return "Full Name";
    if (name.includes("email")) return "Email Address";
    if (name.includes("phone") || name.includes("mobile") || name.includes("contact")) return "Phone Number";
    if (name.includes("username")) return "Username";
    return "";
  };

  return (
   <input
  type={field.type}
  name={field.name}
  value={value ?? ""}
  onChange={onChange}
  placeholder={field.placeholder || getDefaultPlaceholder()}
  required={field.required}
/>

  );
};

export default InputField;
