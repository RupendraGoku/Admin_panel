import React, { useState } from "react";
import "../CSS/DataTable.css";
import AddModal from "../Modals/AddModal";

const DataTable = ({
  title,
  addBtnLabel,
  addBtnIcon,
  headers,
  data,
  cssClassPrefix,
  renderRow,
  modalFields = [],
  onAddSubmit = () => {},
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClick = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const handleModalSubmit = (formData) => {
    onAddSubmit(formData);
    setIsModalOpen(false);
  };

  return (
    <div className={`${cssClassPrefix}-wrapper`}>
      <div className="table-container">
        {/* Header with Title and Add Button */}
        <div className={`${cssClassPrefix}-header`}>
          <h2>{title}</h2>
          <button className="add-user-btn" onClick={handleAddClick}>
            <i className={`fas ${addBtnIcon}`}></i>
            {addBtnLabel}
          </button>
        </div>

        {/* Export & Search Tools */}
        <div className="users-tools">
          <div className="button-row">
            <div className="export-buttons">
              <button>Copy</button>
              <button>CSV</button>
              <button>Excel</button>
              <button>PDF</button>
              <button>Print</button>
            </div>
            <div className="search-box">
              <input type="text" placeholder="Search..." />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className={`${cssClassPrefix}-table-container`}>
          <table className={`${cssClassPrefix}-table`}>
            <thead>
              <tr>
                {headers.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={headers.length} className="no-data">
                    No records found.
                  </td>
                </tr>
              ) : (
                data.map((item, i) => renderRow(item, i))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className={`${cssClassPrefix}-footer`}>
          <span>Showing {data.length} entries</span>
          <div className="pagination-buttons">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>Next</button>
          </div>
        </div>
      </div>

      {/* Reusable Add Modal */}
      {isModalOpen && (
        <AddModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title={addBtnLabel}
          fields={modalFields}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default DataTable;
