import React, { useState, useEffect } from "react";
import "../../CSS/DataTable.css";
import "../../CSS/EditDelete.css";
import DataTableHeader from "./DataTableHeader";
import DataTableToolbar from "./DataTableToolbar";
import DataTableContent from "./DataTableContent";
import DataTableFooter from "./DataTableFooter";
import DataTableModals from "./DataTableModals";
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
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const itemsPerPage = 10;

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

  
  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleSort = (key, direction) => {
    setSortKey(key);
    setSortDirection(direction);
  };

  const filteredData = tableData.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedData = sortedData.slice(startIdx, endIdx);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

 const handleAddClick = () => {
  setSelectedRow({ allUsers: data });
  setModalMode("add");
  setIsModalOpen(true);
};


const handleEditClick = (item) => {
  setSelectedRow({
    ...item,
    allUsers: data, // ✅ So `existingUsers` becomes available to EditModal
    user_role: String(item.user_role_value ?? "1"),
    user_status: String(item.user_status_value ?? "1"),
  });
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
    const isEmpty =
      !formData ||
      Object.values(formData).every((val) => {
        if (val === null || val === undefined) return true;
        if (typeof val === "string" && val.trim() === "") return true;
        return false;
      });

    if (isEmpty) {
      console.warn("❌ Ignored empty/invalid submission", formData);
      return;
    }

    if (modalMode === "add") {
      toast.success("User Added Successfully");
    } else if (modalMode === "edit") {
      toast.success("User Updated Successfully");
    } else if (modalMode === "delete") {
      toast.success("User Deleted Successfully");
    }

    setReload(!reload);
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const handleDropdownToggle = (sno) => {
    setDropdownIndex((prev) => (prev === sno ? null : sno));
  };

  const exportColumns = headers
    .filter((h) => headerKeyMap[h] !== "action")
    .map((h) => headerKeyMap[h]);

  return (
    <div className={`${cssClassPrefix}-wrapper`}>
      <div className="table-container">
        <DataTableHeader  title={title}
          addBtnLabel={addBtnLabel}
          addBtnIcon={addBtnIcon}
          onAddClick={handleAddClick}
        />

        <DataTableToolbar
  searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          exportData={filteredData}
          exportColumns={exportColumns}
        />

        <DataTableContent
          headers={headers}
          data={paginatedData}
          headerKeyMap={headerKeyMap}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          dropdownIndex={dropdownIndex}
          handleDropdownToggle={handleDropdownToggle}
          sortKey={sortKey}
          sortDirection={sortDirection}
          handleSort={handleSort}
        />

        <DataTableFooter
          startIdx={startIdx}
          endIdx={endIdx}
          totalItems={totalItems}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>

      <DataTableModals
        isOpen={isModalOpen}
        mode={modalMode}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        selectedRow={selectedRow}
        modalFields={modalFields}
        addBtnLabel={addBtnLabel}
      />
    </div>
  );
};

export default DataTable;
