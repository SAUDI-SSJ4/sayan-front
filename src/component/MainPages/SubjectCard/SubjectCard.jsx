import { useState, useMemo } from "react";
import classes from "./SubjectCard.module.scss";
import TeacherMask from "../../../assets/images/TeacherMask.png";
import Image from "../../../assets/images/CourseImage.png";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { formatLongText, handleRateStare } from "../../../utils/helpers";
import Cookies from "js-cookie";

const SubjectCard = ({ mainData, academySettings }) => {
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

  const courseTypeLabel = useMemo(() => {
    const types = {
      attend: "حضورية",
      recorded: "تفاعلية",
      default: "مباشرة"
    };
    return types[type] || types.default;
  }, [type]);

  const courseImage = image || Image;

  // Favorite Icon Component
  const FavoriteButton = () => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '50%',
      padding: '8px',
      display: 'flex',
      boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease',
      cursor: isLoading ? "not-allowed" : "pointer",
      '&:hover': {
        transform: 'scale(1.05)'
      }
    }}>
      <FavoriteIcon 
        sx={{ 
          color: isFavorite ? '#ff3b30' : '#9e9e9e', 
          fontSize: '24px',
          transition: 'color 0.2s ease'
        }} 
      />
    </div>
  );

  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = Cookies.get("student_token");

    if (!token) {
      alert("يجب تسجيل الدخول أولاً");
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

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Favorite toggle error:", error);
      alert("حدث خطأ أثناء تحديث المفضلة: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${classes.CardContainer}`}>
      <Link className={classes.routeLink} to={`/SingleCourse/${id}`}>
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
          <h2 style={{ 
            maxWidth: '65%', 
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            <Tooltip title={title} placement="top">
              <span>{title}</span>
            </Tooltip>
          </h2>
          <div
            className={classes.Badge}
            style={{
              background: academySettings.primary_color,
            }}
          >
            {courseTypeLabel}
          </div>
        </div>

        <div className={`${classes.Rate} mt-3`}>
          <div className="d-flex align-items-center gap-2">
            <StarIcon sx={{ fontSize: '24px', color: '#FFD700' }} />
            <span style={{ fontSize: '16px', fontWeight: '600' }}>{stars}</span>
          </div>
        </div>

        {short_content && (
          <div className={classes.Text}>
            <span>{formatLongText(short_content, 30)}</span>
          </div>
        )}

        <div className={classes.Footer}>
          <div className={classes.priceHolder}>
            <h1 className={classes.price} style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#272727'
            }}>
              {price ? `${price} ريال` : "مجاني"}
            </h1>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SubjectCard;
