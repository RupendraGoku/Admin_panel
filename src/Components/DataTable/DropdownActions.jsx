// components/DataTable/DropdownActions.jsx
import React from "react";

const DropdownActions = ({ onEdit, onDelete }) => {
  return (
    <div className="action-menu">
      <button onClick={onEdit}>
        <i className="fas fa-edit"></i> Edit
      </button>
      <button onClick={onDelete}>
        <i className="fas fa-trash-alt"></i> Delete
      </button>
    </div>
  );
};

export default DropdownActions;
