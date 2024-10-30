import classes from "./SubjectCard.module.scss";
import TeacherMask from "../../../assets/images/TeacherMask.png";
import Image from "../../../assets/images/CourseImage.png";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { formatLongText, handleRateStare } from "../../../utils/helpers";

const SubjectCard = ({ mainData }) => {
  const { id, image, title, type, rated, short_content, academy_image, trainer, academy, price } = mainData || {};

  const courseTypeLabel = type === "attend" ? "حضورية" : type === "recorded" ? "تفاعلية" : "مباشرة";

  const courseImage = image || Image;
  const academyImage = academy_image || TeacherMask;

  return (
    <div className={`${classes.CardContainer} border`}>
      <Link className={classes.routeLink} to={`/SingleCourse/${id}`}>
        <img src={courseImage} alt={title || "Course Image"} />
        <div className="d-flex justify-content-between align-items-center m-3">
          <h2 className="">
            <Tooltip title={title}>
              <span>{title?.length > 20 ? `${title.slice(0, 10)}...` : title}</span>
            </Tooltip>
          </h2>
          <div className={classes.Badge}>{courseTypeLabel}</div>
        </div>

        <div className={`${classes.Rate}`}>
          <p>تقييمات المادة العلمية</p>
          <span>{handleRateStare(rated)}</span>
        </div>

        <div className={classes.Text}>
          {short_content && <span>{formatLongText(short_content, 30)}</span>}
        </div>

        <div className={classes.Footer}>
          <div className={classes.Profile}>
            <img
              className={`object-fit-cover img-card-per ${classes.academyimage}`}
              src={academyImage}
              alt={academy || "Academy"}
            />
            <div>
              <h3>{trainer || "مدرب غير معروف"}</h3>
              <h4>{academy || "أكاديمية غير معروفة"}</h4>
            </div>
          </div>
          <div>
            <h5 className="num-price">{price ? `${price} ريال` : "مجاني"}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SubjectCard;
