import React, { useState } from "react";
import "../CSS/DataTable.css";
import AddModal from "../Modals/AddModal";
import "../CSS/EditDelete.css";
import EditModal from "../Modals/EditModal";
import DeleteModal from "../Modals/DeleteModal";

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
  const [modalMode, setModalMode] = useState("add"); // 'add', 'edit', 'delete'
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownIndex, setDropdownIndex] = useState(null); // to toggle 3-dot dropdown

  const handleAddClick = () => {
    setSelectedRow(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setModalMode("delete");
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const handleModalSubmit = (formData) => {
    if (modalMode === "add") {
      onAddSubmit(formData);
    } else if (modalMode === "edit") {
      console.log("Edit submit:", formData);
      // You can trigger onEdit callback or update state here
    } else if (modalMode === "delete") {
      console.log("Delete submit:", selectedRow);
      // You can trigger onDelete callback or update state here
    }
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className={`${cssClassPrefix}-wrapper`}>
      <div className="table-container">
        <div className={`${cssClassPrefix}-header`}>
          <h2>{title}</h2>
          <button className="add-user-btn" onClick={handleAddClick}>
            <i className={`fas ${addBtnIcon}`}></i>
            {addBtnLabel}
          </button>
        </div>

        <div className="users-tools">
          <div className="button-row">
            <div className="export-buttons">
              <button>Copy</button>
              <button>CSV</button>
              <button>Excel</button>
              <button>PDF</button>
              <button>Print</button>
            </div>
            <div className="search-form">
              <label htmlFor="searchInput">Search:</label>
              <input
                id="searchInput"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
              />
            </div>
          </div>
        </div>

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
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={headers.length} className="no-data">
                    No records found.
                  </td>
                </tr>
              ) : (
                filteredData.map((item, i) => (
                  <tr key={i}>
                    <td>{item.sno}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.username}</td>
                    <td>{item.role}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          item.status === "Active"
                            ? "status-active"
                            : "status-deactive"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="action-col">
                      <button
                        className="action-btn"
                        onClick={() =>
                          setDropdownIndex(dropdownIndex === i ? null : i)
                        }
                      >
                        ...
                      </button>
                     {dropdownIndex === i && (
  <div className="action-menu">
    <button onClick={() => handleEditClick(item)}>
      <i className="fas fa-edit"></i> Edit
    </button>
    <button onClick={() => handleDeleteClick(item)}>
      <i className="fas fa-trash-alt"></i> Delete
    </button>
  </div>
)}

                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className={`${cssClassPrefix}-footer`}>
          <span>Showing {filteredData.length} entries</span>
          <div className="pagination-buttons">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>Next</button>
          </div>
        </div>
      </div>

   {isModalOpen && modalMode === "add" && (
  <AddModal
    isOpen={true}
    onClose={handleModalClose}
    title={addBtnLabel}
    fields={modalFields}
    onSubmit={handleModalSubmit}
  />
)}

{isModalOpen && modalMode === "edit" && (
  <EditModal
    isOpen={true}
    onClose={handleModalClose}
    title="Edit User"
    data={selectedRow}
    fields={modalFields}
    onSubmit={handleModalSubmit}
  />
)}

{isModalOpen && modalMode === "delete" && (
  <DeleteModal
    isOpen={true}
    onClose={handleModalClose}
    title="Confirm Delete"
    data={selectedRow}
    onDelete={handleModalSubmit}
  />
)}

    </div>
  );
};

export default DataTable;
