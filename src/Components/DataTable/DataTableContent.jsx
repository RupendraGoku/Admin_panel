
import DropdownActions from "./DropdownActions";
import SortableHeader from "./SortableHeader";

const DataTableContent = ({
  headers,
  data,
  headerKeyMap,
  handleEditClick,
  handleDeleteClick,
  dropdownIndex,
  handleDropdownToggle,
  sortKey,
  sortDirection,
  handleSort
}) => {
  // Filter out empty/invalid data items
  const validData = data.filter(item => {
    // Check if item exists and has at least one valid property
    if (!item || typeof item !== 'object') return false;
    
    // Get all non-action keys
    const dataKeys = headers
      .map(header => headerKeyMap[header])
      .filter(key => key && key !== "action");
    
    // Check if item has meaningful data in key fields
    // For your case, let's require at least a valid name
    const nameKey = dataKeys.find(key => key.toLowerCase().includes('name'));
    if (nameKey) {
      const nameValue = item[nameKey];
      // If name is empty, null, undefined, or just whitespace, filter it out
      if (!nameValue || String(nameValue).trim() === "" || String(nameValue).trim() === "-") {
        return false;
      }
    }
    
    // Additional check: item should have at least 2 meaningful values
    const meaningfulValues = dataKeys.filter(key => {
      const value = item[key];
      return value !== null && 
             value !== undefined && 
             String(value).trim() !== "" && 
             String(value).trim() !== "-";
    });
    
    return meaningfulValues.length >= 1; // At least 1 meaningful value (excluding action)
  });

  return (
    <div className="datatable-table-container">
      <table className="datatable-table">
        <thead>
          <tr>
            {headers.map((h, i) => {
              const key = headerKeyMap[h];
              return (
                <th key={i}>
                  {key !== "action" ? (
                    <SortableHeader
                      label={h}
                      sortKey={key}
                      currentSortKey={sortKey}
                      currentDirection={sortDirection}
                      onSort={handleSort}
                    />
                  ) : (
                    h
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {validData.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="no-data">
                No records found.
              </td>
            </tr>
          ) : (
            validData.map((item, i) => (
              <tr key={item.sno || item.id || i}>
                {headers.map((header, idx) => {
                  const key = headerKeyMap[header];
                  
                  // Handle serial number display
                  if (key === "sno" || key === "serial" || header.toLowerCase() === "sno") {
                    return <td key={idx}>{i + 1}</td>;
                  }
                  
                  if (key === "action") {
                    return (
                      <td key={idx} className="action-col">
                        <button
                          className="action-btn"
                          onClick={() => handleDropdownToggle(item.sno || item.id)}
                        >
                          ...
                        </button>
                        {dropdownIndex === (item.sno || item.id) && (
                          <DropdownActions
                            onEdit={() => handleEditClick(item)}
                            onDelete={() => handleDeleteClick(item)}
                          />
                        )}
                      </td>
                    );
                  } else if (key === "status") {
                    const status = item[key];
                    return (
                      <td key={idx}>
                        <span
                          className={`status-badge ${
                            status === "Active" ? "status-active" : "status-deactive"
                          }`}
                        >
                          {status === "Active" ? "Active" : "Inactive"}
                        </span>
                      </td>
                    );
                  } else if (key === "image") {
                    const imageSrc = item[key];
                    return (
                      <td key={idx}>
                        {imageSrc ? (
                          <img
                            src={`https://myworkstatus.in/ecom/assets/uploads/brand/${imageSrc}`}
                            alt={item.name || "Image"}
                            style={{ width: "60px", height: "60px", objectFit: "cover" }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <span>No image</span>
                        )}
                      </td>
                    );
                  } else {
                    // Handle missing keys or undefined values
                    const value = item[key];
                    return (
                      <td key={idx}>
                        {value !== null && value !== undefined ? String(value) : "-"}
                      </td>
                    );
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