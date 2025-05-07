import { useState } from "react";
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
    academy_image,
    trainer,
    academy,
    price,
    stars,
    is_favorite,
  } = mainData || {};
  const [isFavorite, setIsFavorite] = useState(is_favorite || false);
  const [isLoading, setIsLoading] = useState(false);

  const courseTypeLabel =
    type === "attend" ? "حضورية" : type === "recorded" ? "تفاعلية" : "مباشرة";

  const courseImage = image || Image;
  const academyImage = academy_image || TeacherMask;

  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const academyToken = Cookies.get("academy_token");
    const studentToken = Cookies.get("student_token");
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

      const data = await response.json(); // Parse the response

      if (!response.ok) {
        throw new Error(data.message || "Failed to update favorite");
      }

      setIsFavorite(!isFavorite);
      // alert(isFavorite ? 'تمت إزالة الدورة من المفضلة' : 'تمت إضافة الدورة إلى المفضلة');
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
        {/* Fav Heart on top of the Course Card */}
        <div className="relative">
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "15px",
              cursor: isLoading ? "not-allowed" : "pointer",
              zIndex: 1,
            }}
            onClick={toggleFavorite}
          >
            {isFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon
                color="action"
                style={{ color: isLoading ? "#ccc" : "" }}
              />
            )}
          </div>
        </div>

        <img
          className={classes.Image}
          src={courseImage}
          alt={title || "Course Image"}
        />
        <div className="d-flex justify-content-between align-items-center mt-3 mb-1">
          <h2 className="">
            <Tooltip title={title}>
              <span>
                {title?.length > 20 ? `${title.slice(0, 10)}...` : title}
              </span>
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

        <div className={`${classes.Rate}`}>
          <p>تقييمات المادة العلمية</p>
          <span>{handleRateStare(rated)}</span>
          <span className="mr-5">{stars}</span>
        </div>

        <div className={classes.Text}>
          {short_content && <span>{formatLongText(short_content, 30)}</span>}
        </div>

        <div className={classes.Footer}>
          <div className={classes.Profile}>
            <img
              className={` ${classes.SmallcardImg}`}
              src={academyImage}
              alt={academy || "Academy"}
            />
            <div>
              <h3>{trainer || "مدرب غير معروف"}</h3>
              <h4>{academy || "أكاديمية غير معروفة"}</h4>
            </div>
          </div>
          <div className={classes.priceHolder}>
            <h2 className={classes.price}>
              {price ? `${price} ريال` : "مجاني"}
            </h2>
            <h5 className={classes.priceAfter}>
              {price ? `${price} ريال` : "مجاني"}
            </h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SubjectCard;
