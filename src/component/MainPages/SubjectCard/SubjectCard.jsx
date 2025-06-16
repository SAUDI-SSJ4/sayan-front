import { useState, useMemo, useEffect, memo } from "react";
import classes from "./SubjectCard.module.scss";
import Image from "../../../assets/images/CourseImage.png";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { formatLongText } from "../../../utils/helpers";
import Cookies from "js-cookie";

// Wrap the component with React.memo
const SubjectCard = memo(({ mainData, academySettings }) => {
  const {
    id,
    image,
    title,
    type,
    rated,
    short_content,
    price,
    stars,
    is_favorite,
  } = mainData || {};

  const [isFavorite, setIsFavorite] = useState(is_favorite || false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // تحقق من حالة تسجيل الدخول وتحديث حالة المفضلة عند تحميل المكون
  useEffect(() => {
    const token = Cookies.get("student_token");
    setIsLoggedIn(!!token);
    
    // تحديث حالة المفضلة من البيانات المستلمة
    if (mainData && mainData.is_favorite !== undefined) {
      setIsFavorite(mainData.is_favorite);
    }
    
    // إذا كان المستخدم مسجل دخول، قم بجلب قائمة المفضلة للتحقق
    if (token && id) {
      fetchFavoriteStatus(token, id);
    }
  }, [mainData, id]);

  // دالة جديدة لجلب حالة المفضلة من API
  const fetchFavoriteStatus = async (token, courseId) => {
    try {
      const response = await fetch(
        "https://www.sayan-server.com/website/favourites",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("فشل في جلب قائمة المفضلة");
      }

      const data = await response.json();
      
      // التحقق من هيكل البيانات
      const favorites = data.data || data;
      
      // البحث عن الدورة الحالية في قائمة المفضلة
      if (Array.isArray(favorites)) {
        const isCourseInFavorites = favorites.some(fav => 
          (fav.id === courseId) || (fav.course_id === courseId)
        );
        
        // تحديث حالة المفضلة بناءً على البيانات من الخادم
        setIsFavorite(isCourseInFavorites);
        
        // تحديث البيانات الأصلية أيضًا للاتساق
        if (mainData) {
          mainData.is_favorite = isCourseInFavorites;
        }
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      // الاحتفاظ بالحالة الحالية في حالة الفشل
    }
  };

  const courseTypeLabel = useMemo(() => {
    const types = {
      attend: "حضورية",
      recorded: "تفاعلية",
      default: "مباشرة",
    };
    return types[type] || types.default;
  }, [type]);

  const courseImage = image || Image;

  // Favorite Icon Component
  const FavoriteButton = () => (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "50%",
        padding: "8px",
        display: "flex",
        boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease",
        cursor: isLoading ? "not-allowed" : "pointer",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <FavoriteIcon
        sx={{
          color: isLoggedIn && isFavorite ? "#ff3b30" : "#9e9e9e",
          fontSize: "24px",
          transition: "color 0.2s ease",
        }}
      />
    </div>
  );

  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = Cookies.get("student_token");

    if (!token) {
      showErrorToast("يجب تسجيل الدخول كطالب أولاً");
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://www.sayan-server.com/website/toggle",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ course_id: id }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update favorite");
      }

      // تحديث حالة المفضلة
      const newFavoriteState = !isFavorite;
      setIsFavorite(newFavoriteState);
      
      // تحديث حالة المفضلة في الكائن الأصلي إذا كان متاحًا
      if (mainData) {
        mainData.is_favorite = newFavoriteState;
      }
    } catch (error) {
      console.error("Favorite toggle error:", error);
      alert("حدث خطأ أثناء تحديث المفضلة: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${classes.CardContainer}`}>
      <Link 
        className={classes.routeLink} 
        to={academySettings ? `/acdemy/${mainData.academy_id}/SingleCourse/${id}` : `/SingleCourse/${id}`}
        state={academySettings ? { academySettings } : undefined}
      >
        <div className="relative">
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              zIndex: 1,
            }}
            onClick={toggleFavorite}
          >
            <FavoriteButton />
          </div>
        </div>

        <img
          className={classes.Image}
          src={courseImage}
          alt={title || "Course Image"}
          loading="lazy"
        />

        <div className="d-flex justify-content-between align-items-center mt-3">
          <h2
            style={{
              maxWidth: "65%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "1.25rem",
              fontWeight: "700",
              color: "#1F2937"
            }}
          >
            <Tooltip title={title} placement="top">
              <span>{title}</span>
            </Tooltip>
          </h2>
          <div
            className={classes.Badge}
            style={{
              background: academySettings?.primary_color,
              fontSize: "0.875rem",
              fontWeight: "600"
            }}
          >
            {courseTypeLabel}
          </div>
        </div>

        <div className={`${classes.Rate} mt-3`}>
          <div className="d-flex align-items-center gap-2">
            <StarIcon sx={{ fontSize: "24px", color: "#FFD700" }} />
            <span 
              style={{ 
                fontSize: "16px", 
                fontWeight: "600",
                color: "#374151"
              }}
            >
              {stars}
            </span>
          </div>
        </div>

        {short_content && (
          <div className={classes.Text}>
            <span 
              style={{
                fontSize: "0.95rem",
                lineHeight: "1.5",
                color: "#6B7280"
              }}
            >
              {formatLongText(short_content, 30)}
            </span>
          </div>
        )}

        <div className={classes.Footer}>
          <div className={classes.priceHolder}>
            <h1
              className={classes.price}
              style={{
                fontSize: "24px",
                fontWeight: "800",
                color: academySettings?.primary_color || "#2563eb",
              }}
            >
              {price ? `${price} ريال` : "مجاني"}
            </h1>
          </div>
        </div>
      </Link>
    </div>
  );
}); // End of React.memo wrap

export default SubjectCard;
