import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";

import DeleteIcon from "../../../assets/icons/DeleteIcon";
import SearchIcon from "../../../assets/icons/SearchIcon";
import { useEffect } from "react";
import { Circle } from "@mui/icons-material";

const SearchAndShowBar = ({
  checkAllHandler,
  TableOrNot,
  setTableOrNot,
  setDeleteModal,
  ShowEditAndDelete,
  notAdmin,
  isAllSelected,
  showNoTable,
  searchQuery,
  setSearchQuery,
  sortOrder,
  setSortOrder,
}) => {
  useEffect(() => {
    console.log(isAllSelected);
  });
  return (
    <div
      className="d-flex justify-content-between flex-wrap gap-3 SearchAndShowbar all-search-bar"
      style={{
        border: "1px solid #EDEFF2",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      {/* Conditional rendering for check-all button */}
      {!notAdmin && (
        <div
          className={`checkAll ${isAllSelected ? "active" : ""}`}
          onClick={checkAllHandler}
        >
          {isAllSelected ? <CheckCircleIcon /> : <Circle />}
          <span>تحديد الكل</span>
        </div>
      )}

      {/* Mid section with search, filter, and delete options */}
      <div className="midDIv d-flex flex-wrap align-items-center ">
  {/* Search Section */}
  <div className="SearchDiv d-flex align-items-center">
    <SearchIcon style={{ color: "#555" }} />
    <input
      type="text"
      placeholder="بحث عن دورة..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="form-control search-input border-0"
      style={{ maxWidth: "200px", minWidth: "120px" }}
    />
  </div>

  {/* Filter Section */}
  <div className="filter d-flex align-items-center ">
    <FilterListIcon style={{ color: "#555" }} />
    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      className="form-select sort-dropdown border-0"
      style={{
        maxWidth: "200px",
        minWidth: "120px",
        backgroundColor: "#fff",
        color: "#555",
      }}
    >
      <option value="asc">الترتيب تصاعدي</option>
      <option value="desc">الترتيب تنازلي</option>
    </select>
  </div>

  {/* Edit and Delete Section */}
  {ShowEditAndDelete && (
    <div
      className="filter d-flex align-items-center gap-2 p-1 px-3 text-danger cursor-pointer"
      onClick={() => setDeleteModal(true)}
    >
      <DeleteIcon />
      <span>ازالة</span>
    </div>
  )}
</div>

      {/* View toggle buttons */}
      {!showNoTable && (
        <div className="EndDiv">
          <div
            className={!TableOrNot ? "Active" : ""}
            onClick={() => setTableOrNot(false)}
          >
            <ViewModuleIcon />
          </div>
          <div
            className={TableOrNot ? "Active" : ""}
            onClick={() => setTableOrNot(true)}
          >
            <ViewHeadlineIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndShowBar;
