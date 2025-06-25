import InputGroup from "./InputGroup";
import SelectGroup from "./SelectGroup";
import "../../CSS/AddModal.css";

const CategoryFormRows = ({ fields = [], formData = {}, handleChange }) => {
  const rows = [];
  let currentRow = [];

  const renderField = (field) => {
    if (field.type === "select") {
      return (
        <SelectGroup
          key={field.name}
          field={field}
          value={formData[field.name]}
          onChange={handleChange}
        />
      );
    } else {
      return (
        <div className="input-with-error" key={field.name}>
          <InputGroup
            field={field}
            value={formData[field.name]}
            onChange={handleChange}
          />
        </div>
      );
    }
  };

  fields.forEach((field, index) => {
    const inputElement = renderField(field);

    if (field.fullWidth) {
      if (currentRow.length) {
        rows.push(
          <div className="input-row" key={`row-${index}-partial`}>
            {currentRow}
          </div>
        );
        currentRow = [];
      }
      rows.push(
        <div className="input-row full-width" key={`row-${index}-full`}>
          {inputElement}
        </div>
      );
    } else {
      currentRow.push(inputElement);
      if (currentRow.length === 2) {
        rows.push(
          <div className="input-row" key={`row-${index}`}>
            {currentRow}
          </div>
        );
        currentRow = [];
      }
    }
  });

  if (currentRow.length > 0) {
    rows.push(
      <div className="input-row" key="final-row">
        {currentRow}
      </div>
    );
  }

  return <>{rows}</>;
};

export default CategoryFormRows;
