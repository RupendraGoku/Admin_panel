import React, { useEffect, useState, useContext } from "react";
import DataTable from "../Components/DataTable/DataTable";
import "../CSS/DataTable.css";
import { ApiServiceContext } from "../context/Context";

const customerFields = [
  { label: "Name", name: "customer_name", type: "text", required: true },
  { label: "Email", name: "customer_email", type: "email", required: true },
  { label: "Phone", name: "customer_phone", type: "text", required: true },
  { label: "Password", name: "customer_pwd", type: "password", required: true },
  { label: "Company", name: "customer_company", type: "text", required: false },
  { label: "Address", name: "customer_address", type: "text", required: false },
  { label: "State", name: "customer_state", type: "text", required: false },
  { label: "City", name: "customer_city", type: "text", required: false },
  { label: "Pin", name: "customer_pin", type: "text", required: false },
];

const Customer = () => {
  const [customerData, setCustomerData] = useState([]);
  const [reload, setReload] = useState(false);
  const { typeSetting } = useContext(ApiServiceContext);

  useEffect(() => {
    typeSetting("customer");
  }, [typeSetting]);

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

  const normalizeCustomer = (customer, index) => ({
    sno: index + 1,
    customer_id: customer.customer_id,
    customer_name: customer.customer_name || "-",
    customer_email: customer.customer_email || "-",
    customer_phone: customer.customer_phone || "-",
    status: getStatusLabel(String(customer.customer_status)),
    customer_status_value: String(customer.customer_status),
  });

  const headerKeyMap = {
    Sno: "sno",
    Name: "customer_name",
    Phone: "customer_phone",
    Email: "customer_email",
    Status: "status",
    Action: "action",
  };

  const fetchCustomers = async () => {
    try {
      const res = await fetch("https://myworkstatus.in/ecom/api/customer_record.php");
      const data = await res.json();
      if (Array.isArray(data)) {
        const normalized = data.map(normalizeCustomer).filter(Boolean);
        setCustomerData(normalized);
      } else {
        setCustomerData([]);
      }
    } catch (error) {
      console.error("Failed to fetch customer data:", error);
      setCustomerData([]);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [reload]);

  const handleEditClick = (item) => {
    setSelectedRow(item);
    setModalMode("edit");
    setDropdownIndex(null);
    setIsModalOpen(true);
  };

  return (
    <DataTable
      title="Customers Record"
      addBtnLabel="Add Customer"
      addBtnIcon="fa-user-plus"
      headers={["Sno", "Name", "Phone", "Email", "Status", "Action"]}
      data={customerData}
      cssClassPrefix="datatable"
      modalFields={customerFields}
      reload={reload}
      setReload={setReload}
      onEditClick={handleEditClick}
      headerKeyMap={headerKeyMap}
    />
  );
};

export default Customer;
