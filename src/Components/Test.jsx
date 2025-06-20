import React, { useState, useEffect } from 'react';

const Test = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalFields = [
    { name: "user_name", label: "Name", type: "text" },
    { name: "user_email", label: "Email", type: "email" },
    { name: "user_phone", label: "Phone", type: "text" },
    { name: "user_username", label: "Username", type: "text" },
    { name: "user_role", label: "Role", type: "text" },
    { name: "user_status", label: "Status", type: "text" }
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
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

const handleModalSubmit = async (formData) => {
  try {
    const encodedData = new URLSearchParams();
    for (const key in formData) {
      encodedData.append(key, formData[key]);
    }

    const response = await fetch("https://myworkstatus.in/ecom/api/user_insert.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: encodedData.toString()
    });

    const result = await response.json();
    console.log("Insert response:", result);

    // Treat both 'success' and 'partial' as a success for user insert
    if (result.status === "success" || result.status === "partial") {
      fetchapi(); // Refresh the table
      setIsModalOpen(false); // Close modal
    } else {
      alert("Failed to add user: " + (result.message || "Unknown error"));
    }
  } catch (error) {
    console.error("Insert error:", error);
    alert("Error occurred while adding user.");
  }
};


  return (
    <div style={{ padding: '20px' }}>
      <h2>User Management</h2>
      <button onClick={handleAddClick}>Add User</button>

      <table style={{ width: '100%', marginTop: '20px' }} border="1">
        <thead>
          <tr>
            <th>Sno</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Username</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
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
              <td>{item.user_role || '-'}</td>
              <td>{item.user_status || '-'}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal starts here */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '400px',
            position: 'relative'
          }}>
            <h3>Add User</h3>
          <form onSubmit={(e) => {
  e.preventDefault();
  const formData = {};
  modalFields.forEach(field => {
    formData[field.name] = e.target[field.name].value.trim(); // capture the value
  });
  handleModalSubmit(formData);
}}>
  {modalFields.map((field, index) => (
    <div key={index} style={{ marginBottom: '10px' }}>
      <label>{field.label}</label><br />
      <input
        type={field.type}
        name={field.name}
        required
        style={{ width: '100%', padding: '8px' }}
      />
    </div>
  ))}
  <div style={{ marginTop: '15px', textAlign: 'right' }}>
    <button type="button" onClick={handleModalClose} style={{ marginRight: '10px' }}>
      Cancel
    </button>
    <button type="submit">Submit</button>
  </div>
</form>

          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
