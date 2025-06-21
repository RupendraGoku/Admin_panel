import React from "react";
import AddModal from "../../Modals/AddModal";
import EditModal from "../../Modals/EditModal";
import DeleteModal from "../../Modals/DeleteModal";

const DataTableModals = ({
  isOpen,
  mode,
  onClose,
  onSubmit,
  selectedRow,
  modalFields,
  addBtnLabel,
}) => {
  if (!isOpen) return null;

if (mode === "add") {
  return (
    <AddModal
      isOpen={true}
      onClose={onClose}
      title={addBtnLabel}
      fields={modalFields}
      onSubmit={onSubmit}
      existingUsers={selectedRow?.allUsers || []}
    />
  );
}


 if (mode === "edit") {
  return (
    <EditModal
      isOpen={true}
      onClose={onClose}
      title="Update User"
      fields={modalFields}
      initialData={selectedRow}
      onSubmit={onSubmit}
      existingUsers={selectedRow?.allUsers || []} // ✅ IMPORTANT FIX
    />
  );
}


  if (mode === "delete") {
    return (
      <DeleteModal  isOpen={true}
        onClose={onClose}
        title="Confirm Delete"
        data={selectedRow}
        onDelete={onSubmit}
      />
    );
  }

  return null;
};

export default DataTableModals;
