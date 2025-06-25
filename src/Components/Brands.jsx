import React, { useEffect, useState, useContext } from "react";
import DataTable from "./DataTable/DataTable";
import "../CSS/DataTable.css";
import "../CSS/Brands.css";
import { ApiServiceContext } from "../context/Context";

// Header mapping for table
const headerKeyMap = {
  Sno: "sno",
  Name: "brand_name",
  Image: "brand_logo",
  Status: "status",
  Action: "action",
};

// Fields used in the modal form
const brandFields = [
  {
    name: "brand_name",
    label: "Name",
    type: "text",
    placeholder: "Brand Name",
    required: true,
    defaultValue: "",
    validation: {
      required: "Brand name is required",
    },
  },
  {
    name: "brand_logo",
    label: "Logo/Image",
    type: "file",
    accept: ".jpg,.jpeg,.png",
    required: true,
    defaultValue: "",
    validation: {
      required: "Logo is required",
    },
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

// Normalize brand data for display
const normalizeBrand = (brand, index) => ({
  sno: index + 1,
  brand_id: brand.brand_id,
  brand_name: brand.brand_name || "-",
  brand_logo: brand.brand_logo || "-",
  status: getStatusLabel(String(brand.brand_status)),
  brand_status_value: String(brand.brand_status),
});

const Brands = () => {
  const [brandData, setBrandData] = useState([]);
  const [reload, setReload] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { typeSetting } = useContext(ApiServiceContext);

  useEffect(() => {
    typeSetting("brand");
  }, [typeSetting]);

  const fetchBrands = async () => {
    try {
      const res = await fetch("https://myworkstatus.in/ecom/api/product_brand_record.php");
      const data = await res.json();
      if (Array.isArray(data)) {
        const normalized = data.map(normalizeBrand);
        setBrandData(normalized);
      } else {
        setBrandData([]);
      }
    } catch (error) {
      console.error("Failed to fetch brand data:", error);
      setBrandData([]);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [reload]);

  const handleEditClick = (item) => {
    setSelectedRow(item);
    setModalMode("edit");
    setDropdownIndex(null);
    setIsModalOpen(true);
  };

  return (
    <DataTable
      title="Brand Record"
      addBtnLabel="Add Brand"
      addBtnIcon="fa-tag"
      headers={["Sno", "Name", "Image", "Status", "Action"]}
      data={brandData}
      cssClassPrefix="datatable"
      modalFields={brandFields}
      headerKeyMap={headerKeyMap}
      reload={reload}
      setReload={setReload}
      onEditClick={handleEditClick}
      type="brand"
    />
  );
};

export default Brands;
