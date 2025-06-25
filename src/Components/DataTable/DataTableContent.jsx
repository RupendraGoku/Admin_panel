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
  handleSort,
  type = "user", // 'user' | 'brand' | 'category'
}) => {
  const validData = data.filter((item) => {
    if (!item || typeof item !== "object") return false;
    const nameKey = Object.keys(item).find((key) =>
      key.toLowerCase().includes("name")
    );
    return nameKey && item[nameKey] && item[nameKey] !== "-";
  });

  const getImagePath = (key, value) => {
    if (!value || value === "-") return null;

    if (type === "brand" && key === "brand_logo") {
      return `https://myworkstatus.in/ecom/assets/uploads/brand/${value}`;
    }

    if (type === "category" && key === "image") {
      return `https://myworkstatus.in/ecom/assets/uploads/category/${value}`;
    }

    return value;
  };

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

                  if (key === "sno") return <td key={idx}>{i + 1}</td>;

                  if (key === "action") {
                    return (
                      <td key={idx} className="action-col">
                        <button
                          className="action-btn"
                          onClick={() =>
                            handleDropdownToggle(item.sno || item.id)
                          }
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
                  }

                  if (key === "status") {
                    const status = item[key];
                    return (
                      <td key={idx}>
                        <span
                          className={`status-badge ${
                            status === "Active"
                              ? "status-active"
                              : "status-deactive"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                    );
                  }

                  if (key === "image" || key === "brand_logo") {
                    const imageSrc = getImagePath(key, item[key]);
                    return (
                      <td key={idx}>
                        {imageSrc ? (
                          <img
                            src={imageSrc}
                            alt={
                              type === "brand"
                                ? "Brand Logo"
                                : type === "category"
                                ? "Category Image"
                                : "Image"
                            }
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                              borderRadius: "6px",
                            }}
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        ) : (
                          <span>No image</span>
                        )}
                      </td>
                    );
                  }

                  return <td key={idx}>{item[key] ?? "-"}</td>;
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
