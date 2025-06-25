import React from "react";

// User modals
import AddUserModal from "../../Modals/AddModal";
import EditUserModal from "../../Modals/EditModal";
import DeleteUserModal from "../../Modals/DeleteModal";

// Brand modals
import BrandAddModal from "../../Modals/BrandAddModal";
import BrandEditModal from "../../Modals/BrandEditModal";
import BrandDeleteModal from "../../Modals/BrandDeleteModal";

// Category modals
import CategoryAddModal from "../../Modals/CategoryAddModal";
import CategoryEditModal from "../../Modals/CategoryEditModal";
import CategoryDeleteModal from "../../Modals/CategoryDeleteModal";

const DataTableModals = ({
  isOpen,
  mode,
  onClose,
  onSubmit,
  selectedRow,
  modalFields,
  addBtnLabel,
  type = "user", // 'user' | 'brand' | 'category'
}) => {
  if (!isOpen) return null;

  const commonProps = {
    isOpen: true,
    onClose,
    onSubmit,
  };

  const userProps = {
    ...commonProps,
    existingUsers: selectedRow?.allUsers || [],
  };

  // USER MODALS
  if (type === "user") {
    if (mode === "add") {
      return (
        <AddUserModal
          {...userProps}
          title={addBtnLabel}
          fields={modalFields}
        />
      );
    }
    if (mode === "edit") {
      return (
        <EditUserModal
          {...userProps}
          title="Update User"
          fields={modalFields}
          initialData={selectedRow}
        />
      );
    }
    if (mode === "delete") {
      return (
        <DeleteUserModal
          isOpen
          onClose={onClose}
          title="Confirm Delete"
          data={selectedRow}
          onDelete={onSubmit}
        />
      );
    }
  }

  // BRAND MODALS
  if (type === "brand") {
    if (mode === "add") {
      return (
        <BrandAddModal
          {...commonProps}
          title={addBtnLabel}
          fields={modalFields}
        />
      );
    }
    if (mode === "edit") {
      return (
        <BrandEditModal
          {...commonProps}
          title="Update Brand"
          fields={modalFields}
          initialData={selectedRow}
        />
      );
    }
    if (mode === "delete") {
      return (
        <BrandDeleteModal
          isOpen
          onClose={onClose}
          title="Confirm Delete"
          data={selectedRow}
          onDelete={onSubmit}
        />
      );
    }
  }

  // CATEGORY MODALS
  if (type === "category") {
    if (mode === "add") {
      return (
        <CategoryAddModal
          {...commonProps}
          title={addBtnLabel}
          fields={modalFields}
        />
      );
    }
    if (mode === "edit") {
      return (
        <CategoryEditModal
          {...commonProps}
          title="Update Category"
          fields={modalFields}
          initialData={selectedRow}
        />
      );
    }
    if (mode === "delete") {
      return (
        <CategoryDeleteModal
          isOpen
          onClose={onClose}
          title="Confirm Delete"
          data={selectedRow}
          onDelete={onSubmit}
        />
      );
    }
  }

  return null;
};

export default DataTableModals;
