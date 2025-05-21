import React, { useCallback, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import Style from "../home.module.scss";
import { debounce } from "lodash";
import { motion } from "framer-motion";

export const SubjectHeader = ({ filterByCourseTitle }) => {
  const [active, setActive] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

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

  const filterOptions = [
    { id: 0, label: "الأكثر تسجيلاً" },
    { id: 1, label: "الأعلى تقييمًا" },
    { id: 2, label: "الأحدث" },
  ];

  return (
    <motion.div 
      className={`${Style.SubjectHeader} d-flex align-items-center justify-content-between flex-wrap py-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex align-items-center flex-wrap gap-3 mb-3 mb-md-0">
        <h2 className="fw-bold m-0 text-gradient">كل المواد التدريبية</h2>
        <div className={`${Style.SearchBar} ${isFocused ? Style.Focused : ""}`}>
          <input
            type="text"
            placeholder="ابحث عن دورة..."
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="form-control border-0 shadow-none"
          />
          <div className={Style.IconWrapper}>
            <SearchIcon />
          </div>
        </div>
      </div>
      <div className={`${Style.Filters} d-flex align-items-center flex-wrap gap-2`}>
        <div className={Style.FilterIcon}>
          <FilterListIcon />
        </div>
        {filterOptions.map((option) => (
          <motion.div
            key={option.id}
            className={`${Style.FilterOption} ${active === option.id ? Style.Active : ""}`}
            onClick={() => setActive(option.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {option.label}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
