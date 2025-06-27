import React, { useEffect, useState, useContext } from "react";
import DataTable from "../Components/DataTable/DataTable";
import "../CSS/DataTable.css";
import "../CSS/Category.css";
import { ApiServiceContext } from "../context/Context";

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

  const [parentOptions, setParentOptions] = useState([]);
  const { typeSetting } = useContext(ApiServiceContext);

  useEffect(() => {
    typeSetting("category");
  }, [typeSetting]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("https://myworkstatus.in/ecom/api/product_category_record.php");
      const data = await res.json();

      if (Array.isArray(data)) {
        // Create map of ID → name
        const idToNameMap = {};
        const options = [{ label: "None", value: "" }];

        data.forEach((cat) => {
          idToNameMap[cat.pcat_id] = cat.pcat_name;
          options.push({ label: cat.pcat_name, value: cat.pcat_id });
        });

        const normalized = data.map((category, index) => ({
          sno: index + 1,
          pcat_id: category.pcat_id,
          name: category.pcat_name || "-",
          parent: idToNameMap[category.pcat_parentcat] || "None",
          image: category.pcat_image || "Not Uploaded",
          status: getStatusLabel(category.pcat_status),
          status_value: category.pcat_status,
        }));

        setCategoryData(normalized);
        setParentOptions(options); // ✅ dynamic dropdown options
      } else {
        setCategoryData([]);
        setParentOptions([{ label: "None", value: "" }]);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
      setCategoryData([]);
      setParentOptions([{ label: "None", value: "" }]);
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

  const categoryFields = [
    {
      name: "pcat_name",
      label: "Name",
      type: "text",
      placeholder: "Category Name",
      required: true,
       fullWidth: true, // ✅ Must be present
    },
    {
      name: "pcat_parentcat",
      label: "Parent Category",
      type: "select",
      options: parentOptions,
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
