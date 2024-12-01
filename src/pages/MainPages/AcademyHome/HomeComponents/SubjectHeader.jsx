import SearchIcon from "@mui/icons-material/Search";
import Style from "../home.module.scss";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash"; // Import lodash for debouncing

export const SubjectHeader = ({ filterByCourseTitle }) => {
  const [active, setActive] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedFilter = useCallback(
    debounce((query) => {
      filterByCourseTitle(query);
    }, 300),
    [filterByCourseTitle]
  );

  useEffect(() => {
    debouncedFilter(searchQuery);
    return () => {
      debouncedFilter.cancel();
    };
  }, [searchQuery, debouncedFilter]);

  return (
    <div className={`${Style.SubjectHeader} d-flex align-items-center gap-3 flex-wrap`}>
      <div className="d-flex align-items-center flex-wrap gap-3">
        <h1>كل المواد التدريبية</h1>
        <div className="searchBar">
          <input
            type="text"
            placeholder="ابحث عن..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="iconWrapper">
            <SearchIcon />
          </div>
        </div>
      </div>
      <div className={`${Style.Filters} d-flex  align-items-center flex-wrap gap-3`}>
        <div className={active === 0 ? Style.Active : ""} onClick={() => setActive(0)}>
          الاكثر تسجيلاً
        </div>
        <div className={active === 1 ? Style.Active : ""} onClick={() => setActive(1)}>
          الاعلى تقييمًا
        </div>
        <div className={active === 2 ? Style.Active : ""} onClick={() => setActive(2)}>
          الاحدث
        </div>
      </div>
    </div>
  );
};
