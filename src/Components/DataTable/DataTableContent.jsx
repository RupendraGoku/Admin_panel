// components/DataTable/DataTableContent.jsx
import React from "react";
import DropdownActions from "./DropdownActions";

const DataTableContent = ({
  headers,
  data,
  headerKeyMap,
  handleEditClick,
  handleDeleteClick,
  dropdownIndex,
  handleDropdownToggle,
}) => {
  return (
    <div className="datatable-table-container">
      <table className="datatable-table">
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
            data.map((item) => (
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
                          <DropdownActions
                            onEdit={() => handleEditClick(item)}
                            onDelete={() => handleDeleteClick(item)}
                          />
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
  );
};

export default DataTableContent;
