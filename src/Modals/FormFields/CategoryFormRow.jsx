import InputGroup from "./InputGroup";
import SelectGroup from "./SelectGroup";
import "../../CSS/BrandModal.css"; // Or use AddModal.css if generalized

const CategoryFormRows = ({ fields = [], formData = {}, handleChange }) => {
  const rows = [];
  let currentRow = [];

  const renderField = (field) => {
    const inputClass = field.fullWidth ? "input-group full-width" : "input-group";
    const isImageField =
      field.name.toLowerCase().includes("logo") || field.name.toLowerCase().includes("image");
    const value = formData[field.name];

    return (
      <div className={inputClass} key={field.name}>
        {field.type === "select" ? (
          <SelectGroup field={field} value={value} onChange={handleChange} />
        ) : (
          <InputGroup field={field} value={value} onChange={handleChange} />
        )}

        {isImageField && (
          <>
            <small>Only JPG, PNG, JPEG file allowed.</small>
            {value && typeof value === "string" && (
              <img
                src={`https://myworkstatus.in/ecom/admin/images/category/${value}`}
                alt="Preview"
                style={{
                  marginTop: "10px",
                  maxHeight: "100px",
                  objectFit: "contain",
                  border: "1px solid #e0e0e0",
                  borderRadius: "4px",
                }}
              />
            )}
          </>
        )}
      </div>
    );
  };

  fields.forEach((field, index) => {
    const inputElement = renderField(field);

    if (field.fullWidth) {
      if (currentRow.length) {
        rows.push(
          <div className="brand-input-row" key={`row-${index}-partial`}>
            {currentRow}
          </div>
        );
        currentRow = [];
      }
      rows.push(
        <div className="brand-input-row full-width" key={`row-${index}-full`}>
          {inputElement}
        </div>
      );
    } else {
      currentRow.push(inputElement);
      if (currentRow.length === 2) {
        rows.push(
          <div className="brand-input-row" key={`row-${index}`}>
            {currentRow}
          </div>
        );
        currentRow = [];
      }
    }
  });

  if (currentRow.length > 0) {
    rows.push(
      <div className="brand-input-row" key="final-row">
        {currentRow}
      </div>
    );
  }

  return <>{rows}</>;
};

export default CategoryFormRows;
