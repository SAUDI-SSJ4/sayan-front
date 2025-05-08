import { useState } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import classes from "./collection.module.scss";
import { useLocation } from "react-router-dom";

const Collection = ({
  mainIcon,
  mainTitle,
  children,
  active = false,
  nested = false,
  pos = "left",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const toggleExpansion = () => {
    setIsExpanded((prev) => !prev);
  };

  const containerClass = `${classes.mainIcon} ${active ? classes.active : ""} ${
    nested ? classes.nested : ""
  }`;

  const arrowIcon = isExpanded ? (
    <IoIosArrowDown size={"20px"} />
  ) : (
    <IoIosArrowBack size={"20px"} />
  );

  return (
    <>
      <div
        className={containerClass}
        style={{ 
          padding: nested ? "16px" : "",
          fontSize: nested ? "14px" : ""
        }}
        onClick={toggleExpansion}
      >
        <div>
          {mainIcon}
          <span 
            className="title-dash-link" 
            style={{ fontWeight: 600 }}
          >
            {mainTitle}
          </span>
        </div>
        <div className={classes.arrow}>{arrowIcon}</div>
      </div>
      <div
        className={classes.smallCollection}
        style={{
          maxHeight: isExpanded ? "800px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease-in-out",
          marginBottom: isExpanded ? "10px" : "0",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Collection;
