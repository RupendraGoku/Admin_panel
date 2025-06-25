import React, { useEffect, useState, useContext } from "react";
import DataTable from "../Components/DataTable/DataTable";
import "../CSS/DataTable.css";
import "../CSS/Category.css";
import { ApiServiceContext } from "../context/Context";

const categoryFields = [
  {
    name: "pcat_name",
    label: "Name",
    type: "text",
    placeholder: "Category Name",
    required: true,
  },
  {
    name: "pcat_parentcat",
    label: "Parent Category",
    type: "select",
    options: [
      { label: "None", value: "" },
      { label: "Electronics", value: "Electronics" },
      { label: "Fashion", value: "Fashion" },
      { label: "Grocery", value: "Grocery" },
    ],
    required: false,
  },
  {
    name: "pcat_image",
    label: "Logo/Image",
    type: "file",
    accept: ".jpg,.jpeg,.png",
    required: false,
  },
];

const getStatusLabel = (status) => {
  switch (status) {
    case "1":
      return "Active";
    case "0":
      return "Deactive";
    default:
      return "-";
  }
};

const normalizeCategory = (category, index) => ({
  sno: index + 1,
  pcat_id: category.pcat_id,
  name: category.pcat_name || "-",
  parent: category.pcat_parentcat || "-",
  image: category.pcat_image || "-", // Ensures empty string is handled as "-"
  status: getStatusLabel(category.pcat_status),
  status_value: category.pcat_status,
});

const headerKeyMap = {
  Sno: "sno",
  Name: "name",
  Parent: "parent",
  Image: "image",
  Status: "status",
  Action: "action",
};

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [reload, setReload] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { typeSetting } = useContext(ApiServiceContext);

  useEffect(() => {
    typeSetting("category");
  }, [typeSetting]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("https://myworkstatus.in/ecom/api/product_category_record.php");
      const data = await res.json();

      if (Array.isArray(data)) {
        const normalized = data.map(normalizeCategory).filter(Boolean);
        setCategoryData(normalized);
      } else {
        setCategoryData([]);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
      setCategoryData([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [reload]);

  const handleEditClick = (item) => {
    setSelectedRow(item);
    setModalMode("edit");
    setDropdownIndex(null);
    setIsModalOpen(true);
  };

  return (
    <DataTable
      title="Category Record"
      addBtnLabel="Add Category"
      addBtnIcon="fa-th"
      headers={["Sno", "Name", "Parent", "Image", "Status", "Action"]}
      data={categoryData}
      cssClassPrefix="datatable"
      modalFields={categoryFields}
      reload={reload}
      setReload={setReload}
      onEditClick={handleEditClick}
      headerKeyMap={headerKeyMap}
      type="category"
    />
  );
};

export default Category;
