import React, { useState, useEffect } from 'react';
import AddModal from '../Modals/AddModal';

const Test = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");

  const header = [
    "Sno",
    "Name",
    "Email",
    "Phone",
    "Username",
    "Role",
    "Status",
    "Action"
  ];

  const fetchapi = async () => {
    try {
      const response = await fetch("https://myworkstatus.in/ecom/api/user_record.php");
      const result = await response.json();
      setData(result); 
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchapi();
  }, []);

  const handleAddClick = () => {
    setSelectedRow(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const handleModalSubmit = (formData) => {
    console.log("Submitted data:", formData);
    handleModalClose();
    fetchapi(); 
  };

  const modalFields = [
    { name: "user_name", label: "Name", type: "text" },
    { name: "user_email", label: "Email", type: "email" },
    { name: "user_phone", label: "Phone", type: "text" },
    { name: "user_username", label: "Username", type: "text" },
    { name: "user_role", label: "Role", type: "text" },
    { name: "user_status", label: "Status", type: "text" }
  ];

  return (
    <div>
      <button className="add-user-btn" onClick={handleAddClick}>
        Add Users
      </button>

      <table style={{ width: '100%', marginTop: '10%' }} border="1">
        <thead>
          <tr>
            {header.map((head, index) => (
              <th key={index}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.user_id || index}>
              <td>{index + 1}</td>
              <td>{item.user_name || '-'}</td>
              <td>{item.user_email || '-'}</td>
              <td>{item.user_phone || '-'}</td>
              <td>{item.user_username || '-'}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && modalMode === "add" && (
        <AddModal
          isOpen={true}
          onClose={handleModalClose}
          fields={modalFields}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default Test;
