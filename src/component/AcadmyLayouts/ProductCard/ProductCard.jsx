import classes from "./ProductCard.module.scss";
import TeacherMask from "../../../assets/images/TeacherMask.png";
import StarIcon from "@mui/icons-material/Star";
import { Tooltip } from "@mui/material";
import SARIcon from "../../../components/SARIcon/SARIcon";

const ProductCard = ({ productCardInfo, mainProductsData }) => {
  return (
    <div className={classes.CardContainer}>
      <div className={classes.imageParent}>
        <img src={productCardInfo?.image} alt="Product" />
      </div>
      <div className="d-flex justify-content-between mt-2">
        <h2 className="fs-6 fw-bold title-text--1">
          <Tooltip title={productCardInfo?.title}>
            {productCardInfo?.title?.length > 20
              ? productCardInfo?.title.slice(0, 16) + "..."
              : productCardInfo?.title}
          </Tooltip>
        </h2>
        <div className={classes.Badge}>{productCardInfo?.type}</div>
      </div>
      <div className={`${classes.Rate} justify-content-between mt-3`}>
        <p>تقييمات المادة العلمية</p>
        <span>
          <StarIcon sx={{ color: "#F0B645" }} /> {productCardInfo?.rate}
        </span>
      </div>
      <div className={classes.Text}>
        <Tooltip title={productCardInfo?.content}>
          {productCardInfo?.content?.length > 20
            ? productCardInfo?.content.slice(0, 16) + "..."
            : productCardInfo?.content}
        </Tooltip>
      </div>
      <div className={classes.Text}>
        <Tooltip title={productCardInfo?.short_content}>
          {productCardInfo?.short_content?.length > 20
            ? productCardInfo?.short_content.slice(0, 16) + "..."
            : productCardInfo?.short_content}
        </Tooltip>
      </div>
      <div className={classes.Footer}>
        <div className={classes.Profile}>
          <img src={TeacherMask} alt="Teacher" />
          <div>
            <h3>{mainProductsData?.academy?.user_name}</h3>
            <h4>{mainProductsData?.academy?.name}</h4>
          </div>
        </div>
        <div>
          <h5 className="fs-6 fw-bold d-flex align-items-center">
            {productCardInfo?.price}
            <SARIcon />
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
