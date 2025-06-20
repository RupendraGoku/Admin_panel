import InputGroup from "./InputGroup";
import "../../CSS/AddModal.css";

const FormRows = ({ fields, formData, handleChange, validationErrors = {} }) => {
  const rows = [];
  let currentRow = [];

  fields.forEach((field, index) => {
    const inputElement = (
      <div className="input-with-error" key={field.name}>
        <InputGroup
          field={field}
          value={formData[field.name]}
          onChange={handleChange}
        />
        {validationErrors[field.name] && (
          <div className="input-error">{validationErrors[field.name]}</div>
        )}
      </div>
    );

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

export default FormRows;
