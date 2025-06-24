import React, { useEffect, useState,useContext } from "react";
import DataTable from "../Components/DataTable/DataTable";
import "../CSS/DataTable.css";
import { ApiServiceContext } from "../context/Context";

const userFields = [
  { label: "Name", name: "user_name", type: "text", required: true },
  { label: "Email", name: "user_email", type: "email", required: true },
  {
    label: "Role",
    name: "user_role",
    type: "radio",
    required: true,
    fullWidth: true,
    options: [
      { value: "1", label: "Admin" },
      { value: "2", label: "User" },
    ],
  },
  { label: "Phone", name: "user_phone", type: "text", required: true },
  { label: "Username", name: "user_username", type: "text", required: true },
];


const Users = () => {
  const [userData, setUserData] = useState([]);
  const [reload, setReload] = useState(false);
   const { typeSetting } = useContext(ApiServiceContext)
    useEffect(() => {
    typeSetting('user');
  }, [typeSetting]); 

  const getRoleLabel = (role) => {
    switch (role) {
      case "1":
        return "Admin";
      case "2":
        return "User";
      default:
        return "-";
    }
  };

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

  const normalizeUser = (user, index) => ({
    sno: index + 1,
    user_id: user.user_id,
    user_name: user.user_name || "-",
    user_email: user.user_email || "-",
    user_phone: user.user_phone || "-",
    user_username: user.user_username || "-",
    user_role: getRoleLabel(String(user.user_role)),
    user_role_value: String(user.user_role),
    status: getStatusLabel(String(user.user_status)),
    user_status_value: String(user.user_status), // ✅ Add this
  });

  const headerKeyMap = {
    Sno: "sno",
    Name: "user_name",
    Email: "user_email",
    Phone: "user_phone",
    Username: "user_username",
    Role: "user_role",
    Status: "status",
    Action: "action",
  };
  const fetchUsers = async () => {
    try {
      const res = await fetch("https://myworkstatus.in/ecom/api/user_record.php");
      const data = await res.json();
      console.log("Raw API response:", data);

      if (Array.isArray(data)) {
        const normalized = data.map(normalizeUser).filter(Boolean);
        setUserData(normalized);
      } else {
        setUserData([]);
      }
    } catch (error) {
      console.error("API fetch failed:", error);
      setUserData([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [reload]);

  const handleEditClick = (item) => {
    setSelectedRow({
      ...item,
      user_role: item.user_role_edit || "1",
    });
    setModalMode("edit");
    setDropdownIndex(null);
    setIsModalOpen(true);
  };

  return (
    <DataTable
      title="Users Record"
      addBtnLabel="Add User"
      addBtnIcon="fa-user-plus"
      headers={["Sno", "Name", "Email", "Phone", "Username", "Role", "Status", "Action"]}
      data={userData}
      cssClassPrefix="datatable"
      modalFields={userFields}
      reload={reload}
      setReload={setReload}
      onEditClick={handleEditClick}
      headerKeyMap={headerKeyMap}
    />
  );
};

export default Users;
