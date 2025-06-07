import "../CSS/Brands.css";

const Brands = () => {
  const headers = ["Sno", "Name", "Image", "Status", "Action"];

  const data = [
    {
      sno: 1,
      name: "Zara",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/1024px-Zara_Logo.svg.png",
      status: "Active",
    },
    {
      sno: 2,
      name: "Itc Masala",
      image: "", // Placeholder or invalid
      status: "Deactivate",
    },
    {
      sno: 3,
      name: "Dremo",
      image: "https://flagcdn.com/w320/tj.png",
      status: "Active",
    },
  ];

  return (
    <div className="users-wrapper">
      <div className="users-header">
        <h2>Brand Record</h2>
        <button className="add-user-btn">
          <i className="fas fa-tag"></i>&nbsp; Add Brand
        </button>
      </div>

      <div className="users-tools">
        <div className="button-row">
          <div className="export-buttons">
            <button>Copy</button>
            <button>CSV</button>
            <button>Excel</button>
            <button>Print</button>
            <button>PDF</button>
          </div>
          <div className="search-box">
            <label className="srch">Search:</label>
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead className="thead">
            <tr>
              {headers.map((header) => (
                <th key={header}>
                  {header}
                  <span className="sort-arrows">
                    <button className="arrow up">↑</button>
                    <button className="arrow down">↓</button>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.sno}</td>
                <td>{item.name}</td>
                <td>
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="brand-image" />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>
                  <span
                    className={`status-badge ${
                      item.status === "Active" ? "active" : "deactive"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <button className="action-button">...</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="users-footer">
        <span>Showing 1 to 3 of 3 entries</span>
        <div className="pagination-buttons">
          <button>Previous</button>
          <button className="active-page">1</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Brands;
