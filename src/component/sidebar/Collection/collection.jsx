import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import classes from "./collection.module.scss";
import { useLocation } from "react-router-dom";
import React from "react";

// إضافة متغير عام لتتبع Collection المفتوح حالياً
let activeCollectionId = null;

const Collection = ({
  mainIcon,
  mainTitle,
  children,
  acitve = false,
  nested = false,
  pos = "left",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const [uniqueId] = useState(() => Math.random().toString(36).substr(2, 9));
  const [hasActiveChild, setHasActiveChild] = useState(false);

  // إغلاق Collection عند تغيير المسار
  useEffect(() => {
    setIsExpanded(false);
  }, [location.pathname]);

  useEffect(() => {
    // تحقق مما إذا كان أي من الروابط الداخلية نشط
    const checkActiveChildren = () => {
      const childrenArray = Array.isArray(children) ? children : [children];
      const isAnyChildActive = childrenArray.some(child => {
        if (!child?.props) return false;
        const childPath = child.props.path || child.props.to;
        return childPath && location.pathname.includes(childPath);
      });
      setHasActiveChild(isAnyChildActive || acitve);
    };

    checkActiveChildren();
  }, [children, location.pathname, acitve]);

  useEffect(() => {
    // إغلاق Collection عند فتح آخر
    const handleCollectionChange = (event) => {
      if (event.detail.id !== uniqueId) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('collection-change', handleCollectionChange);
    return () => {
      window.removeEventListener('collection-change', handleCollectionChange);
    };
  }, [uniqueId]);

  const toggleExpansion = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    
    if (newState) {
      // إرسال حدث عند فتح Collection
      window.dispatchEvent(
        new CustomEvent('collection-change', { 
          detail: { id: uniqueId }
        })
      );
      activeCollectionId = uniqueId;
    }
  };

  // تعديل الأيقونة بناءً على حالة التوسيع والنشاط
  const modifiedIcon = React.cloneElement(mainIcon, {
    style: {
      color: hasActiveChild || isExpanded ? '#0062FF' : '#7E8799',
      width: "30px",
      height: "30px",
      transition: "color 0.3s ease",
      filter: hasActiveChild || isExpanded ? 'brightness(1.2)' : 'none'
    }
  });

  const arrowIcon = isExpanded ? (
    <IoIosArrowDown 
      size={"20px"} 
      style={{
        color: hasActiveChild || isExpanded ? '#0062FF' : '#7E8799',
        transition: "color 0.3s ease"
      }}
    />
  ) : (
    <IoIosArrowBack 
      size={"20px"} 
      style={{
        color: hasActiveChild || isExpanded ? '#0062FF' : '#7E8799',
        transition: "color 0.3s ease"
      }}
    />
  );

  return (
    <>
      <div
        className={`${classes.mainIcon} ${hasActiveChild ? classes.active : ""} ${
          isExpanded ? classes.expanded : ""
        } ${nested ? classes.nested : ""}`}
        style={{ 
          padding: nested ? "16px" : "",
          fontSize: nested ? "14px" : "",
          backgroundColor: isExpanded ? 'rgba(0, 98, 255, 0.1)' : 'transparent',
          borderRadius: '8px',
          transition: 'background-color 0.3s ease'
        }}
        onClick={toggleExpansion}
      >
        <div>
          {modifiedIcon}
          <span 
            className="title-dash-link" 
            style={{ 
              fontWeight: 600,
              color: hasActiveChild || isExpanded ? '#0062FF' : '#7E8799',
              transition: "color 0.3s ease"
            }}
          >
            {mainTitle}
          </span>
        </div>
        <div className={classes.arrow}>
          {arrowIcon}
        </div>
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
