import React from "react";
import "../CSS/Product.css";

const Product = () => {
  return (
    <div className="product-wrapper">
      <div className="product-container">
        <div className="product-header">
          <h2>Product Record</h2>
          <button className="add-product-btn">
            <i className="fas fa-cart-plus"></i> Add Product
          </button>
        </div>

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

        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                {[
                  "Sno",
                  "Name",
                  "Category",
                  "Brand",
                  "Selling Price (₹)",
                  "Status",
                  "Action",
                ].map((header) => (
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
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <img
                      src={`/images/product${i + 1}.png`}
                      alt="Product"
                      className="product-image"
                    />
                    <span className="product-name">
                      {
                        [
                          "Esssf",
                          "Ssa",
                          "Wireless Bluetooth Headphones",
                          "Demo",
                          "Demo Product",
                        ][i]
                      }
                    </span>
                  </td>
                  <td>Acv</td>
                  <td>Dremo</td>
                  <td>{[80, 80, 80, 40, 80][i].toFixed(2)}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        i === 0 ? "status-deactive" : "status-active"
                      }`}
                    >
                      {i === 0 ? "Deactivate" : "Active"}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn">...</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="product-footer">
          <div>Showing 1 to 5 of 5 entries</div>
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

export default Product;
