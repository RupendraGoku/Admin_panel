import "../CSS/Category.css";

const Category = () => {
  return (
    <div className="category-container">
      <div className="category-card">
        {/* Header */}
        <div className="category-header">
          <h2>Category Record</h2>
          <button className="add-category-btn">
            <i className="fas fa-th"></i> Add Category
          </button>
        </div>

        {/* Buttons Row */}
        <div className="button-row">
          <div className="export-buttons">
            <button>Copy</button>
            <button>CSV</button>
            <button>Excel</button>
            <button>Print</button>
            <button>PDF</button>
          </div>
          <div className="search-box">
            <label htmlFor="search">Search:</label>
            <input type="text" id="search" placeholder="Search..." />
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="category-table">
            <thead>
              <tr>
                {["Sno", "Name", "Parent", "Image", "Status", "Action"].map((header) => (
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
              <tr>
                <td>1</td>
                <td>Acv</td>
                <td>Rf</td>
                <td>
                  <img
                    src="/images/qrcode.png"
                    alt="Category"
                    className="category-image"
                  />
                </td>
                <td>
                  <span className="status-badge status-active">Active</span>
                </td>
                <td>
                  <button className="action-btn">...</button>
                </td>
              </tr>
              {/* You can map over more rows here */}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="category-footer">
          <div>Showing 1 to 1 of 1 entries</div>
          <div className="pagination-buttons">
            <button>Previous</button>
            <button className="active">1</button>
            <button>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
