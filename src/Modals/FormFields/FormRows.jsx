import InputGroup from "./InputGroup";
import "../../CSS/AddModal.css";


const FormRows = ({ fields, formData, handleChange }) => {
  const rows = [];
  let currentRow = [];

  fields.forEach((field, index) => {
    if (field.fullWidth) {
      if (currentRow.length) {
        rows.push(
          <div className="input-row" key={`row-${index}-partial`}>
            {currentRow.map((f) => (
              <InputGroup key={f.name} field={f} value={formData[f.name]} onChange={handleChange} />
            ))}
          </div>
        );
        currentRow = [];
      }

      rows.push(
        <div className="input-row" key={`row-${index}-full`}>
          <InputGroup key={field.name} field={field} value={formData[field.name]} onChange={handleChange} />
        </div>
      );
    } else {
      currentRow.push(field);
      if (currentRow.length === 2) {
        rows.push(
          <div className="input-row" key={`row-${index}`}>
            {currentRow.map((f) => (
              <InputGroup key={f.name} field={f} value={formData[f.name]} onChange={handleChange} />
            ))}
          </div>
        );
        currentRow = [];
      }
    }
  });

  if (currentRow.length > 0) {
    rows.push(
      <div className="input-row" key="final-row">
        {currentRow.map((f) => (
          <InputGroup key={f.name} field={f} value={formData[f.name]} onChange={handleChange} />
        ))}
      </div>
    );
  }

  return rows;
};

export default FormRows;
