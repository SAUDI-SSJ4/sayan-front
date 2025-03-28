import classes from "./SubjectCard.module.scss";
import TeacherMask from "../../../assets/images/TeacherMask.png";
import Image from "../../../assets/images/CourseImage.png";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { formatLongText, handleRateStare } from "../../../utils/helpers";

const SubjectCard = ({ mainData }) => {
  const { id, image, title, type, rated, short_content, academy_image, trainer, academy, price, stars } = mainData || {};
  console.log(mainData);

  const courseTypeLabel = type === "attend" ? "حضورية" : type === "recorded" ? "تفاعلية" : "مباشرة";

  const courseImage = image || Image;
  const academyImage = academy_image || TeacherMask;

  return (
    <div className={`${classes.CardContainer}`}>
      <Link className={classes.routeLink} to={`/SingleCourse/${id}`}>
      
      {/* Fav Heart on top of the Course Card */}
      <div style={{position:"absolute", top: "20px", paddingRight: "10px"}}>
      <FavoriteBorderIcon/>
      </div>


        <img className={classes.Image} src={courseImage} alt={title || "Course Image"} />
        <div className="d-flex justify-content-between align-items-center mt-3 mb-1">
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
            <h2 className={classes.price}>{price ? `${price} ريال` : "مجاني"}</h2>
            <h5 className={classes.priceAfter}>{price ? `${price} ريال` : "مجاني"}</h5>

          </div>
        </div>
      </Link>
    </div>
  );













  // return (
  //   <>
  //     <div className="h-[32rem] rounded-3xl hover:border transition-all">
  //       <Link to={`/SingleCourse/${id}`}>
  //         <img className="w-full object-cover h-64 rounded-3xl" src={courseImage} alt="" />
  //         <div className="flex justify-between mt-2">
  //           <p className="font-bold text-gray-900 text-2xl ps-2">{title?.length > 20 ? `${title.slice(0, 10)}...` : title}</p>
  //           <p className="bg-blue-500 text-white px-3 py-2 rounded-3xl text-sm mx-2">{courseTypeLabel}</p>
  //         </div>
  //         <div className="flex gap-1 place-items-top">
  //           <p className="text-sm ps-2">تقييمات المادة العلمية</p>
  //           <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  //             <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
  //           </svg>
  //           <p className="text-sm">{stars}</p>
  //         </div>
  //         <div >
  //           {short_content && <span className="text-sm ps-2">{formatLongText(short_content, 30)}</span>}
  //         </div>
  //         <div className="flex gap-2 place-content-center place-items-center mt-4 ps-1">
  //           <img className="h-14 rounded-full" src={academyImage} alt="Academy logo" />
  //           <div className="flex-1 gap-0">
  //             <p className="text-sm font-bold text-zinc-500 m-0">{academy}</p>
  //             <p className="text-sm font-bold text-zinc-700 m-0">{trainer}</p>
  //           </div>
  //           <div>
  //             <p className="text-base font-bold text-zinc-900 ps-4">{price} ريال</p>
  //           </div>
  //         </div>
  //       </Link>
  //     </div>
  //   </>
  // );
};

export default SubjectCard;
