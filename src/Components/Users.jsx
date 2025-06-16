import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import "../CSS/DataTable.css";

const userFields = [
  { label: "Name", name: "user_name", type: "text", required: true },
  { label: "Email", name: "user_email", type: "email", required: true },
  {
    label: "Role",
    name: "user_role",
    type: "radio",
    options: ["Admin", "User"], // 1 = Admin, 2 = User
    required: true,
    fullWidth: true,
  },
  { label: "Phone", name: "user_phone", type: "text" },
  { label: "Username", name: "user_username", type: "text", required: true },
];

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [reload, setReload] = useState(false);

  const normalizeUser = (user, index) => ({
    sno: index + 1,
    user_id: user.user_id,
    user_name: user.user_name || "-",
    user_email: user.user_email || "-",
    user_phone: user.user_phone || "-",
    user_username: user.user_username || "-",
    user_role: user.user_role === "1" ? "Admin" : "User",
    user_status: user.user_status === "1" ? "Active" : "Inactive",
  });

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://myworkstatus.in/ecom/api/user_record.php");
      const data = await res.json();
       console.log("Raw API response:", data);
      
      if (Array.isArray(data)) {
        setUserData(data.map(normalizeUser));
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
    />
  );
};

export default Users;
