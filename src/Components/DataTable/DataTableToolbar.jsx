import React from "react";
import ExportButtons from "../DataTable/ExportButtons"; 

const DataTableToolbar = ({
  searchQuery,
  setSearchQuery,
  exportData = [],
  exportColumns = [],
}) => {
  return (
    <div className="users-tools">
      <div className="button-row">
        {/* Export Buttons */}
        <ExportButtons
          data={exportData}
          columns={exportColumns}
          fileName="user_table"
        />

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
  );
};

export default DataTableToolbar;
