import React from "react";
import { HiMiniArrowLongDown, HiMiniArrowLongUp } from "react-icons/hi2";
import "../../CSS/sortableheader.css";

const SortableHeader = ({
  label,
  sortKey,
  currentSortKey,
  currentDirection,
  onSort,
}) => {
  const isActive = sortKey === currentSortKey;

  const handleSortAsc = () => {
    onSort(sortKey, "asc");
  };

  const handleSortDesc = () => {
    onSort(sortKey, "desc");
  };

  const isAscActive = isActive && currentDirection === "asc";
  const isDescActive = isActive && currentDirection === "desc";

  return (
    <div className="sortable-header">
      <span className="label">{label}</span>
      <span className="icons">
  <HiMiniArrowLongUp
    onClick={handleSortAsc}
    className={`arrow-icon up ${isAscActive ? "active" : ""}`}
  />
  <HiMiniArrowLongDown
    onClick={handleSortDesc}
    className={`arrow-icon down ${isDescActive ? "active" : ""}`}
  />
</span>


    </div>
  );
};

export default SortableHeader;
