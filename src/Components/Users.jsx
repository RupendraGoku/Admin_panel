import DataTable from "./DataTable";
import "../CSS/DataTable.css";

const userData = [
  {
    sno: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    username: "johndoe",
    role: "Admin",
    status: "Active",
  },
];

const userFields = [
  { label: "Name", name: "name", type: "text", required: true },        
  { label: "Email", name: "email", type: "email", required: true },     
  { label: "Phone", name: "phone", type: "text" },                      
  { label: "Username", name: "username", type: "text", required: true },
  {                                                                   
    label: "Role",                                                     
    name: "role",                                                      
    type: "radio",                                                     
    options: ["Admin", "User"],                                        
    required: true,                                                    
  },
];


const Users = () => (
  <DataTable
    title="Users Record"
    addBtnLabel="Add User"
    addBtnIcon="fa-user-plus"
    headers={["Sno", "Name", "Email", "Phone", "Username", "Role", "Status", "Action"]}
    data={userData}
    cssClassPrefix="datatable"
    renderRow={(item, i) => (
      <tr key={i}>
        <td>{item.sno}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.username}</td>
        <td>{item.role}</td>
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
    modalFields={userFields}
  />
);

export default Users;
