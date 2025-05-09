import classes from "./SingleBlogCard.module.scss";
import userImage from "../../../assets/images/userimg.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { formatLongText } from "../../../utils/helpers";

const SingleBlogCard = ({ blogData }) => {
  console.log("blogData");
  console.log(blogData);
  const isoDate = blogData?.created_at;
  const date = new Date(isoDate);

  const formattedDate =
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0") +
    " " +
    String(date.getHours()).padStart(2, "0") +
    ":" +
    String(date.getMinutes()).padStart(2, "0") +
    ":" +
    String(date.getSeconds()).padStart(2, "0");

  console.log(+formattedDate.split(" ")[0].slice(5, 7));
  return (
    <div className={`${classes.CardContainer} card-container--info`}>
      <div className={`${classes.ImageContainer} img-card-container`}>
        <img src={blogData.image} style={{ height: "208px" }} />
        <div className={classes.Badge}>تأسيس شركات</div>
        {/* <div className={`${classes.detials} details-card--1`}>
          <div className="d-flex gap-2">
            تأسيس شركات
            <span style={{ color: "#6D6D6D" }}>6 دقائق</span>
          </div>
          <div>
            {formattedDate.split(" ")[0].slice(0, 5) +
              months[+formattedDate.split(" ")[0].slice(5, 7) - 1] +
              formattedDate.split(" ")[0].slice(7)}
          </div>
        </div> */}
      </div>
      <p>{blogData.title}</p>
      <span>{formatLongText(blogData.content, 40)}</span>
      <div className={classes.Footer}>
        <span style={{ marginTop: "20px" }}>
          تفاصيل أكثر <ArrowBackIcon />
        </span>
        <div>
          <img src={userImage} />
        </div>
      </div>
    </div>
  );
};

export default SingleBlogCard;
