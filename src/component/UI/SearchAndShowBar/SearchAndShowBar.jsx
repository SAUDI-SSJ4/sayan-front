import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FilterListIcon from "@mui/icons-material/FilterList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";

import DeleteIcon from "../../../assets/icons/DeleteIcon";
import SearchIcon from "../../../assets/icons/SearchIcon";

const SearchAndShowBar = ({
  checkAllHandler,
  TableOrNot,
  setTableOrNot,
  setDeleteModal,
  ShowEditAndDelete,
  notAdmin,
  showNoTable,
}) => {
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
        <div className="checkAll" onClick={checkAllHandler}>
          <CheckCircleIcon />
          <span>تحديد الكل</span>
        </div>
      )}

      {/* Mid section with search, filter, and delete options */}
      <div className="midDIv">
        {ShowEditAndDelete && (
          <>
            <div className="SearchDiv">
              <SearchIcon />
              <span>بحث</span>
            </div>
            <div
              className="filter"
              onClick={() => setDeleteModal(true)}
            >
              <DeleteIcon />
              <span>ازالة</span>
            </div>
          </>
        )}
        <div className="SearchDiv">
          <SearchIcon />
          <span>بحث</span>
        </div>
        <div className="filter">
          <FilterListIcon />
          <span>تصفية</span>
        </div>
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
