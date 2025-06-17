import React, { useState } from "react";
import "../CSS/DataTable.css";
import AddModal from "../Modals/AddModal";
import EditModal from "../Modals/EditModal";
import DeleteModal from "../Modals/DeleteModal";
import "../CSS/EditDelete.css";
import { toast } from "react-toastify"; 


const DataTable = ({
  title,
  addBtnLabel,
  addBtnIcon,
  headers,
  data,
  cssClassPrefix,
  modalFields = [],
  reload,
  setReload,
}) => {
  const [tableData, setTableData] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  React.useEffect(() => {
    setTableData(data);
  }, [data]);

  const filteredData = tableData.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedData = filteredData.slice(startIdx, endIdx);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleAddClick = () => {
    setSelectedRow(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleEditClick = (item) => {
    setSelectedRow(item);
    setModalMode("edit");
    setDropdownIndex(null);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item) => {
    setSelectedRow(item);
    setModalMode("delete");
    setDropdownIndex(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

const handleModalSubmit = (formData) => {
  setIsModalOpen(false);
  setSelectedRow(null);

  const hasValidData =
    formData && Object.values(formData).some(val => val !== undefined && String(val).trim() !== "");

  if (!hasValidData) {
    console.warn("Ignored empty form submission.");
    return;
  }

  if (modalMode === "add") {
    toast.success("User Added Successfully");
  } else if (modalMode === "edit") {
    toast.success("User Updated Successfully");
  } else if (modalMode === "delete") {
    toast.success("User Deleted Successfully");
  }

  setReload(!reload); // ✅ Refresh table
};




  const handleDropdownToggle = (sno) => {
    setDropdownIndex((prevIndex) => (prevIndex === sno ? null : sno));
  };

  const headerKeyMap = {
    Sno: "sno",
    Name: "user_name",
    Email: "user_email",
    Phone: "user_phone",
    Username: "user_username",
    Role: "user_role",
    Status: "user_status",
    Action: "action",
  };

  return (
    <div className={`${cssClassPrefix}-wrapper`}>
      <div className="table-container">
        <div className={`${cssClassPrefix}-header`}>
          <h2>{title}</h2>
          <button className="add-user-btn" onClick={handleAddClick}>
            <i className={`fas ${addBtnIcon}`}></i> {addBtnLabel}
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
                paginatedData.map((item) => (
                  <tr key={item.sno}>
                    {headers.map((header, idx) => {
                      const key = headerKeyMap[header];

                      if (key === "action") {
                        return (
                          <td key={idx} className="action-col">
                            <button
                              className="action-btn"
                              onClick={() => handleDropdownToggle(item.sno)}
                            >
                              ...
                            </button>
                            {dropdownIndex === item.sno && (
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
                        );
                      } else if (key === "user_status") {
                        return (
                          <td key={idx}>
                            <span
                              className={`status-badge ${
                                item[key] === "Active"
                                  ? "status-active"
                                  : "status-deactive"
                              }`}
                            >
                              {item[key]}
                            </span>
                          </td>
                        );
                      } else if (key === "user_role") {
                        return (
                          <td key={idx}>
                            {item[key] === "1"
                              ? "Admin"
                              : item[key] === "2"
                              ? "User"
                              : item[key]}
                          </td>
                        );
                      } else {
                        return <td key={idx}>{item[key]}</td>;
                      }
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className={`${cssClassPrefix}-footer`}>
          <span>
            Showing {startIdx + 1} to {Math.min(endIdx, totalItems)} of {totalItems} entries
          </span>
          <div className="pagination-buttons">
            <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                disabled={currentPage === page}
                className={currentPage === page ? "active" : ""}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
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
