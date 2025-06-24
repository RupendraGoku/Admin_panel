import DataTable from "./DataTable/DataTable";
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

const headerKeyMap = {
  Sno: "sno",
  Name: "brand_name",
  Image: "brand_logo",
  Status: "status",
  Action: "action",
};


const Category = () => (
  <DataTable
    title="Category Record"
    addBtnLabel="Add Category"
    addBtnIcon="fa-th"
    headers={["Sno", "Name", "Parent", "Image", "Status", "Action"]}
    data={categoryData}
    cssClassPrefix="datatable"
    headerKeyMap={headerKeyMap}
    modalFields={categoryFields}
  />
);

export default Category;
