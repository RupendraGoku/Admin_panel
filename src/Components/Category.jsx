import DataTable from "./DataTable";
import "../CSS/DataTable.css";
import "../CSS/Category.css";

const categoryData = [
  {
    sno: 1,
    name: "Acv",
    parent: "Rf",
    image: "/images/qrcode.png",
    status: "Active",
  },
];

const categoryFields = [
  { name: "name", label: "Name", type: "text", placeholder: "Category Name", required: true },
  { name: "parentCategory", label: "Parent Category", type: "select", options: ["None", "Electronics", "Fashion", "Grocery"] }, // Example options
  { name: "logo", label: "Logo/Image", type: "file", accept: ".jpg,.jpeg,.png" },
];


const Category = () => (
  <DataTable
    title="Category Record"
    addBtnLabel="Add Category"
    addBtnIcon="fa-th"
    headers={["Sno", "Name", "Parent", "Image", "Status", "Action"]}
    data={categoryData}
    cssClassPrefix="datatable"
    renderRow={(item, i) => (
      <tr key={i}>
        <td>{item.sno}</td>
        <td>{item.name}</td>
        <td>{item.parent}</td>
        <td>
          <img src={item.image} alt={item.name} className="category-image" />
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
    modalFields={categoryFields}
  />
);

export default Category;
