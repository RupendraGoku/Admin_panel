import DataTable from "./DataTable/DataTable";
import "../CSS/DataTable.css";
import "../CSS/Brands.css";

const brandData = [
  {
    sno: 1,
    name: "Dremo",
    image: "/images/brand1.png",
    status: "Active",
  },
];

const brandFields = [
  { name: "name", label: "Name", type: "text", placeholder: "Brand Name", required: true },
  { name: "logo", label: "Logo/Image", type: "file", accept: ".jpg,.jpeg,.png", required: true },
];


const Brands = () => (
  <DataTable
    title="Brand Record"
    addBtnLabel="Add Brand"
    addBtnIcon="fa-tag"
    headers={["Sno", "Name", "Image", "Status", "Action"]}
    data={brandData}
    cssClassPrefix="datatable"
    renderRow={(item, i) => (
      <tr key={i}>
        <td>{item.sno}</td>
        <td>{item.name}</td>
        <td>
          <img src={item.image} alt={item.name} className="brand-image" />
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
    modalFields={brandFields}
  />
);

export default Brands;
