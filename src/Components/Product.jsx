import DataTable from "./DataTable";
import "../CSS/DataTable.css";
import "../CSS/Product.css";

const productData = [
  {
    sno: 1,
    name: "Headphone",
    category: "Electronics",
    brand: "Sony",
    price: "$99",
    status: "Active",
    image: "/images/product1.png",
  },
];

const productFields = [
  { name: "name", label: "Name", type: "text", placeholder: "Product Name", required: true },
  { name: "slug", label: "Slug", type: "text", placeholder: "Product Slug", required: true },
  { name: "brand", label: "Brand", type: "select", options: ["Apple", "Samsung", "Nike"], required: true },
  { name: "category", label: "Category", type: "select", options: ["Electronics", "Clothing"], required: true },
  { name: "regularPrice", label: "Regular Price (₹)", type: "number", required: true },
  { name: "sellingPrice", label: "Selling Price (₹)", type: "number", required: true },
  { name: "image", label: "Image", type: "file", accept: ".jpg,.jpeg,.png", required: true },
  { name: "gallery", label: "Upload Gallery", type: "file", multiple: true, accept: ".jpg,.jpeg,.png" },
  {
    name: "shortDescription", label: "Short Description", type: "textarea", placeholder: "Short Description", required: true
  },
  {
    name: "longDescription", label: "Long Description", type: "textarea", placeholder: "Long Description"
  },
];


const Product = () => (
  <DataTable
    title="Product Record"
    addBtnLabel="Add Product"
    addBtnIcon="fa-box"
    headers={["Sno", "Name", "Category", "Brand", "Price", "Image", "Status", "Action"]}
    data={productData}
    cssClassPrefix="datatable"
    renderRow={(item, i) => (
      <tr key={i}>
        <td>{item.sno}</td>
        <td>{item.name}</td>
        <td>{item.category}</td>
        <td>{item.brand}</td>
        <td>{item.price}</td>
        <td>
          <img src={item.image} alt={item.name} className="product-image" />
        </td>
        <td>
          <span className={`status-badge ${item.status === "Active" ? "status-active" : "status-deactive"}`}>
            {item.status}
          </span>
        </td>
        <td>
          <button className="action-btn">...</button>
        </td>
      </tr>
    )}
    modalFields={productFields}
  />
);

export default Product;