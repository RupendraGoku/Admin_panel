// components/DataTable/DataTableHeader.jsx
import React from "react";

const DataTableHeader = ({ title, addBtnLabel, addBtnIcon, onAddClick }) => {
  return (
    <div className="datatable-header">
      <h2>{title}</h2>
      <button className="add-user-btn" onClick={onAddClick}>
        <i className={`fas ${addBtnIcon}`}></i> {addBtnLabel}
      </button>
    </div>
  );
};

export default DataTableHeader;
