import "../CSS//Users.css";

const Users = () => {
  return (
    <div className="users-wrapper">
      <div className="users-header-section">
        <h2>Users Record</h2>
        <button className="add-user-btn">
          <i className="fas fa-user-plus"></i> Add User
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
              {["Sno", "Name", "Email", "Phone", "Username", "Role", "Status", "Action"].map((header) => (
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
              <td colSpan="8" className="no-data">No data available in table</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="users-footer">
        <span>Showing 0 to 0 of 0 entries</span>
        <div className="pagination-buttons">
          <button>Previous</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Users;
